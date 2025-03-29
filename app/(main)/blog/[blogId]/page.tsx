import BlogDetail from "@/components/main/blog/BlogDetail"
import { microcms } from "@/lib/microcms"
import { BlogType } from "@/types"
import * as cheerio from "cheerio"

interface BlogDetailPageProps {
  params: {
    blogId: string
  }
}

const BlogDetailPage = async ({ params }: BlogDetailPageProps) => {
  const { blogId } = params

  const blog: BlogType = await microcms.get({
    endpoint: "blogs",
    contentId: blogId,
    customRequestInit: {
      cache: "no-store",
    },
  })

  if (blog?.content) {
    const $ = cheerio.load(blog.content)

    $("p").each((_, element) => {
      $(element).addClass("my-5")
    })
    $("h1").each((_, element) => {
      $(element).addClass("text-3xl font-bold my-7 border-b pb-2")
    })
    $("h2").each((_, element) => {
      $(element).addClass("text-2xl font-bold my-7")
    })
    $("h3").each((_, element) => {
      $(element).addClass("text-xl font-bold my-6")
    })
    $("h4").each((_, element) => {
      $(element).addClass("text-lg font-bold my-5")
    })
    $("h5").each((_, element) => {
      $(element).addClass("text-md font-bold my-5")
    })
    $("ul").each((_, element) => {
      $(element).addClass("list-disc ml-5 my-5")
    })
    $("ol").each((_, element) => {
      $(element).addClass("list-decimal ml-5 my-5")
    })
    $("blockquote").each((_, element) => {
      $(element).addClass("border-l-4 pl-4 italic my-5")
    })
    $("table").each((_, element) => {
      $(element).addClass("table-auto border-collapse border my-5")
    })
    $("th").each((_, element) => {
      $(element).addClass("border px-4 py-1 bg-gray-50")
    })
    $("th p").each((_, element) => {
      $(element).removeClass("my-5")
      $(element).addClass("my-0")
    })
    $("td").each((_, element) => {
      $(element).addClass("border px-4 py-1")
    })
    $("td p").each((_, element) => {
      $(element).removeClass("my-5")
      $(element).addClass("my-0")
    })
    $("a").each((_, element) => {
      $(element).addClass("text-blue-500 underline")
    })
    $("img").each((_, element) => {
      $(element).addClass("my-5")
    })
    $("hr").each((_, element) => {
      $(element).addClass("my-5")
    })

    // パース後のHTMLを更新
    blog.content = $.html()
  }

  if (!blog) {
    return <div className="text-center text-sm my-10">ブログがありません</div>
  }

  return (
    <div>
      <BlogDetail blog={blog} />
    </div>
  )
}

export default BlogDetailPage
