"use client"

import { Company, User } from "@prisma/client"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import Image from "next/image"

interface ProfileProps {
  user: User
  company: Company
}

const Profile = ({ user, company }: ProfileProps) => {
  return (
    <div>
      <div className="text-xl font-bold border-b border-black pb-5 mb-5">
        {company.companyName}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="col-span-1 flex justify-center items-center">
          <Image
            src="/noImage.png"
            alt="logo"
            className="rounded"
            width={200}
            height={200}
            priority={true}
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-bold">企業メールアドレス</TableCell>
                <TableCell>{company.companyEmail}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">企業サイト</TableCell>
                <TableCell>{company.companySiteUrl}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">代表者名</TableCell>
                <TableCell>{company.companyRepName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">本社所在地</TableCell>
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
                <TableCell className="font-bold">電話番号</TableCell>
                <TableCell>{company.companyPhone}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">担当者名</TableCell>
                <TableCell>{user.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">
                  担当者メールアドレス
                </TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">担当者役職</TableCell>
                <TableCell>{user.position}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default Profile
