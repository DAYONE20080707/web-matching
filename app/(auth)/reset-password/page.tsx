import { redirect } from "next/navigation"
import { getAuthUser } from "@/lib/nextauth"
import ForgotPassword from "@/components/auth/ForgotPassword"

// パスワード再発行ページ
const ForgotPasswordPage = async () => {
  // 認証情報取得
  const user = await getAuthUser()

  if (user) {
    redirect("/")
  }

  return <ForgotPassword />
}

export default ForgotPasswordPage
