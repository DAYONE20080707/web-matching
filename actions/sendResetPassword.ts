import { sendEmail } from "@/actions/sendEmail"
import { db } from "@/lib/prisma"

interface sendResetPasswordOptions {
  userId: string
}

// パスワード再発行完了メール送信
export const sendResetPassword = async ({
  userId,
}: sendResetPasswordOptions) => {
  try {
    // ユーザー取得
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user || !user.email) {
      return { error: "ユーザーが存在しません" }
    }

    // 件名
    const subject = "パスワード再発行完了のご案内"

    // 本文
    const body = `
<div>
  <p>
    ご利用ありがとうございます。<br />
    あなたのアカウントでパスワード再発行が完了しました。
  </p>
</div>
`

    // メール送信
    await sendEmail(subject, body, user.email)
    return { success: "パスワード再発行が完了しました" }
  } catch (error: any) {
    console.error("[SEND_FORGOT_PASSWORD]", error)
    return { error: "メール送信中にエラーが発生しました" }
  }
}
