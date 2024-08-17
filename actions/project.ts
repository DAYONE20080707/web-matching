"use server"

import { z } from "zod"
import { db } from "@/lib/prisma"
import { OrderFormSchema, ProjectSchema } from "@/schemas"
import { addDays } from "date-fns"
import { sendEmail } from "@/actions/sendEmail"
import { SITE_NAME } from "@/lib/utils"

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

    const subject = `【${SITE_NAME}】査定申し込み完了`
    const body = `
<div>
  <p>${name}様</p>
  <p>
    査定申し込みが完了しました。<br />
    査定には、数日かかる場合がございます。<br />
    担当者がご連絡致しますので、しばらくお待ちください。
  </p>
</div>
`

    // クライアントにメールを送信
    await sendEmail(subject, body, values.email)

    // isAdminがtrueのユーザーを取得
    const adminUsers = await db.user.findMany({
      where: { isAdmin: true },
      select: { email: true },
    })

    // 管理者に送信するメールの内容
    const subjectToAdmin = "新しい査定が申し込まれました"
    const bodyToAdmin = `
<div>
  <p>新しい査定が申し込まれました。以下は申し込まれた案件の情報です。</p>
  <ul>
    <li><strong>タイトル:</strong> ${project.title}</li>
    <li><strong>会社名:</strong> ${project.companyName}</li>
    <li><strong>予算:</strong> ${project.budget.toLocaleString()}円</li>
    <li><strong>納期:</strong> ${project.dueDate.toLocaleDateString()}</li>
    <li><strong>所在地:</strong> ${project.companyPrefecture}${
      project.companyCity
    }${project.companyAddress}</li>
  </ul>
  <p>詳細は管理ページで確認できます。</p>
  <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/project/${
      project.id
    }">こちらをクリックして詳細を確認</a>
</div>
`

    // 各管理者にメールを送信
    for (const admin of adminUsers) {
      if (!admin.email) {
        continue
      }
      await sendEmail(subjectToAdmin, bodyToAdmin, admin.email)
    }

    return project
  } catch (err) {
    console.error(err)
    if (err instanceof Error) {
      throw new Error(err.message)
    } else {
      throw new Error("査定申し込みに失敗しました。")
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

    // 現在のプロジェクトデータを取得
    const existingProject = await db.project.findUnique({
      where: { id },
    })

    // isReferralAllowedがfalseからtrueに変更された場合のみ処理を行う
    if (!existingProject?.isReferralAllowed && values.isReferralAllowed) {
      // 対象となる制作会社を取得
      const matchingCompanies = await db.company.findMany({
        where: {
          companyArea: {
            contains: values.companyPrefecture,
          },
        },
        include: {
          users: true,
        },
      })

      // 対象の制作会社にメールを送信
      const subject = `【${SITE_NAME}】新しい紹介案件のお知らせ`
      const bodyTemplate = (name: string) => `
      <div>
      <p>${name}様</p>
      <p>新しい紹介案件が追加されました。以下は案件の情報です。</p>
      <ul>
        <li><strong>タイトル:</strong> ${values.title}</li>
        <li><strong>会社名:</strong> ${values.companyName}</li>
        <li><strong>予算:</strong> ${values.budget.toLocaleString()}円</li>
        <li><strong>予定ページ数:</strong> ${values.planPageNumber}ページ</li>
        <li><strong>制作種類内容:</strong> ${productTypes}</li>
        <li><strong>欲しい機能:</strong> ${desiredFunctionTypes}</li>
      </ul>
      <p>詳細はマイページで確認できます。</p>
      <p><a href="${
        process.env.NEXT_PUBLIC_APP_URL
      }/member/project/${id}">こちらをクリックして詳細を確認</a></p>
    </div>
  `
      // 各制作会社の担当者にメールを送信
      for (const company of matchingCompanies) {
        for (const user of company.users) {
          const body = bodyTemplate(user.name)
          await sendEmail(subject, body, user.email!)
        }
      }
    }

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
      projectUpdatedAt: pc.updatedAt || null, // ProjectCompanyのupdatedAtをprojectUpdatedAtとして返す
    }))
  } catch (err) {
    console.error(err)
    return []
  }
}

export const getProjectsWithStatus = async ({
  companyId,
  limit,
  offset,
  statusFilter,
}: {
  companyId: string
  limit: number
  offset: number
  statusFilter?: string
}) => {
  try {
    const today = new Date()

    // まずは全てのプロジェクトを取得
    const allProjects = await db.project.findMany({
      where: {
        isReferralAllowed: true,
        publishEndDate: {
          gte: today,
        },
      },
      include: {
        projectCompanies: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    })

    // 会社IDでフィルタリング
    const filteredProjects = allProjects.filter((project) => {
      const currentCompanyProject = project.projectCompanies.find(
        (pc) => pc.companyId === companyId
      )

      const projectStatus = currentCompanyProject?.status || "NEW"

      // フィルタリング条件
      if (
        statusFilter &&
        statusFilter !== "ALL" &&
        projectStatus !== statusFilter
      ) {
        return false
      }

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

      return (
        negotiationCount < project.maxReferrals ||
        (currentCompanyProject &&
          ["NEGOTIATION", "RECEIVED", "DELIVERED", "LOST"].includes(
            currentCompanyProject.status
          ))
      )
    })

    // フィルタリング後のプロジェクト数を計算
    const totalProjects = filteredProjects.length

    // ページネーションのためのプロジェクトを取得
    const projectsWithStatus = filteredProjects
      .slice(offset, offset + limit)
      .map((project) => {
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

    return { projects: projectsWithStatus, totalProjects }
  } catch (err) {
    console.error(err)
    return { projects: [], totalProjects: 0 }
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

export const getProjectsByAdmin = async ({
  limit,
  offset,
  statusFilter,
}: {
  limit: number
  offset: number
  statusFilter?: string
}) => {
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
    let projectsWithReferredCount = projects.map((project) => {
      const referredCount = project.projectCompanies.length
      return {
        ...project,
        referredCount,
      }
    })

    // フィルタリングの処理
    if (statusFilter) {
      if (statusFilter === "referred") {
        projectsWithReferredCount = projectsWithReferredCount.filter(
          (project) => project.referredCount > 0
        )
      } else if (statusFilter === "referring") {
        projectsWithReferredCount = projectsWithReferredCount.filter(
          (project) => project.isReferralAllowed
        )
      } else if (statusFilter === "notReferred") {
        projectsWithReferredCount = projectsWithReferredCount.filter(
          (project) => !project.isReferralAllowed
        )
      }
    }

    const totalProjects = projectsWithReferredCount.length

    // ページネーション処理
    const paginatedProjects = projectsWithReferredCount.slice(
      offset,
      offset + limit
    )

    return { projects: paginatedProjects, totalProjects }
  } catch (err) {
    console.error(err)
    return { projects: [], totalProjects: 0 }
  }
}
