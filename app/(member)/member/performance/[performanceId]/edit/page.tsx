import { redirect } from "next/navigation"
import { getPerformanceById } from "@/actions/performance"
import { getAuthUser } from "@/lib/nextauth"
import PerformanceEdit from "@/components/member/PerformanceEdit"

interface PerformanceEditPageProps {
  params: {
    performanceId: string
  }
}

const PerformanceEditPage = async ({ params }: PerformanceEditPageProps) => {
  const { performanceId } = params

  const user = await getAuthUser()

  if (!user) {
    redirect("/")
  }

  const performance = await getPerformanceById({ performanceId })

  if (!performance) {
    redirect("/member/performance")
  }

  if (performance.companyId !== user.companyId) {
    redirect("/member/performance")
  }

  return (
    <div className="bg-white border w-full rounded-r-md p-10 h-full">
      <div className="text-xl font-bold border-b border-black pb-5 mb-5">
        実績編集
      </div>

      <PerformanceEdit performance={performance} />
    </div>
  )
}

export default PerformanceEditPage
