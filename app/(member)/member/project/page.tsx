import { getProjects } from "@/actions/project"
import ProjectItem from "@/components/member/ProjectItem"

const ProjectPage = async () => {
  const projects = await getProjects()

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
