"use client"

import { Project, ProjectStatus } from "@prisma/client"
import { projectPerPage } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import ProjectItem from "@/components/member/ProjectItem"
import PaginationButton from "@/components/pagers/PaginationButton"
import { useRouter, useSearchParams } from "next/navigation"

interface ExtendedProject extends Project {
  status: ProjectStatus
  projectUpdatedAt: Date | null
}

interface ProjectListProps {
  projects: ExtendedProject[]
  pageCount: number
}

const ProjectList = ({ projects, pageCount }: ProjectListProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleStatusChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === "ALL") {
      params.delete("status")
    } else {
      params.set("status", value)
    }
    params.delete("page")
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-end">
        <Select
          onValueChange={handleStatusChange}
          defaultValue={searchParams.get("status") || "ALL"}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="ステータス" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">すべて</SelectItem>
            <SelectItem value="NEW">新規相談</SelectItem>
            <SelectItem value="NEGOTIATION">商談中</SelectItem>
            <SelectItem value="RECEIVED">受注</SelectItem>
            <SelectItem value="LOST">失注</SelectItem>
            <SelectItem value="DELIVERED">納品済み</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {projects.length === 0 ? (
        <div className="">紹介案件がありません</div>
      ) : (
        <>
          <div className="space-y-5">
            {projects.map((project) => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </div>

          {projects.length !== 0 && (
            <PaginationButton
              pageCount={pageCount}
              displayPerPage={projectPerPage}
            />
          )}
        </>
      )}
    </div>
  )
}

export default ProjectList
