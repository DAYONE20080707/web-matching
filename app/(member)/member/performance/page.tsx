import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import { getAuthUser } from "@/lib/nextauth"
import { getPerformanceByCompanyId } from "@/actions/performance"
import PerformanceItem from "@/components/member/PerformanceItem"
import Link from "next/link"

const PerformancePage = async () => {
  // 認証情報取得
  const user = await getAuthUser()

  if (!user) {
    redirect("/")
  }

  const performances = await getPerformanceByCompanyId({
    companyId: user.companyId,
  })

  return (
    <div className="bg-white border w-full rounded-r-md p-10 h-full">
      <div className="text-xl font-bold border-b border-black pb-5 mb-5">
        実績一覧
      </div>

      <div className="text-center mb-10">
        <Button asChild className="w-[200px]">
          <Link href="/member/performance/new">新規作成</Link>
        </Button>
      </div>

      {performances.map((performance) => (
        <PerformanceItem performance={performance} key={performance.id} />
      ))}
    </div>
  )
}

export default PerformancePage
