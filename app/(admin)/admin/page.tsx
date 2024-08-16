import { getProjectsByAdmin } from "@/actions/project"
import { projectPerPage } from "@/lib/utils"
import ProjectAdminList from "@/components/admin/ProjectAdminList"

interface AdminPageProps {
  searchParams: {
    [key: string]: string | undefined
  }
}

const AdminPage = async ({ searchParams }: AdminPageProps) => {
  const { page, perPage, status } = searchParams

  const limit = typeof perPage === "string" ? parseInt(perPage) : projectPerPage
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0
  const statusFilter = typeof status === "string" ? status : undefined

  const { projects, totalProjects } = await getProjectsByAdmin({
    limit,
    offset,
    statusFilter,
  })

  const pageCount = Math.ceil(totalProjects / limit)

  return (
    <div className="bg-white md:border w-full rounded md:rounded-r-md p-2 md:p-10 h-full">
      <div className="text-xl font-bold border-b border-black pb-5 mb-5">
        紹介案件一覧
      </div>

      <ProjectAdminList projects={projects} pageCount={pageCount} />
    </div>
  )
}

export default AdminPage
