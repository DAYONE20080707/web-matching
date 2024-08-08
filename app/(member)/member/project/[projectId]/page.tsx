import { redirect } from "next/navigation"
import { getProjectById } from "@/actions/project"
import ProjectDetail from "@/components/member/ProjectDetail"

interface ProjectDetailPageProps {
  params: {
    projectId: string
  }
}

const ProjectDetailPage = async ({ params }: ProjectDetailPageProps) => {
  const { projectId } = params

  const project = await getProjectById({ projectId })

  if (!project) {
    redirect("/member/project")
  }

  return (
    <div className="bg-white border w-full rounded-r-md p-10 h-full">
      <div className="text-xl font-bold border-b border-black pb-5 mb-5">
        紹介案件情報
      </div>

      <ProjectDetail project={project} />
    </div>
  )
}

export default ProjectDetailPage
