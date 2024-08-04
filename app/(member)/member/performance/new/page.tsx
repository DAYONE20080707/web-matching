import { redirect } from "next/navigation"
import { getAuthUser } from "@/lib/nextauth"
import PerformanceNew from "@/components/member/PerformanceNew"

const PerformanceNewPage = async () => {
  // 認証情報取得
  const user = await getAuthUser()

  if (!user) {
    redirect("/")
  }

  const companyId = user.companyId

  return (
    <div className="bg-white border w-full rounded-r-md p-10 h-full">
      <div className="text-xl font-bold border-b border-black pb-5 mb-5">
        実績登録
      </div>

      {companyId ? (
        <PerformanceNew companyId={companyId} />
      ) : (
        <div>企業情報が登録されていません。</div>
      )}
    </div>
  )
}

export default PerformanceNewPage
