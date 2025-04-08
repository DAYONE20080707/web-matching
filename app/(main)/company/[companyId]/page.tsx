import { getCompanyWithPerformanceById } from "@/actions/company"
import CompanyDetail from "@/components/main/CompanyDetail"

interface CompanyPageProps {
  params: {
    companyId: string
  }
}

const CompanyPage = async ({ params }: CompanyPageProps) => {
  const { companyId } = params

  const company = await getCompanyWithPerformanceById({ companyId })

  if (!company) {
    return <div className="text-center mt-10">会社が見つかりませんでした</div>
  }

  return (
    <div className="">
      <CompanyDetail company={company} />
    </div>
  )
}

export default CompanyPage
