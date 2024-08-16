import { getCompanies } from "@/actions/company"
import CompanyAdminItem from "@/components/admin/CompanyAdminItem"

const companyAdminPage = async () => {
  const companies = await getCompanies()

  return (
    <div className="bg-white border w-full rounded-r-md p-10 h-full">
      <div className="text-xl font-bold border-b border-black pb-5 mb-5">
        企業一覧
      </div>

      {companies.length === 0 ? (
        <div>企業が登録されていません</div>
      ) : (
        <table className="min-w-full border-collapse border">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-2 text-sm">登録日</th>
              <th className="border p-2 text-sm">企業名</th>
              <th className="border p-2 text-sm">担当者</th>
              <th className="border p-2 text-sm">担当者メールアドレス</th>
              <th className="border p-2 text-sm">住所</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <CompanyAdminItem key={company.id} company={company} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default companyAdminPage
