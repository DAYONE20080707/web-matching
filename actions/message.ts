"use server"

import { z } from "zod"
import { db } from "@/lib/prisma"
import { User } from "@prisma/client"

export const getMessages = async ({ companyId }: { companyId: string }) => {
  try {
    const messages = await db.message.findMany({
      where: {
        companyId,
      },
      orderBy: {
        createdAt: "asc",
      },
    })

    return messages
  } catch (err) {
    console.error(err)
    return []
  }
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
        userId: user.isAdmin ? user.id : null,
        companyId: user.isAdmin ? companyId : user.companyId,
      },
    })
  } catch (err) {
    console.error(err)
    throw new Error("メッセージの送信に失敗しました")
  }
}
