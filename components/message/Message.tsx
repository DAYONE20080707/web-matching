"use client"

import { User } from "@prisma/client"
import { useState } from "react"
import MessageForm from "@/components/message/MessageForm"
import MessageList from "@/components/message/MessageList"

interface MessageProps {
  user: User
  companyId: string
}

const Message = ({ user, companyId }: MessageProps) => {
  const [messageSent, setMessageSent] = useState(false)

  return (
    <>
      <MessageList
        user={user}
        companyId={companyId}
        messageSent={messageSent}
        setMessageSent={setMessageSent}
      />

      <div className="mt-auto">
        <MessageForm
          user={user}
          companyId={companyId}
          onMessageSent={() => setMessageSent(true)}
        />
      </div>
    </>
  )
}

export default Message
