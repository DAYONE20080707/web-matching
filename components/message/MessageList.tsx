"use client"

import { useEffect, useRef } from "react"
import { User } from "@prisma/client"
import { Loader2 } from "lucide-react"
import { useMessageQuery } from "@/hooks/useMessageQuery"
import { useMessageScroll } from "@/hooks/useMessageScroll"
import MessageItem from "@/components/message/MessageItem"
import React from "react"

interface MessageListProps {
  user: User
  companyId: string
  messageSent: boolean
  setMessageSent: (sent: boolean) => void
}

const MessageList = ({
  user,
  companyId,
  messageSent,
  setMessageSent,
}: MessageListProps) => {
  const bottomRef = useRef<HTMLDivElement>(null)
  const topRef = useRef<HTMLDivElement>(null)
  const queryKey = ["company", `company:${companyId}`]

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isLoading,
  } = useMessageQuery({ queryKey, companyId })

  useMessageScroll({
    topRef,
    bottomRef,
    fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    pageCount: data?.pages.length ?? 0,
    count: data?.pages[0].items?.length ?? 0,
  })

  useEffect(() => {
    refetch().finally(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" })
      setMessageSent(false)
    })
  }, [messageSent, setMessageSent, refetch])

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <Loader2 className="h-5 w-5 animate-spin mb-3" />
        <div className="text-xs">メッセージ読込中</div>
      </div>
    )
  }

  return (
    <div ref={topRef} className="flex flex-col flex-1 overflow-y-auto mb-5">
      {hasNextPage && (
        <div className="flex flex-col justify-center items-center">
          {isFetchingNextPage ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin mb-3" />
              <div className="text-xs">メッセージ読込中</div>
            </>
          ) : (
            <button onClick={() => fetchNextPage()} className="text-xs my-4">
              次のメッセージ
            </button>
          )}
        </div>
      )}

      <div className="flex flex-col-reverse mt-auto">
        {data?.pages.map((page, i) => (
          <React.Fragment key={`page-${i}`}>
            {page.items?.map((message: any) => (
              <MessageItem
                key={message.id}
                message={message}
                senderType={user.isAdmin ? "ADMIN" : "COMPANY"}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  )
}

export default MessageList
