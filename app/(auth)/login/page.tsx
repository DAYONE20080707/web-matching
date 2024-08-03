import { redirect } from "next/navigation"
import { getAuthUser } from "@/lib/nextauth"
import Login from "@/components/auth/Login"

// ログインページ
const LoginPage = async () => {
  // 認証情報取得
  const user = await getAuthUser()

  if (user) {
    redirect("/")
  }

  return <Login />
}

export default LoginPage
