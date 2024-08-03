import { redirect } from "next/navigation"
import { getAuthUser } from "@/lib/nextauth"
import ResetPassword from "@/components/auth/ResetPassword"
import { getResetTokenValidity } from "@/actions/user"

interface ResetPasswordProps {
  params: {
    token: string
  }
}

// パスワード再発行確認ページ
const ResetPasswordPage = async ({ params }: ResetPasswordProps) => {
  const { token } = params

  // 認証情報取得
  const user = await getAuthUser()

  if (user) {
    redirect("/")
  }

  // トークンの有効性を判定
  const isValid = await getResetTokenValidity({ token })

  // トークンが無効ならリダイレクト
  if (!isValid) {
    redirect("/reset-password")
  }

  return <ResetPassword token={token} />
}

export default ResetPasswordPage
