"use client"

import { Company, User, Performance, CompanyImage } from "@prisma/client"
import { format } from "date-fns"
import Image from "next/image"
import CompanyPerformanceItem from "@/components/main/CompanyPerformanceItem"
import ImageSlider from "./ImageSlider"

interface CompanyDetailProps {
  company: Company & {
    users: User[]
    performances: Performance[]
    images: CompanyImage[]
  }
}

const CompanyDetail = ({ company }: CompanyDetailProps) => {
  const address = `${company.companyPrefecture}${company.companyCity}${company.companyAddress}`
  const imageUrls = company.images.map((image) => image.url)

  return (
    <div className="space-y-10">
      <div className="text-center font-bold text-2xl">
        {company.companyName}
      </div>

      <div className="text-center font-bold text-2xl">会社情報</div>

      <div className="grid grid-cols-2">
        <div className="flex justify-center">
          <Image
            src={company.companyLogoUrl || "/noImage.png"}
            alt="logo"
            className="rounded"
            width={200}
            height={200}
            priority={true}
          />
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-10">
            <div className="border rounded-full border-black py-0.5 w-[140px] text-center font-bold text-sm">
              企業名
            </div>
            <div>{company.companyName}</div>
          </div>
          <div className="flex items-center space-x-10">
            <div className="border rounded-full border-black py-0.5 w-[140px] text-center font-bold text-sm">
              ホームページURL
            </div>
            <div>{company.companySiteUrl}</div>
          </div>
          <div className="flex items-center space-x-10">
            <div className="border rounded-full border-black py-0.5 w-[140px] text-center font-bold text-sm">
              代表
            </div>
            <div>{company.companyRepName}</div>
          </div>
          <div className="flex items-center space-x-10">
            <div className="border rounded-full border-black py-0.5 w-[140px] text-center font-bold text-sm">
              郵便番号
            </div>
            <div>{company.companyPostCode}</div>
          </div>
          <div className="flex items-center space-x-10">
            <div className="border rounded-full border-black py-0.5 w-[140px] text-center font-bold text-sm">
              本社所在地
            </div>
            <div>{address}</div>
          </div>
        </div>
      </div>

      {company.latitude && company.longitude && (
        <iframe
          src={`https://maps.google.com/maps?output=embed&q=${company.latitude},${company.longitude}&ll=${company.latitude},${company.longitude}&t=m&hl=ja&z=18`}
          width="100%"
          height="450"
          className="border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      )}

      <div className="space-y-3">
        <div className="flex items-center space-x-10">
          <div className="border rounded-full border-black py-0.5 w-[140px] text-center font-bold text-sm">
            設立
          </div>
          <div>
            {company.companyfoundDate &&
              format(new Date(company.companyfoundDate), "yyyy/MM/dd")}
          </div>
        </div>
        <div className="flex items-center space-x-10">
          <div className="border rounded-full border-black py-0.5 w-[140px] text-center font-bold text-sm">
            電話番号
          </div>
          <div>{company.companyPhone}</div>
        </div>
        <div className="flex items-center space-x-10">
          <div className="border rounded-full border-black py-0.5 w-[140px] text-center font-bold text-sm">
            メールアドレス
          </div>
          <div>{company.companyEmail}</div>
        </div>
        <div className="flex items-center space-x-10">
          <div className="border rounded-full border-black py-0.5 w-[140px] text-center font-bold text-sm">
            資本金
          </div>
          <div>{company.companyCapital}円</div>
        </div>
        <div className="flex items-center space-x-10">
          <div className="border rounded-full border-black py-0.5 w-[140px] text-center font-bold text-sm">
            社員数
          </div>
          <div>{company.companyEmployee}人</div>
        </div>
        <div className="flex items-center space-x-10">
          <div className="border rounded-full border-black py-0.5 w-[140px] text-center font-bold text-sm">
            事業内容
          </div>
          <div>{company.companyBusiness}</div>
        </div>
        <div className="flex items-center space-x-10">
          <div className="border rounded-full border-black py-0.5 w-[140px] text-center font-bold text-sm">
            自社の特徴
          </div>
          <div>{company.companyFeature}</div>
        </div>
      </div>

      <div className="text-center font-bold text-2xl">会社のポイント</div>

      <div className="space-y-5">
        <div className="grid grid-cols-4">
          <div className="font-bold text-center">
            自社のポイント
            <br />
            01
          </div>
          <div className="col-span-3">{company.companyPoint1}</div>
        </div>
        <div className="grid grid-cols-4">
          <div className="font-bold text-center">
            自社のポイント
            <br />
            02
          </div>
          <div className="col-span-3">{company.companyPoint2}</div>
        </div>
        <div className="grid grid-cols-4">
          <div className="font-bold text-center">
            自社のポイント
            <br />
            03
          </div>
          <div className="col-span-3">{company.companyPoint3}</div>
        </div>
      </div>

      <div className="text-center font-bold text-2xl">自己PR</div>

      <div className="whitespace-pre-wrap break-all">{company.companyPr}</div>

      {imageUrls.length > 0 && (
        <>
          <div className="text-center font-bold text-2xl">会社案内</div>

          <ImageSlider imageUrls={imageUrls} />
        </>
      )}

      <div className="text-center font-bold text-2xl">担当者メッセージ</div>

      <div className="space-y-3">
        <div className="flex items-center space-x-10">
          <div className="border rounded-full border-black py-0.5 w-[140px] text-center font-bold text-sm">
            担当者名
          </div>
          <div>{company.users[0].name}</div>
        </div>
        <div className="flex items-center space-x-10">
          <div className="border rounded-full border-black py-0.5 w-[140px] text-center font-bold text-sm">
            役職
          </div>
          <div>{company.users[0].position}</div>
        </div>
        <div className="flex items-center space-x-10">
          <div className="border rounded-full border-black py-0.5 w-[140px] text-center font-bold text-sm">
            メールアドレス
          </div>
          <div>{company.users[0].email}</div>
        </div>
        <div>{company.users[0].message}</div>
      </div>

      <div className="text-center font-bold text-2xl">
        {company.companyName}の実績
      </div>

      <div>
        {company.performances.length === 0 ? (
          <div className="text-center">実績はありません</div>
        ) : (
          company.performances.map((performance) => (
            <CompanyPerformanceItem
              key={performance.id}
              performance={performance}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default CompanyDetail
