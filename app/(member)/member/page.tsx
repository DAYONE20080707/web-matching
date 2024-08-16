import { redirect } from "next/navigation"
import { getAuthUser } from "@/lib/nextauth"
import { getMyProjects } from "@/actions/project"
import ProjectItem from "@/components/member/ProjectItem"
import NewsItem from "@/components/member/NewsItem"

const MemberPage = async () => {
  const user = await getAuthUser()

  if (!user) {
    redirect("/")
  }

  if (!user.companyId) {
    redirect("/")
  }

  const projects = await getMyProjects({ companyId: user.companyId })

  const newsList = [
    {
      id: "1",
      date: "2024-08-02",
      content:
        "この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、",
    },
    {
      id: "2",
      date: "2024-08-01",
      content:
        "この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、",
    },
  ]

  return (
    <div className="bg-white border w-full rounded md:rounded-r-md p-2 md:p-10 h-full">
      <div className="text-xl font-bold border-b border-black pb-5 mb-5">
        お知らせ
      </div>

      {newsList.length === 0 ? (
        <div>お知らせがありません</div>
      ) : (
        <div className=" mb-10">
          {newsList.map((news) => (
            <NewsItem key={news.id} news={news} />
          ))}
        </div>
      )}

      <div className="text-xl font-bold border-b border-black pb-5 mb-5">
        対応中案件
      </div>

      {projects.length === 0 ? (
        <div>対応中の案件はありません</div>
      ) : (
        projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))
      )}
    </div>
  )
}

export default MemberPage
