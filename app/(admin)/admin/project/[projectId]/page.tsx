import { redirect } from "next/navigation"
import { getProjectById } from "@/actions/project"
import ProjectAdminDetail from "@/components/admin/ProjectAdminDetail"

interface ProjectAdminDetailPageProps {
  params: {
    projectId: string
  }
}

const ProjectAdminDetailPage = async ({
  params,
}: ProjectAdminDetailPageProps) => {
  const { projectId } = params

  const project = await getProjectById({
    projectId,
  })

  if (!project) {
    redirect("/admin")
  }

  return (
    <div className="bg-white md:border w-full rounded md:rounded-r-md p-2 md:p-10 h-full">
      <div className="text-xl font-bold border-b border-black pb-5 mb-5">
        紹介案件情報・編集
      </div>

      <ProjectAdminDetail project={project} />
    </div>
  )
}

export default ProjectAdminDetailPage
