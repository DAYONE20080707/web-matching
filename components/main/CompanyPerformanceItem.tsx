"use client"

import { Performance } from "@prisma/client"
import Image from "next/image"

interface CompanyPerformanceItemProps {
  performance: Performance
}

const CompanyPerformanceItem = ({
  performance,
}: CompanyPerformanceItemProps) => {
  return (
    <div className="grid grid-cols-2 gap-5 mb-10 text-sm">
      <div className="col-span-1">
        <div className="aspect-[16/9] relative overflow-hidden">
          <Image
            fill
            src={performance.imageUrl || "/noThumbnail.png"}
            alt="thumbnail"
            className="object-cover rounded"
          />
        </div>
      </div>
      <div className="col-span-1 space-y-2">
        <div className="font-bold text-xl">{performance.title}</div>
        {performance.url && (
          <div className="underline">
            <a href={performance.url} target="_blank" rel="noreferrer">
              {performance.url}
            </a>
          </div>
        )}

        <div>{performance.content}</div>

        <div className="flex items-center space-x-2">
          <div className="font-bold w-[100px]">業界</div>
          <div>{performance.industry}</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="font-bold w-[100px]">ジャンル</div>
          <div>{performance.genre}</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="font-bold w-[100px]">担当範囲</div>
          <div>{performance.scope}</div>
        </div>
      </div>
    </div>
  )
}

export default CompanyPerformanceItem
