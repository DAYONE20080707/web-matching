import { getCompaniesWithMessage } from "@/actions/company"
import { getUnreadMessagesCount } from "@/actions/message"
import MessageAdminItem from "@/components/message/MessageAdminItem"

const MessagePage = async () => {
  const companies = await getCompaniesWithMessage()

  // 各企業の未読メッセージ数を取得
  const companiesWithUnreadCount = await Promise.all(
    companies.map(async (company) => {
      const unreadMessagesCount = await getUnreadMessagesCount({
        companyId: company.id,
        userIsAdmin: true,
      })
      return {
        ...company,
        unreadMessagesCount,
      }
    })
  )

  return (
    <div className="bg-white border w-full rounded-r-md p-10 h-full">
      <div className="text-xl font-bold border-b border-black pb-5 mb-5">
        メッセージ一覧
      </div>

      {companies.length === 0 ? (
        <div>紹介案件はありません</div>
      ) : (
        <table className="min-w-full border-collapse border">
          <thead>
            <tr className="bg-gray-50">
              <th className="border p-2 text-sm">未読</th>
              <th className="border p-2 text-sm">受信日時</th>
              <th className="border p-2 text-sm">企業名</th>
              <th className="border p-2 text-sm">内容</th>
            </tr>
          </thead>
          <tbody>
            {companiesWithUnreadCount.map((company) => (
              <MessageAdminItem
                key={company.id}
                company={company}
                unreadMessagesCount={company.unreadMessagesCount}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default MessagePage
