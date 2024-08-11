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
    <Link href={`/company/${company.id}`}>
      <div className="border p-5 rounded mb-5">
        <div className="grid grid-cols-4 gap-5">
          <Image
            src="/noImage.png"
            alt="logo"
            className="rounded"
            width={200}
            height={200}
            priority={true}
          />

          <div className="col-span-3">
            <div className="font-bold text-xl mb-2">{company.companyName}</div>
            <div>{truncateContent(company.companyPr, 100)}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CompanySearchItem
