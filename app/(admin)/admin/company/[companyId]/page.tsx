import { getCompanyById } from "@/actions/company"
import CompanyAdmin from "@/components/admin/CompanyAdmin"

interface CompanyAdminPageProps {
  params: {
    companyId: string
  }
}

const CompanyAdminPage = async ({ params }: CompanyAdminPageProps) => {
  const { companyId } = params

  const company = await getCompanyById({ companyId })

  return (
    <div className="bg-white border w-full rounded md:rounded-r-md p-2 md:p-10 h-full">
      <div className="text-xl font-bold border-b border-black pb-5 mb-5">
        企業情報・編集
      </div>

      {company ? (
        <CompanyAdmin company={company} />
      ) : (
        <div>企業情報が登録されていません。</div>
      )}
    </div>
  )
}

export default CompanyAdminPage
