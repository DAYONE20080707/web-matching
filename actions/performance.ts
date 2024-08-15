"use server"

import { z } from "zod"
import { db } from "@/lib/prisma"
import { PerformanceSchema } from "@/schemas"
import { createCloudImage, deleteCloudImage } from "@/actions/cloudImage"
import { extractPublicId } from "cloudinary-build-url"

export interface createPerformanceProps
  extends z.infer<typeof PerformanceSchema> {
  companyId: string
  base64Image: string | undefined
}

export const createPerformance = async (values: createPerformanceProps) => {
  try {
    const { companyId, base64Image, ...createData } = values

    let imageUrl

    if (base64Image) {
      imageUrl = await createCloudImage(base64Image)
    }

    const performance = await db.performance.create({
      data: {
        ...createData,
        imageUrl,
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
      orderBy: {
        updatedAt: "desc",
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
  base64Image: string | undefined
}

export const editPerformance = async (values: editPerformanceProps) => {
  try {
    const { id, base64Image, ...updateData } = values

    let imageUrl

    if (base64Image) {
      const performance = await db.performance.findUnique({
        where: { id },
      })

      if (!performance) {
        throw new Error("実績が登録されていません")
      }

      // 古い画像を削除
      if (performance.imageUrl) {
        const publicId = extractPublicId(performance.imageUrl)
        await deleteCloudImage(publicId)
      }

      // 新しい画像をアップロード
      imageUrl = await createCloudImage(base64Image)
    }

    const performance = await db.performance.update({
      where: { id },
      data: {
        ...updateData,
        imageUrl,
      },
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
