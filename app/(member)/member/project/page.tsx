import { getProjectsWithStatus } from "@/actions/project"
import { redirect } from "next/navigation"
import { getAuthUser } from "@/lib/nextauth"
import { projectPerPage } from "@/lib/utils"
import ProjectList from "@/components/member/ProjectList"

interface ProjectPageProps {
  searchParams: {
    [key: string]: string | undefined
  }
}

const ProjectPage = async ({ searchParams }: ProjectPageProps) => {
  const { page, perPage, status } = searchParams

  const user = await getAuthUser()

  if (!user) {
    redirect("/")
  }

  if (!user.companyId) {
    redirect("/")
  }

  const limit = typeof perPage === "string" ? parseInt(perPage) : projectPerPage
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0
  const statusFilter = typeof status === "string" ? status : undefined

  const { projects, totalProjects } = await getProjectsWithStatus({
    companyId: user.companyId,
    limit,
    offset,
    statusFilter,
  })

  const pageCount = Math.ceil(totalProjects / limit)

  return (
    <div className="bg-white md:border w-full rounded md:rounded-r-md p-2 md:p-10 h-full">
      <div className="text-xl font-bold border-b border-black pb-5 mb-5">
        紹介案件
      </div>

      <ProjectList projects={projects} pageCount={pageCount} />
    </div>
  )
}

export default ProjectPage
