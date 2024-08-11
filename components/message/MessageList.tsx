"use client"

import { useRef } from "react"
import { Message, User } from "@prisma/client"
import { Loader2 } from "lucide-react"
import { useMessageScroll } from "@/hooks/useMessageScroll"
import MessageItem from "@/components/message/MessageItem"
import React from "react"

interface MessageListProps {
  user: User
  bottomRef: React.RefObject<HTMLDivElement>
  data: any
  fetchNextPage: () => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
  isLoading: boolean
}

const MessageList = ({
  user,
  bottomRef,
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
}: MessageListProps) => {
  const topRef = useRef<HTMLDivElement>(null)

  useMessageScroll({
    topRef,
    bottomRef,
    fetchNextPage,
    shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
    pageCount: data?.pages.length ?? 0,
    count: data?.pages[0].items?.length ?? 0,
  })

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
        {data?.pages.map((page: any, i: number) => (
          <React.Fragment key={`page-${i}`}>
            {page.items?.map((message: Message) => (
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
