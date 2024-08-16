import { getCompanies } from "@/actions/company"
import CompanyAdminItem from "@/components/admin/CompanyAdminItem"

const companyAdminPage = async () => {
  const companies = await getCompanies()

  return (
    <div className="bg-white md:border w-full rounded md:rounded-r-md p-2 md:p-10 h-full">
      <div className="text-xl font-bold border-b border-black pb-5 mb-5">
        企業一覧
      </div>

      {companies.length === 0 ? (
        <div>企業が登録されていません</div>
      ) : (
        <div className="overflow-x-auto w-[350px] md:w-full">
          <table className="w-full table-auto border-collapse border">
            <thead>
              <tr className="bg-gray-50">
                <th className="border p-2 text-sm whitespace-nowrap">登録日</th>
                <th className="border p-2 text-sm whitespace-nowrap">企業名</th>
                <th className="border p-2 text-sm whitespace-nowrap">担当者</th>
                <th className="border p-2 text-sm whitespace-nowrap">
                  担当者メールアドレス
                </th>
                <th className="border p-2 text-sm whitespace-nowrap">住所</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <CompanyAdminItem key={company.id} company={company} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default companyAdminPage
