"use client"

import Image from "next/image"
import Link from "next/link"
import { BlogType } from "@/types"
import { format } from "date-fns"

interface BlogItemProps {
  blog: BlogType
}

const BlogItem = ({ blog }: BlogItemProps) => {
  return (
    <Link href={`/blog/${blog.id}`} className="flex">
      <div className="grid grid-cols-3 gap-3 flex-1">
        <div className="col-span-1">
          <div className="aspect-w-16 aspect-h-9 relative">
            <Image
              src={blog.thumbnail?.url || "/noThumbnail.png"}
              alt="thumbnail"
              fill
              priority={false}
              className="rounded object-cover"
            />
          </div>
        </div>

        <div className="space-y-2 col-span-2">
          <div className="text-xs md:text-sm">
            {format(blog.publishedAt, "yyyy/MM/dd")}
          </div>
          <div className="font-bold hover:underline">{blog.title}</div>
          <div className="border border-primary rounded-full text-primary text-xs px-1 md:px-2 py-0.5 w-32 text-center">
            {blog.category}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BlogItem
