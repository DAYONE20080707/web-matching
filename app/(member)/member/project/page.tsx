import { getProjectsWithStatus } from "@/actions/project"
import { redirect } from "next/navigation"
import { getAuthUser } from "@/lib/nextauth"
import ProjectItem from "@/components/member/ProjectItem"

const ProjectPage = async () => {
  const user = await getAuthUser()

  if (!user) {
    redirect("/")
  }

  if (!user.companyId) {
    redirect("/")
  }

  const maxNegtiationCount = 2

  const projects = await getProjectsWithStatus({
    companyId: user.companyId,
    maxNegtiationCount,
  })

  return (
    <div className="bg-white border w-full rounded-r-md p-10 h-full">
      <div className="text-xl font-bold border-b border-black pb-5 mb-5">
        紹介案件
      </div>

      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  )
}

export default ProjectPage
