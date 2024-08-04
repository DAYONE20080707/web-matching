"use client"

import { Company, User } from "@prisma/client"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface ProfileProps {
  user: User
  company: Company
}

const Profile = ({ user, company }: ProfileProps) => {
  return (
    <div>
      <div className="text-2xl font-bold border-b border-black pb-5 mb-5">
        {company.companyName}
      </div>

      <Table>
        <TableBody>
          <TableRow>
            <TableCell>企業メールアドレス</TableCell>
            <TableCell>{company.companyEmail}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>企業サイト</TableCell>
            <TableCell>{company.companySiteUrl}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>代表者名</TableCell>
            <TableCell>{company.companyRepName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>本社所在地</TableCell>
            <TableCell>
              <div>{company.companyPostCode}</div>
              <div></div>
              {company.companyPrefecture}
              {company.companyCity}
              {company.companyAddress}
              <div></div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>電話番号</TableCell>
            <TableCell>{company.companyPhone}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>担当者名</TableCell>
            <TableCell>{user.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>担当者メールアドレス</TableCell>
            <TableCell>{user.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>担当者役職</TableCell>
            <TableCell>{user.position}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default Profile
