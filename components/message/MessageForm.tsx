"use client"

import { createMessage } from "@/actions/message"
import { User } from "@prisma/client"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface MessageFormProps {
  user: User
  companyId: string
  onMessageSent: () => void
}

const MessageForm = ({ user, companyId, onMessageSent }: MessageFormProps) => {
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await createMessage({ content: message, companyId, user })

      setMessage("")
      onMessageSent()
    } catch (error) {
      console.error("メッセージの送信に失敗しました:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center space-x-5">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="メッセージを入力してください..."
            rows={2}
          />
          <Button
            type="submit"
            className="rounded w-[100px]"
            disabled={isLoading || !message.trim()}
          >
            {isLoading ? "送信中" : "送信"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default MessageForm
