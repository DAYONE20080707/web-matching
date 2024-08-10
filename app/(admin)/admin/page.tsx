import { redirect } from "next/navigation"
import { getAuthUser } from "@/lib/nextauth"
import { getProjectsByAdmin } from "@/actions/project"
import ProjectAdminItem from "@/components/admin/ProjectAdminItem"

const AdminPage = async () => {
  const user = await getAuthUser()

  if (!user) {
    redirect("/")
  }

  const projects = await getProjectsByAdmin()

  return (
    <div className="bg-white border w-full rounded-r-md p-10 h-full">
      <div className="text-xl font-bold border-b border-black pb-5 mb-5">
        紹介案件一覧
      </div>

      {projects.length === 0 ? (
        <div>紹介案件はありません</div>
      ) : (
        projects.map((project) => (
          <ProjectAdminItem key={project.id} project={project} />
        ))
      )}
    </div>
  )
}

export default AdminPage
