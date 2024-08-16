"use client"

import { Company, Message } from "@prisma/client"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { Mail } from "lucide-react"

interface MessageAdminItemProps {
  company: Company & {
    messages: Message[]
  }
  unreadMessagesCount: number
}

const MessageAdminItem = ({
  company,
  unreadMessagesCount,
}: MessageAdminItemProps) => {
  const router = useRouter()

  const lastMessage = company.messages[0]

  // contentを適切な長さに切り取る
  const truncateContent = (content: string, maxLength: number) => {
    if (content.length <= maxLength) {
      return content
    }
    return content.slice(0, maxLength) + "..."
  }

  const truncatedContent = lastMessage
    ? truncateContent(lastMessage.content, 30)
    : "-"

  const handleRowClick = () => {
    router.push(`/admin/message/${company.id}`)
  }

  return (
    <tr
      className="hover:bg-gray-50 text-center text-sm cursor-pointer"
      onClick={handleRowClick}
    >
      <td className="border p-2 whitespace-nowrap">
        {unreadMessagesCount > 0 && (
          <div className="flex justify-center">
            <Mail className="h-5 w-5 text-red-500" />
          </div>
        )}
      </td>
      <td className="border p-2">
        {lastMessage
          ? format(new Date(lastMessage.createdAt), "yyyy/MM/dd HH:mm")
          : "-"}
      </td>
      <td className="border p-2 whitespace-nowrap">{company.companyName}</td>
    </tr>
  )
}

export default MessageAdminItem
