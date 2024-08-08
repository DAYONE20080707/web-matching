"use server"

import { z } from "zod"
import { db } from "@/lib/prisma"
import { OrderFormSchema } from "@/schemas"

export interface createProjectProps extends z.infer<typeof OrderFormSchema> {
  name: string
  email: string
  productTypes: string
  desiredFunctionTypes: string
}

export const createProject = async (values: createProjectProps) => {
  try {
    const { name, email, productTypes, desiredFunctionTypes } = values

    const project = await db.project.create({
      data: {
        name,
        email,
        companyName: values.companyName,
        companyPostCode: values.companyPostCode,
        companyPrefecture: values.companyPrefecture,
        companyCity: values.companyCity,
        companyAddress: values.companyAddress,
        companyPhone: values.companyPhone,
        budget: values.budget,
        planPageNumber: values.planPageNumber,
        productTypes,
        desiredFunctionTypes,
        requests: values.requests,
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
