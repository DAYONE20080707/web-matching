import { redirect } from "next/navigation"
import { getAuthUser } from "@/lib/nextauth"
import { getMessages } from "@/actions/message"
import MessageList from "@/components/message/MessageList"
import MessageForm from "@/components/message/MessageForm"

const MessagePage = async () => {
  // 認証情報取得
  const user = await getAuthUser()

  if (!user) {
    redirect("/")
  }

  if (!user.companyId) {
    redirect("/")
  }

  const messages = await getMessages({ companyId: user.companyId })

  return (
    <div className="bg-white border w-full rounded-r-md p-10 h-full">
      <div className="text-xl font-bold border-b border-black pb-5 mb-5">
        メッセージ
      </div>

      <MessageList messages={messages} />
      <MessageForm user={user} />
    </div>
  )
}

export default MessagePage
