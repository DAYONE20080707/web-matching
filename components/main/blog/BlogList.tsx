"use client"

import BlogItem from "@/components/main/blog/BlogItem"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { microcms } from "@/lib/microcms"
import { BlogType } from "@/types"
import ContentHeadline from "@/components/ui/text/ContentHeadline"

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
    <div className="">
      <ContentHeadline
        subTitle="お役立ち情報"
        mainTitle=" 役立つ資料でよりスマートな補助金申請"
      />
      {/* <div className="bg-white rounded-lg p-3 md:p-10 mt-10 mb-0">
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
      )} */}
    </div>
  )
}

export default BlogList
