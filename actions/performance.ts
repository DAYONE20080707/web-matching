"use server"

import { z } from "zod"
import { db } from "@/lib/prisma"
import { PerformanceSchema } from "@/schemas"

export interface createPerformanceProps
  extends z.infer<typeof PerformanceSchema> {
  companyId: string
}

export const createPerformance = async (values: createPerformanceProps) => {
  try {
    const { companyId, ...createData } = values

    const performance = await db.performance.create({
      data: {
        ...createData,
        company: { connect: { id: companyId } },
      },
    })

    return performance
  } catch (err) {
    console.error(err)
    return null
  }
}

export const getPerformanceByCompanyId = async ({
  companyId,
}: {
  companyId: string | null
}) => {
  try {
    if (!companyId) {
      return []
    }

    const performances = await db.performance.findMany({
      where: {
        companyId,
      },
    })

    return performances
  } catch (err) {
    console.error(err)
    return []
  }
}
