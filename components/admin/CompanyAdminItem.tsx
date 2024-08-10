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
      <TableCell className="text-center">
        {format(new Date(company.createdAt), "yyyy/MM/dd")}
      </TableCell>
      <TableCell className="underline text-center">
        <Link href={`/admin/company/${company.id}`}>{company.companyName}</Link>
      </TableCell>
      <TableCell className="text-center">{userNames}</TableCell>
      <TableCell className="text-center">{userEmails}</TableCell>
      <TableCell className="text-center">{company.companyPrefecture}</TableCell>
      <TableCell className="text-center">テスト</TableCell>
    </TableRow>
  )
}

export default CompanyAdminItem
