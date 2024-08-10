"use server"

import { z } from "zod"
import { db } from "@/lib/prisma"
import { CompanyInfoSchema } from "@/schemas"

export const getCompanyById = async ({
  companyId,
}: {
  companyId: string | null
}) => {
  try {
    if (!companyId) {
      return null
    }

    const company = await db.company.findUnique({
      where: { id: companyId },
      include: {
        users: true,
      },
    })

    return company
  } catch (err) {
    console.error(err)
    return null
  }
}

export interface editCompanyProps extends z.infer<typeof CompanyInfoSchema> {
  id: string
}

export const editCompany = async (values: editCompanyProps) => {
  try {
    const { id, ...updateData } = values

    const company = await db.company.update({
      where: { id },
      data: updateData,
    })

    return company
  } catch (err) {
    console.error(err)
    return null
  }
}

export const getCompanies = async () => {
  try {
    const companies = await db.company.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        users: true,
      },
    })

    return companies
  } catch (err) {
    console.error(err)
    return []
  }
}

export const getCompaniesWithMessage = async () => {
  try {
    const companies = await db.company.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        messages: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    })

    return companies
  } catch (err) {
    console.error(err)
    return []
  }
}
