"use server"

import { sendEmail } from "@/actions/sendEmail"
import { db } from "@/lib/prisma"
import { SITE_NAME } from "@/lib/utils"

interface SendForgotPasswordOptions {
  userId: string
}

// パスワード再発行メール送信
export const sendForgotPassword = async ({
  userId,
}: SendForgotPasswordOptions) => {
  try {
    // ユーザー取得
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        PasswordResetToken: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    })

    if (!user || !user.email) {
      return { error: "ユーザーが存在しません" }
    }

    // トークン取得
    const token = user.PasswordResetToken[0].token

    // パスワード再発行リンク
    const resetPasswordLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${token}`

    // 件名
    const subject = `【${SITE_NAME}】パスワード再発行のご案内`

    // 本文
    const body = `
<div>
  <p>${user.name}様</p>
  <p>
    ご利用ありがとうございます。<br />
    あなたのアカウントでパスワード再発行のリクエストがありました。
  </p>

  <p><a href="${resetPasswordLink}">パスワードの再発行を行う</a></p>

  <p>このリンクの有効期限は24時間です。</p>
  <p>このメールに覚えのない場合は、このメールを無視するか削除して頂ますようお願いします。</p>
</div>
 `

    // メール送信
    await sendEmail(subject, body, user.email)
    return { success: "パスワード再発行用のメールをお送りしました" }
  } catch (error: any) {
    console.error("[SEND_FORGOT_PASSWORD]", error)
    return { error: "メール送信中にエラーが発生しました" }
  }
}
