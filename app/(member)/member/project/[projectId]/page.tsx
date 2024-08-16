import { redirect } from "next/navigation"
import { getProjectByIdWithStatus } from "@/actions/project"
import { getAuthUser } from "@/lib/nextauth"
import ProjectDetail from "@/components/member/ProjectDetail"

interface ProjectDetailPageProps {
  params: {
    projectId: string
  }
}

const ProjectDetailPage = async ({ params }: ProjectDetailPageProps) => {
  const { projectId } = params

  const user = await getAuthUser()

  if (!user) {
    redirect("/")
  }

  if (!user.companyId) {
    redirect("/")
  }

  const project = await getProjectByIdWithStatus({
    projectId,
    companyId: user.companyId,
  })

  if (!project) {
    redirect("/member/project")
  }

  return (
    <div className="bg-white border w-full rounded md:rounded-r-md p-2 md:p-10 h-full">
      <div className="text-xl font-bold border-b border-black pb-5 mb-5">
        {project.title}
      </div>

      <ProjectDetail project={project} companyId={user.companyId} />
    </div>
  )
}

export default ProjectDetailPage
