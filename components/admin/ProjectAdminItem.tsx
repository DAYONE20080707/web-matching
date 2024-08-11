"use client"

import { Project } from "@prisma/client"
import { format } from "date-fns"
import Link from "next/link"

interface ProjectAdminItemProps {
  project: Project & {
    referredCount: number
  }
}

const ProjectAdminItem = ({ project }: ProjectAdminItemProps) => {
  return (
    <div className="grid grid-cols-3 gap-5 mb-5 border">
      <div className="border-r pr-5 p-5 space-y-2 col-span-1">
        <div className="font-bold text-lg mb-5">
          紹介済み : {project.referredCount}/{project.maxReferrals}社
        </div>
        <div className="text-sm">
          掲載日：{format(new Date(project.createdAt), "yyyy.MM.dd HH:mm")}
        </div>
        <div className="text-sm">
          更新日：{format(new Date(project.updatedAt), "yyyy.MM.dd HH:mm")}
        </div>
        <div className="text-sm">
          掲載期日：
          {format(new Date(project.publishEndDate), "yyyy.MM.dd HH:mm")}
        </div>
      </div>

      <div className="p-5 col-span-2 space-y-3">
        <div
          className={`border px-2 py-1 inline-block text-sm font-bold ${
            project.isReferralAllowed
              ? "border-black"
              : "text-red-500 border-red-500"
          }`}
        >
          {project.isReferralAllowed ? "紹介中" : "未紹介"}
        </div>
        <div className="font-bold underline text-lg">
          <Link href={`/admin/project/${project.id}`}>
            {project.companyName}
          </Link>
        </div>
        <div className="flex items-center space-x-10">
          <div className="flex items-baseline space-x-3">
            <div className="text-sm">案件予算(上限)</div>
            <div className="text-2xl font-bold">
              {project.budget.toLocaleString()}円
            </div>
          </div>
          <div className="flex items-baseline space-x-3">
            <div className="text-sm">紹介金額</div>
            <div className="text-2xl font-bold">
              {project.referralFee.toLocaleString()}円
            </div>
          </div>
        </div>
        <div>
          <div className="font-bold mb-1">制作種類内容</div>
          <div>{project.productTypes}</div>
        </div>
      </div>
    </div>
  )
}

export default ProjectAdminItem
