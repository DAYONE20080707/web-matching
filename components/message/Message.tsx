"use client"

import { useRef } from "react"
import { User } from "@prisma/client"
import MessageForm from "@/components/message/MessageForm"
import MessageList from "@/components/message/MessageList"
import { useMessageQuery } from "@/hooks/useMessageQuery"

interface MessageProps {
  user: User
  companyId: string
}

const Message = ({ user, companyId }: MessageProps) => {
  const bottomRef = useRef<HTMLDivElement>(null)
  const queryKey = ["company", `company:${companyId}`]

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isLoading,
  } = useMessageQuery({ queryKey, companyId })

  const handleSendMessage = async () => {
    await refetch()
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  return (
    <>
      <MessageList
        user={user}
        bottomRef={bottomRef}
        data={data}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
      />

      <div className="mt-auto">
        <MessageForm
          user={user}
          companyId={companyId}
          onMessageSent={handleSendMessage}
        />
      </div>
    </>
  )
}

export default Message
