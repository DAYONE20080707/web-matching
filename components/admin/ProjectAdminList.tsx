"use client"

import { Project } from "@prisma/client"
import { projectPerPage } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"
import ProjectAdminItem from "@/components/admin/ProjectAdminItem"
import PaginationButton from "@/components/pagers/PaginationButton"

interface ExtendedProject extends Project {
  referredCount: number
}

interface ProjectAdminListProps {
  projects: ExtendedProject[]
  pageCount: number
}

const ProjectAdminList = ({ projects, pageCount }: ProjectAdminListProps) => {
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
            <SelectValue placeholder="状態" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">すべて</SelectItem>
            <SelectItem value="referred">紹介済み</SelectItem>
            <SelectItem value="referring">紹介中</SelectItem>
            <SelectItem value="notReferred">未紹介</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {projects.length === 0 ? (
        <div>紹介案件はありません</div>
      ) : (
        <>
          <div className="space-y-5">
            {projects.map((project) => (
              <ProjectAdminItem key={project.id} project={project} />
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

export default ProjectAdminList
