"use server"

import { db } from "@/lib/prisma"
import { format } from "date-fns"

export const getUsageFeesByCompanyId = async ({
  companyId,
}: {
  companyId: string
}) => {
  try {
    // 会社IDに基づいてUsageFeeを取得
    const usageFees = await db.usageFee.findMany({
      where: {
        CompanyId: companyId,
      },
      orderBy: {
        usageMonth: "asc",
      },
    })

    // 年月ごとにUsageFeeをグループ化
    const usageFeesByMonth = usageFees.reduce(
      (acc, usageFee) => {
        const yearMonth = format(new Date(usageFee.usageMonth), "yyyy-MM")

        if (!acc[yearMonth]) {
          acc[yearMonth] = {
            items: [],
            totalAmount: 0,
          }
        }

        acc[yearMonth].items.push({
          itemName: usageFee.itemName,
          unitPrice: usageFee.unitPrice,
          quantity: usageFee.quantity,
          totalPrice: usageFee.totalPrice,
        })

        acc[yearMonth].totalAmount += usageFee.totalPrice

        return acc
      },
      {} as Record<
        string,
        {
          items: Array<{
            itemName: string
            unitPrice: number
            quantity: number
            totalPrice: number
          }>
          totalAmount: number
        }
      >
    ) // 各月のデータを保持

    return usageFeesByMonth
  } catch (err) {
    console.error(err)
    return []
  }
}
