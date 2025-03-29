"use client"

import Image from "next/image"
import Link from "next/link"
import { CaseType } from "@/types"
import { format } from "date-fns"

interface CaseItemProps {
  case: CaseType
}

const CaseItem = ({ case: singleCase }: CaseItemProps) => {
  return (
    <Link href={`/case/${singleCase.id}`} className="flex">
      <div className="grid grid-cols-3 gap-3 flex-1">
        <div className="col-span-1">
          <div className="relative aspect-[16/9] mb-5">
            <Image
              src={singleCase.thumbnail?.url || "/noThumbnail.png"}
              alt="thumbnail"
              fill
              priority={false}
              className="rounded object-cover"
            />
          </div>
        </div>

        <div className="space-y-2 col-span-2">
          <div className="text-xs md:text-sm">
            {format(singleCase.publishedAt, "yyyy/MM/dd")}
          </div>
          <div className="font-bold hover:underline">{singleCase.title}</div>
          <div className="border border-primary rounded-full text-primary text-xs px-1 md:px-2 py-0.5 w-32 text-center">
            {singleCase.category}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CaseItem
