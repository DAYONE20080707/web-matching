import { getCompaniesWithMessage } from "@/actions/company"
import MessageAdminItem from "@/components/admin/MessageAdminItem"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const MessagePage = async () => {
  const companies = await getCompaniesWithMessage()

  return (
    <div className="bg-white border w-full rounded-r-md p-10 h-full">
      <div className="text-xl font-bold border-b border-black pb-5 mb-5">
        メッセージ企業一覧
      </div>

      {companies.length === 0 ? (
        <div>紹介案件はありません</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>企業名</TableHead>
              <TableHead>最新メッセージ</TableHead>
              <TableHead>更新日</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company) => (
              <MessageAdminItem key={company.id} company={company} />
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

export default MessagePage
