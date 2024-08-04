"use server"

import { z } from "zod"
import { db } from "@/lib/prisma"
import { RegisterSchema } from "@/schemas"
import { sendForgotPassword } from "@/actions/sendForgotPassword"
import { sendResetPassword } from "@/actions/sendResetPassword"
import { sendEmail } from "@/actions/sendEmail"
import bcrypt from "bcrypt"
import crypto from "crypto"

const ONE_SECOND = 1000
const ONE_MINUTE = ONE_SECOND * 60
const ONE_HOUR = ONE_MINUTE * 60
const ONE_DAY = ONE_HOUR * 24

export const adminSignup = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedField = RegisterSchema.safeParse(values)

  if (!validatedField.success) {
    return { error: "メールアドレスとパスワードを確認してください" }
  }

  const { email, password, name } = validatedField.data

  try {
    const existingUser = await db.user.findUnique({ where: { email } })

    if (existingUser) {
      return { error: "すでにユーザーが存在しています" }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isAdmin: true,
        isVerified: true,
      },
    })
    return { success: "ユーザー作成に成功しました" }
  } catch (error: any) {
    console.error("[REGISTER_USER]", error)
    return { error: "エラーが発生しました" }
  }
}

export const userSignup = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedField = RegisterSchema.safeParse(values)

  if (!validatedField.success) {
    return { error: "メールアドレスとパスワードを確認してください" }
  }

  const { email, password, name } = validatedField.data

  try {
    const existingUser = await db.user.findUnique({ where: { email } })

    if (existingUser) {
      return { error: "すでにユーザーが存在しています" }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    // 企業が既に存在するか確認
    let company = await db.company.findUnique({
      where: { companyEmail: values.companyEmail },
    })

    // 企業が存在しない場合は新規作成
    if (!company) {
      company = await db.company.create({
        data: {
          companyName: values.companyName,
          companyEmail: values.companyEmail,
        },
      })
    }

    // 確認トークンの生成
    const token = crypto.randomBytes(18).toString("hex")

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isVerified: false,
        companyId: company.id,
        VerificationToken: {
          create: {
            identifier: email,
            token,
            expires: new Date(Date.now() + ONE_DAY),
          },
        },
      },
    })

    // 確認メールの送信
    const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify/${token}`

    const subject = "アカウント本登録のご案内"
    const body = `
<div>
  <p>
    ご利用ありがとうございます。<br />
    アカウント本登録のリクエストがありました。
  </p>

  <p><a href="${verificationLink}">アカウント本登録を行う</a></p>

  <p>このリンクの有効期限は24時間です。</p>
  <p>このメールに覚えのない場合は、このメールを無視するか削除して頂ますようお願いします。</p>
</div>
`

    await sendEmail(subject, body, email)

    return { success: "確認メールを送信しました。" }
  } catch (error: any) {
    console.error("[REGISTER_USER]", error)
    return { error: "エラーが発生しました" }
  }
}

export const forgotPassword = async ({ email }: { email: string }) => {
  try {
    const user = await db.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    })

    if (!user) {
      return { error: "ユーザーが存在しません" }
    }

    const existingToken = await db.passwordResetToken.findFirst({
      where: {
        userId: user.id,
        expiry: {
          gt: new Date(),
        },
        createdAt: {
          gt: new Date(Date.now() - ONE_HOUR),
        },
      },
    })

    if (existingToken) {
      return {
        error:
          "既にパスワード再発行用のメールをお送りしました。1時間後に再度お試しください",
      }
    }

    // トークンの作成
    const token = crypto.randomBytes(18).toString("hex")

    // トークンの保存
    await db.passwordResetToken.create({
      data: {
        token,
        expiry: new Date(Date.now() + ONE_DAY),
        userId: user.id,
      },
    })

    // メールの送信
    const emailResponse = await sendForgotPassword({ userId: user.id })

    if (emailResponse.error) {
      return { error: emailResponse.error }
    }

    return { success: "パスワード再発行用のメールをお送りしました" }
  } catch (error: any) {
    console.error("[FORGOT_PASSWORD]", error)
    return { error: "エラーが発生しました" }
  }
}

export const getResetTokenValidity = async ({ token }: { token: string }) => {
  try {
    // トークンの検索
    const foundToken = await db.passwordResetToken.findFirst({
      where: {
        token,
      },
      select: {
        id: true,
        expiry: true,
      },
    })

    return !!foundToken && foundToken.expiry > new Date()
  } catch (error: any) {
    console.error("[RESET TOKEN VALIDATE]", error)
    return false
  }
}

export const getVerifyTokenValidity = async ({ token }: { token: string }) => {
  try {
    // トークンの検証
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
      include: { user: true },
    })

    if (!verificationToken || verificationToken.expires < new Date()) {
      return { error: "無効なまたは期限切れのトークンです。" }
    }

    // ユーザーの本登録
    await db.user.update({
      where: { id: verificationToken.userId },
      data: {
        isVerified: true,
      },
    })

    await db.verificationToken.deleteMany({
      where: { userId: verificationToken.userId },
    })

    return { success: "本登録が完了しました。" }
  } catch (error) {
    console.error("[VERIFY_USER]", error)
    return { error: "本登録に失敗しました。" }
  }
}

export const resetPassword = async ({
  token,
  password,
}: {
  token: string
  password: string
}) => {
  try {
    // トークンの検索
    const foundToken = await db.passwordResetToken.findFirst({
      where: {
        token,
      },
      include: {
        user: true,
      },
    })

    if (!foundToken) {
      return {
        error: "無効なトークンです。再度パスワード再設定を行ってください",
      }
    }

    // 現在の日時
    const now = new Date()

    // トークンの期限が切れている場合
    if (now > foundToken.expiry) {
      return {
        error:
          "トークンの期限が切れています。再度パスワード再設定を行ってください",
      }
    }

    // 新しいパスワードと現在のパスワードを比較
    const isSamePassword = await bcrypt.compare(
      password,
      foundToken.user.password || ""
    )

    if (isSamePassword) {
      return {
        error: "現在のパスワードと同じパスワードは使用できません",
      }
    }

    // パスワードのハッシュ化
    const hashedPassword = await bcrypt.hash(password, 12)

    await db.$transaction([
      // パスワードの更新
      db.user.update({
        where: {
          id: foundToken.userId,
        },
        data: {
          password: hashedPassword,
        },
      }),
      // トークンの削除
      db.passwordResetToken.deleteMany({
        where: {
          userId: foundToken.userId,
        },
      }),
    ])

    // メールの送信
    const emailResponse = await sendResetPassword({ userId: foundToken.userId })

    if (emailResponse.error) {
      return { error: emailResponse.error }
    }

    return { success: "パスワード再発行が完了しました" }
  } catch (error: any) {
    console.error("[RESET PASSWORD]", error)
    return { error: "エラーが発生しました" }
  }
}

export const deleteUser = async ({ userId }: { userId: string }) => {
  try {
    // ユーザーを削除
    await db.user.delete({
      where: { id: userId },
    })

    return true
  } catch (err) {
    console.error(err)
    return false
  }
}
