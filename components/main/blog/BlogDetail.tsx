"use client"

import { BlogType } from "@/types"
import { format } from "date-fns"
import Image from "next/image"

interface BlogDetailProps {
  blog: BlogType
}

const BlogDetail = ({ blog }: BlogDetailProps) => {
  return (
    <div className="px-3 max-w-screen-lg mx-auto py-5 md:py-10">
      <div className="bg-white border-2 border-black rounded-lg p-3 md:p-10">
        <div className="relative aspect-[16/9] mb-5">
          <Image
            src={blog.thumbnail?.url ?? "/noThumbnail.png"}
            alt="thumbnail"
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover rounded"
            priority
          />
        </div>

        <div className="space-y-2 col-span-2">
          <div className="font-bold text-2xl">{blog.title}</div>

          <div className="text-sm">
            {format(blog.publishedAt, "yyyy/MM/dd")}
          </div>
          <div className="border border-primary rounded-full text-primary text-xs px-2 py-0.5 w-32 text-center">
            {blog.category}
          </div>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      </div>
    </div>
  )
}

export default BlogDetail
