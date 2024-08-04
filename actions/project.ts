"use server"

import { z } from "zod"
import { db } from "@/lib/prisma"
import { OrderFormSchema } from "@/schemas"

export interface createProjectProps extends z.infer<typeof OrderFormSchema> {
  name: string
  email: string
}

export const createProject = async (values: createProjectProps) => {
  try {
    const { name, email } = values

    const project = await db.project.create({
      data: {
        ...values,
        name,
        email,
      },
    })

    return project
  } catch (err) {
    console.error(err)
    if (err instanceof Error) {
      throw new Error(err.message)
    } else {
      throw new Error("査定申込みに失敗しました。")
    }
  }
}
