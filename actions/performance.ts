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

export interface editPerformanceProps
  extends z.infer<typeof PerformanceSchema> {
  id: string
}

export const editPerformance = async (values: editPerformanceProps) => {
  try {
    const { id, ...updateData } = values

    const performance = await db.performance.update({
      where: { id },
      data: updateData,
    })

    return performance
  } catch (err) {
    console.error(err)
    return null
  }
}

export const getPerformanceById = async ({
  performanceId,
}: {
  performanceId: string
}) => {
  try {
    const performance = await db.performance.findUnique({
      where: {
        id: performanceId,
      },
    })

    return performance
  } catch (err) {
    console.error(err)
    return null
  }
}

export const deletePerformanceById = async ({
  performanceId,
}: {
  performanceId: string
}) => {
  try {
    await db.performance.delete({
      where: {
        id: performanceId,
      },
    })
  } catch (err) {
    console.error(err)
  }
}
