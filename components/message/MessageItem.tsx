"use client"

import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Message } from "@prisma/client"

type MessageItemProps = {
  senderType: string
  message: Message
}

const MessageItem = ({ senderType, message }: MessageItemProps) => {
  const isAuthor = message.senderType === senderType

  return (
    <div
      className={cn(
        "flex gap-x-1 mt-5 items-end",
        isAuthor && "flex-row-reverse justify-start"
      )}
    >
      <div
        className={cn(
          "py-2 px-3 rounded max-w-[75%]",
          isAuthor ? "bg-[#92DF83]" : "bg-gray-50"
        )}
      >
        {message.content}
      </div>

      <div className={cn("text-xs text-zinc-500", isAuthor && "text-right")}>
        {format(new Date(message.createdAt), "yyyy.MM.dd HH:mm")}
      </div>
    </div>
  )
}

export default MessageItem
