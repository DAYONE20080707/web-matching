"use client"

import { Company, User } from "@prisma/client"
import { TableCell, TableRow } from "@/components/ui/table"
import { format } from "date-fns"
import Link from "next/link"

interface CompanyAdminItemProps {
  company: Company & {
    users: User[]
  }
}

const CompanyAdminItem = ({ company }: CompanyAdminItemProps) => {
  const userNames = company.users.map((user) => user.name).join(", ")
  const userEmails = company.users.map((user) => user.email).join(", ")

  return (
    <TableRow>
      <TableCell>{format(new Date(company.createdAt), "yyyy/MM/dd")}</TableCell>
      <TableCell className="underline">
        <Link href={`/admin/company/${company.id}`}>{company.companyName}</Link>
      </TableCell>
      <TableCell>{userNames}</TableCell>
      <TableCell>{userEmails}</TableCell>
      <TableCell>{company.companyPrefecture}</TableCell>
      <TableCell>テスト</TableCell>
    </TableRow>
  )
}

export default CompanyAdminItem
