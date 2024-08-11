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
  return (
    <TableRow>
      <TableCell className="">
        {format(new Date(company.createdAt), "yyyy/MM/dd")}
      </TableCell>
      <TableCell className="underline">
        <Link href={`/admin/company/${company.id}`}>{company.companyName}</Link>
      </TableCell>
      <TableCell className="">{company.users[0].name}</TableCell>
      <TableCell className="">{company.users[0].email}</TableCell>
      <TableCell className="">
        {company.companyPrefecture}
        {company.companyCity}
        {company.companyAddress}
      </TableCell>
    </TableRow>
  )
}

export default CompanyAdminItem
