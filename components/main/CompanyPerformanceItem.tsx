"use client";

import { Performance } from "@prisma/client";
import Image from "next/image";

interface CompanyPerformanceItemProps {
  performance: Performance;
}

const CompanyPerformanceItem = ({
  performance,
}: CompanyPerformanceItemProps) => {
  return (
    <div className="space-y-5 text-sm">
      <div>
        <div className="aspect-[16/9] relative overflow-hidden">
          <Image
            fill
            src={performance.imageUrl || "/noThumbnail.png"}
            alt="thumbnail"
            className="object-cover"
          />
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <div className="font-bold text-base">{performance.title}</div>
          <div className="mt-2 pb-2 border-b border-[#EFEFEF]">
            <div className="line-clamp-2 text-sm">{performance.content}</div>
          </div>
        </div>
        <div className="text-xs text-[#5f5f5f] space-y-2">
          <div className="flex items-center space-x-1">
            <div className="w-[12px]">
              <Image
                src="/icons/industry.png"
                alt="業界"
                width={20}
                height={20}
              />
            </div>
            <div>{performance.industry}</div>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-[12px]">
              <Image
                src="/icons/genre.png"
                alt="ジャンル"
                width={20}
                height={20}
              />
            </div>
            <div>{performance.genre}</div>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-[12px]">
              <Image
                src="/icons/scope.png"
                alt="担当範囲"
                width={20}
                height={20}
              />
            </div>
            <div>{performance.scope}</div>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-[12px]">
              <Image src="/icons/pin.png" alt="URL" width={20} height={20} />
            </div>
            <div>
              {performance.url && (
                <a href={performance.url} target="_blank" rel="noreferrer">
                  {performance.url}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPerformanceItem;
