"use server"

import { z } from "zod"
import { db } from "@/lib/prisma"
import { OrderFormSchema } from "@/schemas"
import { addDays } from "date-fns"

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
        otherProductType: values.otherProductType,
        desiredFunctionTypes,
        otherDesiredFunctionType: values.otherDesiredFunctionType,
        requests: values.requests,
        publishEndDate: addDays(new Date(), 7),
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

export const getProjects = async () => {
  try {
    const projects = await db.project.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    })

    return projects
  } catch (err) {
    console.error(err)
    return []
  }
}

export const getProjectsWithStatus = async ({
  companyId,
  maxNegtiationCount,
}: {
  companyId: string
  maxNegtiationCount: number
}) => {
  try {
    const projects = await db.project.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        projectCompanies: true,
      },
    })

    const filteredProjects = projects.filter((project) => {
      const currentCompanyProject = project.projectCompanies.find(
        (pc) => pc.companyId === companyId
      )

      // isReceived が true のプロジェクトは、商談中、受注、失注、納品済みのステータスを持つ会社には表示
      if (project.isReceived) {
        return (
          currentCompanyProject &&
          ["NEGOTIATION", "RECEIVED", "DELIVERED", "LOST"].includes(
            currentCompanyProject.status
          )
        )
      }

      const negotiationCount = project.projectCompanies.filter(
        (pc) => pc.status === "NEGOTIATION"
      ).length

      // 商談中が maxNegtiationCount社未満、または現在の会社のステータスが NEW 以外なら表示
      return (
        negotiationCount < maxNegtiationCount ||
        (currentCompanyProject &&
          ["NEGOTIATION", "RECEIVED", "DELIVERED", "LOST"].includes(
            currentCompanyProject.status
          ))
      )
    })

    const projectsWithStatus = filteredProjects.map((project) => {
      const currentCompanyProject = project.projectCompanies.find(
        (pc) => pc.companyId === companyId
      )
      const projectStatus = currentCompanyProject?.status || "NEW"
      return {
        ...project,
        status: projectStatus,
      }
    })

    return projectsWithStatus
  } catch (err) {
    console.error(err)
    return []
  }
}

export const getProjectById = async ({ projectId }: { projectId: string }) => {
  try {
    const project = await db.project.findUnique({
      where: {
        id: projectId,
      },
    })

    return project
  } catch (err) {
    console.error(err)
    return null
  }
}

export const getProjectByIdWithStatus = async ({
  projectId,
  companyId,
  maxNegtiationCount,
}: {
  projectId: string
  companyId: string
  maxNegtiationCount: number
}) => {
  try {
    // プロジェクトを取得
    const project = await db.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        projectCompanies: true, // ProjectCompany を含める
      },
    })

    if (!project) {
      return null
    }

    // 受注済みのプロジェクトは、他の会社には表示しない
    if (project.isReceived) {
      const currentCompanyProject = project.projectCompanies.find(
        (pc) => pc.companyId === companyId
      )
      if (
        !currentCompanyProject ||
        !["NEGOTIATION", "RECEIVED", "DELIVERED", "LOST"].includes(
          currentCompanyProject.status
        )
      ) {
        return null // 該当の会社には表示しない
      }
    }

    // ProjectCompany のステータスを取得
    const projectCompany = await db.projectCompany.findUnique({
      where: {
        projectId_companyId: {
          projectId,
          companyId,
        },
      },
      select: {
        status: true,
      },
    })

    // 商談中の会社が2社以上の場合
    const negotiationCount = project.projectCompanies.filter(
      (pc) => pc.status === "NEGOTIATION"
    ).length

    if (
      negotiationCount >= maxNegtiationCount &&
      (!projectCompany || projectCompany.status === "NEW")
    ) {
      return null // 商談中の会社がmaxNegtiationCount社以上で、現在の会社が商談中でない場合は表示しない
    }

    // projectCompany のステータスが存在すれば、それをプロジェクトのステータスとして返す
    if (projectCompany) {
      return {
        ...project,
        status: projectCompany.status,
      }
    }

    // projectCompany のステータスが存在しない場合はプロジェクトを返すが、初期状態でステータスをNEWにする
    return {
      ...project,
      status: "NEW",
    }
  } catch (err) {
    console.error(err)
    return null
  }
}

export const negotiateProject = async ({
  companyId,
  projectId,
  itemName,
}: {
  companyId: string
  projectId: string
  itemName: string
}) => {
  try {
    const usageFee = 30000

    // プロジェクトと会社の関連付けを作成
    await db.projectCompany.create({
      data: {
        projectId,
        companyId,
        status: "NEGOTIATION",
      },
    })

    // 利用料金の登録
    await db.usageFee.create({
      data: {
        itemName,
        unitPrice: usageFee,
        quantity: 1,
        totalPrice: usageFee,
        usageMonth: new Date(),
        CompanyId: companyId,
      },
    })
  } catch (err) {
    console.error(err)
    throw new Error("紹介の希望に失敗しました")
  }
}

export const lostProject = async ({
  companyId,
  projectId,
}: {
  companyId: string
  projectId: string
}) => {
  try {
    await db.projectCompany.update({
      where: {
        projectId_companyId: {
          projectId,
          companyId,
        },
      },
      data: {
        status: "LOST",
      },
    })
  } catch (err) {
    console.error(err)
    throw new Error("案件の失注に失敗しました")
  }
}

export const receivedProject = async ({
  companyId,
  projectId,
}: {
  companyId: string
  projectId: string
}) => {
  try {
    await db.project.update({
      where: { id: projectId },
      data: { isReceived: true },
    })

    await db.projectCompany.update({
      where: {
        projectId_companyId: {
          projectId,
          companyId,
        },
      },
      data: {
        status: "RECEIVED",
      },
    })
  } catch (err) {
    console.error(err)
    throw new Error("案件の受注に失敗しました")
  }
}

export const lostDelivered = async ({
  companyId,
  projectId,
}: {
  companyId: string
  projectId: string
}) => {
  try {
    await db.projectCompany.update({
      where: {
        projectId_companyId: {
          projectId,
          companyId,
        },
      },
      data: {
        status: "DELIVERED",
      },
    })
  } catch (err) {
    console.error(err)
    throw new Error("案件の納品に失敗しました")
  }
}
