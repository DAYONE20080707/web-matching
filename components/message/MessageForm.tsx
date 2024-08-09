"use client"

import { createMessage } from "@/actions/message"
import { User } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface MessageFormProps {
  user: User
}

const MessageForm = ({ user }: MessageFormProps) => {
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (!user.companyId) {
        return
      }

      await createMessage({ content: message, companyId: user.companyId, user })

      setMessage("")
      router.refresh()
    } catch (error) {
      console.error("Failed to send message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="メッセージを入力してください..."
          rows={4}
        />
        <button
          type="submit"
          className="mt-2 p-2 bg-blue-500 text-white rounded-lg"
          disabled={isLoading || !message.trim()}
        >
          {isLoading ? "送信中..." : "送信"}
        </button>
      </form>
    </div>
  )
}

export default MessageForm
