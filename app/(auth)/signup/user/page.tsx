import { redirect } from "next/navigation"
import { getAuthUser } from "@/lib/nextauth"
import SignupUser from "@/components/auth/SignupUser"

// 会員登録ページ
const SignupUserPage = async () => {
  // 認証情報取得
  const user = await getAuthUser()

  if (user) {
    redirect("/")
  }

  return <SignupUser />
}

export default SignupUserPage
