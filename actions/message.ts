"use server"

import { db } from "@/lib/prisma"
import { User } from "@prisma/client"
import { sendEmail } from "@/actions/sendEmail"

type getMessagesProps = {
  companyId: string
  cursor?: string
}

const MESSAGE_BATCH = 20

export const getMessages = async ({ companyId, cursor }: getMessagesProps) => {
  const messages = await getMessagesBycompanyId({
    companyId,
    batchSize: MESSAGE_BATCH,
    cursor,
  })

  let nextCursor = null

  if (messages.length === MESSAGE_BATCH) {
    nextCursor = messages[MESSAGE_BATCH - 1].id
  }
  return { items: messages, nextCursor }
}

export const getMessagesBycompanyId = async ({
  companyId,
  batchSize,
  cursor,
}: {
  companyId: string
  batchSize: number
  cursor?: string
}) => {
  if (cursor) {
    const messages = await db.message.findMany({
      take: batchSize,
      skip: 1,
      cursor: {
        id: cursor,
      },
      where: {
        companyId,
      },
      orderBy: { createdAt: "desc" },
    })

    return messages
  }

  const messages = await db.message.findMany({
    take: batchSize,
    where: {
      companyId,
    },
    orderBy: { createdAt: "desc" },
  })

  return messages
}

export const createMessage = async ({
  content,
  companyId,
  user,
}: {
  content: string
  companyId: string
  user: User
}) => {
  try {
    const senderType = user.isAdmin ? "ADMIN" : "COMPANY"
    const recipientCompanyId = user.isAdmin ? companyId : user.companyId!

    await db.message.create({
      data: {
        content,
        senderType,
        userId: user.id,
        companyId: recipientCompanyId,
      },
    })

    let recipientEmails: string[] = []
    let messageLink = ""

    if (user.isAdmin) {
      // 管理者がメッセージを送信する場合、会社に紐づく全てのユーザーのメールアドレスを取得
      const users = await db.user.findMany({
        where: { companyId: recipientCompanyId },
        select: { email: true },
      })
      recipientEmails = users.map((user) => user.email!)
      messageLink = `${process.env.NEXT_PUBLIC_APP_URL}/member/message`
    } else {
      // ユーザーがメッセージを送信する場合、管理者のメールアドレスを取得
      const admins = await db.user.findMany({
        where: { isAdmin: true },
        select: { email: true },
      })
      recipientEmails = admins.map((admin) => admin.email!)
      messageLink = `${process.env.NEXT_PUBLIC_APP_URL}/admin/message/${recipientCompanyId}`
    }

    if (recipientEmails.length === 0) {
      throw new Error("メールの送信先が見つかりませんでした")
    }

    const subject = "新しいメッセージが届きました"
    const body = `
    <div>
      <p>${user.name}様より新しいメッセージが届きました。</p>
      <p>メッセージ内容</p>
      <blockquote>${content}</blockquote>
      <p>詳細は以下のリンクから確認してください</p>
      <a href="${messageLink}">こちらをクリックして確認</a>
    </div>
    `

    // メールを送信
    await Promise.all(
      recipientEmails.map((email) => sendEmail(subject, body, email))
    )
  } catch (err) {
    console.error(err)
    throw new Error("メッセージの送信に失敗しました")
  }
}

export const markMessagesAsRead = async ({
  companyId,
  userIsAdmin,
}: {
  companyId: string
  userIsAdmin: boolean
}) => {
  try {
    await db.message.updateMany({
      where: {
        companyId,
        isRead: false,
        // 相手からのメッセージを対象にする
        senderType: userIsAdmin ? "COMPANY" : "ADMIN",
      },
      data: {
        isRead: true,
      },
    })
  } catch (error) {
    console.error("メッセージの既読化に失敗しました:", error)
  }
}

export const getUnreadMessagesCount = async ({
  companyId,
  userIsAdmin,
}: {
  companyId: string
  userIsAdmin: boolean
}) => {
  const count = await db.message.count({
    where: {
      companyId,
      isRead: false,
      senderType: userIsAdmin ? "COMPANY" : "ADMIN",
    },
  })

  return count
}
