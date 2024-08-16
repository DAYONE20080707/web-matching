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
    <div className="bg-white md:border w-full rounded md:rounded-r-md p-2 md:p-10 h-full">
      <div className="text-xl font-bold border-b border-black pb-5 mb-5">
        担当者情報・編集
      </div>

      <ManagerInfo user={user} />
    </div>
  )
}

export default ManagerPage
