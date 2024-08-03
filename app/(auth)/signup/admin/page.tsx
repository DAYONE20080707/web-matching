import { redirect } from "next/navigation"
import { getAuthUser } from "@/lib/nextauth"
import Signup from "@/components/auth/Signup"

// 管理者登録ページ
const SignupAdminPage = async () => {
  // 認証情報取得
  const user = await getAuthUser()

  if (user) {
    redirect("/")
  }

  return <Signup isAdmin={true} />
}

export default SignupAdminPage
