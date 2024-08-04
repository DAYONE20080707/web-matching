import { redirect } from "next/navigation"
import { getAuthUser } from "@/lib/nextauth"
import ManagerInfo from "@/components/member/ManagerInfo"

const ManagerPage = async () => {
  // 認証情報取得
  const user = await getAuthUser()

  if (!user) {
    redirect("/")
  }

  return (
    <div className="bg-white border w-full rounded-r-md p-10 h-full">
      <div className="text-xl font-bold mb-5">担当者情報・編集</div>

      <ManagerInfo user={user} />
    </div>
  )
}

export default ManagerPage
