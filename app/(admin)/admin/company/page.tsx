import { getCompanies } from "@/actions/company"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>登録日</TableHead>
              <TableHead>企業名</TableHead>
              <TableHead>担当者</TableHead>
              <TableHead>担当者メールアドレス</TableHead>
              <TableHead>住所</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company) => (
              <CompanyAdminItem key={company.id} company={company} />
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

export default companyAdminPage
