"use client"

import type { Company, User, Performance, CompanyImage } from "@prisma/client"
import { format } from "date-fns"
import Image from "next/image"
import CompanyPerformanceItem from "@/components/main/CompanyPerformanceItem"
import ImageSlider from "./ImageSlider"
import CompanyInfoSidebar from "@/components/main/company/CompanyInfoSidebar"
import CompanyFrame from "@/components/ui/frame/CompanyFrame"
import { useState } from "react"
import Breadcrumb from "@/components/ui/Breadcrumb"

interface CompanyDetailProps {
  company: Company & {
    users: User[]
    performances: Performance[]
    images: CompanyImage[]
  }
}

const CompanyDetail = ({ company }: CompanyDetailProps) => {
  const [displayCount, setDisplayCount] = useState(6)
  const address = `${company.companyPrefecture}${company.companyCity}${company.companyAddress}`
  const imageUrls = company.images.map((image) => image.url)

  const handleLoadMore = () => {
    const increment = window.innerWidth >= 768 ? 3 : 2
    setDisplayCount((prev) => prev + increment)
  }

  const displayedPerformances = company.performances.slice(0, displayCount)
  const hasMorePerformances = company.performances.length > displayCount

  return (
    <div className="bg-secondary">
      <div className="relative h-[400px] flex items-center justify-center">
        {imageUrls.length > 0 && (
          <div className="absolute inset-0">
            <Image
              src={imageUrls[0]}
              alt={company.companyName}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="absolute top-28 px-3 max-w-[1200px] mx-auto w-full">
          <Breadcrumb
            items={[
              { title: "制作会社一覧", link: "/company" },
              { title: company.companyName },
            ]}
          />
        </div>
      </div>

      <div className="px-3 max-w-[1200px] mx-auto -mt-10 pb-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <CompanyInfoSidebar company={company} address={address} />
          <div className="md:col-span-9 space-y-10">
            {/* 実績 */}
            <CompanyFrame title="実績一覧">
              <div>
                {company.performances.length === 0 ? (
                  <div className="text-center">実績はありません</div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-10">
                      {displayedPerformances.map((performance) => (
                        <CompanyPerformanceItem
                          key={performance.id}
                          performance={performance}
                        />
                      ))}
                    </div>
                    {hasMorePerformances && (
                      <div className="text-center mt-10">
                        <button
                          onClick={handleLoadMore}
                          className="block w-full h-auto bg-primary text-sm rounded text-center text-white py-4 px-2 mt-12 hover:opacity-70 max-w-[400px] mx-auto"
                        >
                          もっと見る
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </CompanyFrame>
            <CompanyFrame title="自社の強み">
              <div className="mt-10 text-lg font-bold">{company.companyPr}</div>
              <div className="space-y-10 mt-10">
                <div className="flex items-center gap-10 pb-6 border-b border-[#EFEFEF]">
                  <div className="font-bold text-center text-5xl text-primary flex items-center justify-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-primary mr-2"></div>
                    <div>1</div>
                  </div>
                  <div className="col-span-3 text-lg font-bold">
                    {company.companyPoint1}
                  </div>
                </div>
                <div className="flex items-center gap-10 pb-6 border-b border-[#EFEFEF]">
                  <div className="font-bold text-center text-5xl text-primary flex items-center justify-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-primary mr-2"></div>
                    <div>2</div>
                  </div>
                  <div className="col-span-3 text-lg font-bold">
                    {company.companyPoint2}
                  </div>
                </div>
                <div className="flex items-center gap-10 pb-6 border-b border-[#EFEFEF]">
                  <div className="font-bold text-center text-5xl text-primary flex items-center justify-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-primary mr-2"></div>
                    <div>3</div>
                  </div>
                  <div className="col-span-3 text-lg font-bold">
                    {company.companyPoint3}
                  </div>
                </div>
              </div>
            </CompanyFrame>

            {/* 担当者メッセージ */}
            <CompanyFrame title="担当者メッセージ">
              <div className="space-y-3">
                <div className="flex flex-col md:flex-row md:items-center md:space-x-2 text-[#393939] text-lg font-bold">
                  <div>{company.users[0].name}</div>
                  <div>{company.users[0].position}</div>
                </div>
                <div className="text-base font-light">
                  {company.users[0].message}
                </div>
              </div>
            </CompanyFrame>

            {/* 会社案内 */}
            {imageUrls.length > 0 && (
              <>
                <CompanyFrame title="会社案内">
                  <ImageSlider imageUrls={imageUrls} />
                </CompanyFrame>
              </>
            )}

            {/* 会社概要 */}
            <CompanyFrame title="会社概要">
              <div className="space-y-4">
                <div className="grid grid-cols-[120px,1fr] border-b border-[#EFEFEF] py-4">
                  <div className="text-[#5f5f5f] text-sm text-bold">会社名</div>
                  <div className="text-[#393939]">{company.companyName}</div>
                </div>
                <div className="grid grid-cols-[120px,1fr] border-b border-[#EFEFEF] py-4">
                  <div className="text-[#5f5f5f] text-sm text-bold">代表</div>
                  <div className="text-[#393939]">{company.companyRepName}</div>
                </div>
                <div className="grid grid-cols-[120px,1fr] border-b border-[#EFEFEF] py-4">
                  <div className="text-[#5f5f5f] text-sm text-bold">
                    本社所在地
                  </div>
                  <div className="text-[#393939]">{address}</div>
                </div>
                <div className="grid grid-cols-[120px,1fr] border-b border-[#EFEFEF] py-4">
                  <div className="text-[#5f5f5f] text-sm text-bold">TEL</div>
                  <div className="text-[#393939]">{company.companyPhone}</div>
                </div>
                <div className="grid grid-cols-[120px,1fr] border-b border-[#EFEFEF] py-4">
                  <div className="text-[#5f5f5f] text-sm text-bold">MAIL</div>
                  <div className="text-[#393939]">{company.companyEmail}</div>
                </div>
                <div className="grid grid-cols-[120px,1fr] border-b border-[#EFEFEF] py-4">
                  <div className="text-[#5f5f5f] text-sm text-bold">設立</div>
                  <div className="text-[#393939]">
                    {company.companyfoundDate &&
                      format(new Date(company.companyfoundDate), "yyyy/MM/dd")}
                  </div>
                </div>
                <div className="grid grid-cols-[120px,1fr] border-b border-[#EFEFEF] py-4">
                  <div className="text-[#5f5f5f] text-sm text-bold">
                    事業内容
                  </div>
                  <div className="text-[#393939]">
                    {company.companyBusiness}
                  </div>
                </div>

                {company.latitude && company.longitude && (
                  <iframe
                    src={`https://maps.google.com/maps?output=embed&q=${company.latitude},${company.longitude}&ll=${company.latitude},${company.longitude}&t=m&hl=ja&z=18`}
                    width="100%"
                    height="300"
                    className="border-0 mt-6"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                )}
              </div>
            </CompanyFrame>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyDetail
