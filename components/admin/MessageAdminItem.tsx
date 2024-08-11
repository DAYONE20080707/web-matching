"use client"

import { Company, Message } from "@prisma/client"
import { TableCell, TableRow } from "@/components/ui/table"
import { format } from "date-fns"
import Link from "next/link"

interface MessageAdminItemProps {
  company: Company & {
    messages: Message[]
  }
}

const MessageAdminItem = ({ company }: MessageAdminItemProps) => {
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
    : "メッセージなし"

  return (
    <TableRow>
      <TableCell className="underline">
        <Link href={`/admin/message/${company.id}`}>{company.companyName}</Link>
      </TableCell>
      <TableCell className="text-left">{truncatedContent}</TableCell>
      <TableCell className="text-center">
        {lastMessage
          ? format(new Date(lastMessage.createdAt), "yyyy/MM/dd HH:mm")
          : "-"}
      </TableCell>
    </TableRow>
  )
}

export default MessageAdminItem
