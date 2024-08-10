"use server"

import { z } from "zod"
import { db } from "@/lib/prisma"
import { User } from "@prisma/client"

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
    await db.message.create({
      data: {
        content,
        senderType: user.isAdmin ? "ADMIN" : "COMPANY",
        userId: user.id,
        companyId: user.isAdmin ? companyId : user.companyId,
      },
    })
  } catch (err) {
    console.error(err)
    throw new Error("メッセージの送信に失敗しました")
  }
}
