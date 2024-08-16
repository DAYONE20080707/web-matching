"use client"

import { Company, User } from "@prisma/client"
import { format } from "date-fns"
import { useRouter } from "next/navigation"

interface CompanyAdminItemProps {
  company: Company & {
    users: User[]
  }
}

const CompanyAdminItem = ({ company }: CompanyAdminItemProps) => {
  const router = useRouter()

  const handleRowClick = () => {
    router.push(`/admin/company/${company.id}`)
  }

  return (
    <tr
      className="hover:bg-gray-50 text-center text-sm cursor-pointer"
      onClick={handleRowClick}
    >
      <td className="border p-2">
        {format(new Date(company.createdAt), "yyyy/MM/dd")}
      </td>
      <td className="border p-2">{company.companyName}</td>
      <td className="border p-2">{company.users[0].name}</td>
      <td className="border p-2">{company.users[0].email}</td>
      <td className="border p-2">
        {company.companyPrefecture}
        {company.companyCity}
        {company.companyAddress}
      </td>
    </tr>
  )
}

export default CompanyAdminItem
