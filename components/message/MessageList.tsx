"use client"

import { Message } from "@prisma/client"
import { format } from "date-fns"

interface MessageListProps {
  messages: Message[]
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`p-4 rounded-lg ${
            message.senderType === "ADMIN" ? "bg-blue-100" : "bg-gray-100"
          }`}
        >
          <div className="text-sm text-gray-500">
            {format(new Date(message.createdAt), "yyyy.MM.dd HH:mm")}
          </div>
          <div>{message.content}</div>
        </div>
      ))}
    </div>
  )
}

export default MessageList
