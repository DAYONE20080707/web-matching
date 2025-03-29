"use client"

import BlogItem from "@/components/main/blog/BlogItem"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { microcms } from "@/lib/microcms"
import { BlogType } from "@/types"

const BlogList = () => {
  const [blogs, setBlogs] = useState<BlogType[]>([])
  const [visibleBlogs, setVisibleBlogs] = useState<number>(6)

  useEffect(() => {
    const fn = async () => {
      const blogs = await microcms.getList({
        endpoint: "blogs",
        queries: {
          limit: 50,
          orders: "-publishedAt",
        },
        customRequestInit: {
          cache: "no-store",
        },
      })
      setBlogs(blogs.contents)
    }

    fn()
  }, [])

  const handleLoadMore = () => {
    setVisibleBlogs((prev) => prev + 4)
  }

  return (
    <div className="bg-secondary">
      <div className="px-3 max-w-screen-xl mx-auto py-20">
        <div className="text-primary text-xl mb-3">お役立ち資料</div>
        <div className="font-bold text-2xl mb-10">
          役立つ資料で
          <br />
          よりスマートな補助金申請
        </div>

        <div className="bg-white rounded-lg p-3 md:p-10 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
            {blogs.slice(0, visibleBlogs).map((blog) => (
              <BlogItem key={blog.id} blog={blog} />
            ))}
          </div>
        </div>

        {visibleBlogs < blogs.length && (
          <div className="flex justify-center">
            <Button className="w-[600px] rounded" onClick={handleLoadMore}>
              もっと見る
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogList
