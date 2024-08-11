"use client"

import { Project, ProjectStatus } from "@prisma/client"
import { format } from "date-fns"
import Link from "next/link"

interface ProjectItemProps {
  project: Project & {
    status: ProjectStatus
    projectUpdatedAt: Date | null
  }
}

const ProjectItem = ({ project }: ProjectItemProps) => {
  const getStatusLabel = (status: ProjectStatus) => {
    switch (status) {
      case "NEW":
        return { label: "新規相談", bgColor: "bg-sky-500" }
      case "NEGOTIATION":
        return { label: "商談中", bgColor: "bg-green-500" }
      case "REJECTED":
        return { label: "辞退", bgColor: "bg-gray-500" }
      case "LOST":
        return { label: "失注", bgColor: "bg-gray-500" }
      case "RECEIVED":
        return { label: "受注", bgColor: "bg-orange-500" }
      case "DELIVERED":
        return { label: "納品済み", bgColor: "bg-gray-500" }
      default:
        return { label: "不明", bgColor: "bg-gray-500" }
    }
  }

  const statusInfo = getStatusLabel(project.status)

  return (
    <div className="grid grid-cols-3 gap-5 mb-5 border">
      <div className="border-r pr-5 p-5 space-y-2 col-span-1">
        <div
          className={`${statusInfo.bgColor} text-white text-center py-2 font-bold`}
        >
          {statusInfo.label}
        </div>
        <div className="text-sm">
          掲載日：{format(new Date(project.createdAt), "yyyy.MM.dd HH:mm")}
        </div>
        <div className="text-sm">
          更新日：{format(new Date(project.updatedAt), "yyyy.MM.dd HH:mm")}
        </div>

        {project.status === "NEW" ? (
          <div className="text-sm">
            掲載期日：
            {format(new Date(project.publishEndDate), "yyyy.MM.dd HH:mm")}
          </div>
        ) : project.status === "NEGOTIATION" ? (
          <div className="text-sm">
            商談開始日：
            {project.projectUpdatedAt &&
              format(new Date(project.projectUpdatedAt), "yyyy.MM.dd HH:mm")}
          </div>
        ) : project.status === "REJECTED" ? (
          <div className="text-sm">
            辞退日：
            {project.projectUpdatedAt &&
              format(new Date(project.projectUpdatedAt), "yyyy.MM.dd HH:mm")}
          </div>
        ) : project.status === "LOST" ? (
          <div className="text-sm">
            失注日：
            {project.projectUpdatedAt &&
              format(new Date(project.projectUpdatedAt), "yyyy.MM.dd HH:mm")}
          </div>
        ) : project.status === "RECEIVED" ? (
          <div className="text-sm">
            受注日：
            {project.projectUpdatedAt &&
              format(new Date(project.projectUpdatedAt), "yyyy.MM.dd HH:mm")}
          </div>
        ) : project.status === "DELIVERED" ? (
          <div className="text-sm">
            納品日：
            {project.projectUpdatedAt &&
              format(new Date(project.projectUpdatedAt), "yyyy.MM.dd HH:mm")}
          </div>
        ) : null}
      </div>

      <div className="p-5 col-span-2 space-y-3">
        <div className="border px-2 py-1 border-black inline-block text-sm font-bold">
          紹介
        </div>
        <div className="font-bold underline text-lg">
          <Link href={`/member/project/${project.id}`}>
            {project.companyName} - {project.title}
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

export default ProjectItem
