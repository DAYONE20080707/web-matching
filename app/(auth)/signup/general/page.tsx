import { redirect } from "next/navigation"
import { getAuthUser } from "@/lib/nextauth"
import Signup from "@/components/auth/Signup"

// 会員登録ページ
const SignupGeneralPage = async () => {
  // 認証情報取得
  const user = await getAuthUser()

  if (user) {
    redirect("/")
  }

  return <Signup isAdmin={false} />
}

export default SignupGeneralPage
