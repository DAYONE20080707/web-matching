import { redirect } from "next/navigation"
import { getAuthUser } from "@/lib/nextauth"
import { getCompanyById } from "@/actions/company"
import { markMessagesAsRead } from "@/actions/message"
import Message from "@/components/message/Message"

interface MessageDetailPageProps {
  params: {
    companyId: string
  }
}

const MessageDetailPage = async ({ params }: MessageDetailPageProps) => {
  const { companyId } = params

  // 認証情報取得
  const user = await getAuthUser()

  if (!user) {
    redirect("/")
  }

  const company = await getCompanyById({ companyId })

  if (!company) {
    redirect("/")
  }

  // 未読メッセージを既読にする
  await markMessagesAsRead({
    companyId,
    userIsAdmin: true,
  })

  return (
    <div className="bg-white border w-full rounded-r-md p-10 h-[850px] flex flex-col">
      <div className="text-xl font-bold border-b border-black pb-5 mb-5">
        To: {company.companyName}様
      </div>

      <Message user={user} companyId={companyId} />
    </div>
  )
}

export default MessageDetailPage
