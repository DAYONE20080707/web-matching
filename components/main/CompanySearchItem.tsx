"use client"

import { Company } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

interface CompanySearchItemProps {
  company: Company
}

const CompanySearchItem = ({ company }: CompanySearchItemProps) => {
  const truncateContent = (content: string | null, maxLength: number) => {
    if (!content) {
      return ""
    }

    if (content.length <= maxLength) {
      return content
    }
    return content.slice(0, maxLength) + "..."
  }

  return (
    <div>
      <Link href={`/company/${company.id}`}>
        <section className="border p-5 rounded mb-5 hover:bg-gray-50 mt-20">
          <div className="flex justify-start  gap-x-8">
            <Image
              src={company.companyLogoUrl || "/noImage.png"}
              alt="logo"
              className="rounded"
              width={150}
              height={150}
              priority={true}
            />

            <div className="col-span-3">
              <h2 className="text-base font-bold mt-4 mb-2">
               企業名： {company.companyName}
              </h2>
              <div>{truncateContent(company.companyPr, 100)}</div>
            </div>
          </div>
        </section>
      </Link>
    </div>
  )
}

export default CompanySearchItem
