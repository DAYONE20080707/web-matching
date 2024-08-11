"use server"

import { z } from "zod"
import { db } from "@/lib/prisma"
import { OrderFormSchema, ProjectSchema } from "@/schemas"
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
        title: values.title,
        budget: values.budget,
        planPageNumber: values.planPageNumber,
        productTypes,
        otherProductType: values.otherProductType,
        desiredFunctionTypes,
        otherDesiredFunctionType: values.otherDesiredFunctionType,
        requests: values.requests,
        publishEndDate: addDays(new Date(), 7),
        referralFee: 30000,
        maxReferrals: 2,
        contactMethod: "メール",
        dueDate: values.dueDate,
        isReferralAllowed: false,
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

export interface editProjectProps extends z.infer<typeof ProjectSchema> {
  id: string
  productTypes: string
  desiredFunctionTypes: string
}

export const editProject = async (values: editProjectProps) => {
  try {
    const { id, productTypes, desiredFunctionTypes } = values

    await db.project.update({
      where: {
        id,
      },
      data: {
        name: values.name,
        email: values.email,
        companyName: values.companyName,
        companyPostCode: values.companyPostCode,
        companyPrefecture: values.companyPrefecture,
        companyCity: values.companyCity,
        companyAddress: values.companyAddress,
        companyPhone: values.companyPhone,
        title: values.title,
        budget: values.budget,
        planPageNumber: values.planPageNumber,
        productTypes,
        otherProductType: values.otherProductType,
        desiredFunctionTypes,
        otherDesiredFunctionType: values.otherDesiredFunctionType,
        requests: values.requests,
        publishEndDate: values.publishEndDate,
        referralFee: values.referralFee,
        maxReferrals: values.maxReferrals,
        contactMethod: values.contactMethod,
        dueDate: values.dueDate,
        isReferralAllowed: values.isReferralAllowed,
      },
    })
  } catch (err) {
    console.error(err)
    throw new Error("案件情報の編集に失敗しました。")
  }
}

export const getMyProjects = async ({ companyId }: { companyId: string }) => {
  try {
    // 商談中または受注のステータスを持つ ProjectCompany を取得
    const projectCompanies = await db.projectCompany.findMany({
      where: {
        companyId,
        status: {
          in: ["NEGOTIATION", "RECEIVED"], // 商談中または受注
        },
      },
      include: {
        project: true, // 紐づいているプロジェクトを含める
      },
      orderBy: {
        updatedAt: "desc",
      },
    })

    // プロジェクトとステータスのリストを返す
    return projectCompanies.map((pc) => ({
      ...pc.project,
      status: pc.status,
    }))
  } catch (err) {
    console.error(err)
    return []
  }
}

export const getProjectsWithStatus = async ({
  companyId,
}: {
  companyId: string
}) => {
  try {
    const today = new Date()

    const projects = await db.project.findMany({
      where: {
        isReferralAllowed: true,
        publishEndDate: {
          gte: today, // publishEndDateが本日より前のものを除外
        },
      },
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

      // 商談中が 紹介最大数未満、または現在の会社のステータスが NEW 以外なら表示
      return (
        negotiationCount < project.maxReferrals ||
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

      const projectUpdatedAt = currentCompanyProject?.updatedAt

      return {
        ...project,
        status: projectStatus,
        projectUpdatedAt: projectUpdatedAt || null,
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
}: {
  projectId: string
  companyId: string
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
      negotiationCount >= project.maxReferrals &&
      (!projectCompany || projectCompany.status === "NEW")
    ) {
      return null // 商談中の会社が最大紹介数以上で、現在の会社が商談中でない場合は表示しない
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
    // プロジェクトのreferralFeeを取得
    const project = await db.project.findUnique({
      where: { id: projectId },
      select: { referralFee: true },
    })

    if (!project) {
      throw new Error("紹介案件が見つかりません")
    }

    // 紹介案件と会社の関連付けを作成
    await db.projectCompany.create({
      data: {
        projectId,
        companyId,
        status: "NEGOTIATION",
      },
    })

    const referralFee = project.referralFee

    // 利用料金の登録
    await db.usageFee.create({
      data: {
        itemName,
        unitPrice: referralFee,
        quantity: 1,
        totalPrice: referralFee,
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

export const getProjectsByAdmin = async () => {
  try {
    // プロジェクト一覧を取得し、各プロジェクトの紹介済み案件の個数を計算
    const projects = await db.project.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        projectCompanies: true,
      },
    })

    // 紹介済み案件の個数を計算してプロジェクトに追加
    const projectsWithReferredCount = projects.map((project) => {
      const referredCount = project.projectCompanies.length
      return {
        ...project,
        referredCount,
      }
    })

    return projectsWithReferredCount
  } catch (err) {
    console.error(err)
    return []
  }
}
