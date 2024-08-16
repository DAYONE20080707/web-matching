"use client"

import { Company, User } from "@prisma/client"
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
        <div className="col-span-1 flex justify-center items-start">
          <Image
            src={company.companyLogoUrl || "/noImage.png"}
            alt="logo"
            className="rounded"
            width={200}
            height={200}
            priority={true}
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <table className="w-full border-collapse text-sm">
            <tbody>
              <tr className="border-b">
                <th className="font-bold w-[200px] text-left p-2">
                  企業メールアドレス
                </th>
                <td className="p-2">{company.companyEmail}</td>
              </tr>
              <tr className="border-b">
                <th className="font-bold w-[200px] text-left p-2">
                  企業サイト
                </th>
                <td className="p-2">{company.companySiteUrl}</td>
              </tr>
              <tr className="border-b">
                <th className="font-bold w-[200px] text-left p-2">代表者名</th>
                <td className="p-2">{company.companyRepName}</td>
              </tr>
              <tr className="border-b">
                <th className="font-bold w-[200px] text-left p-2">
                  本社所在地
                </th>
                <td className="p-2">
                  <div>{company.companyPostCode}</div>
                  <div>
                    {company.companyPrefecture}
                    {company.companyCity}
                    {company.companyAddress}
                  </div>
                </td>
              </tr>
              <tr className="border-b">
                <th className="font-bold w-[200px] text-left p-2">電話番号</th>
                <td className="p-2">{company.companyPhone}</td>
              </tr>
              <tr className="border-b">
                <th className="font-bold w-[200px] text-left p-2">担当者名</th>
                <td className="p-2">{user.name}</td>
              </tr>
              <tr className="border-b">
                <th className="font-bold w-[200px] text-left p-2">
                  担当者メールアドレス
                </th>
                <td className="p-2">{user.email}</td>
              </tr>
              <tr className="border-b">
                <th className="font-bold w-[200px] text-left p-2">
                  担当者役職
                </th>
                <td className="p-2">{user.position}</td>
              </tr>
              <tr className="border-b">
                <th className="font-bold w-[200px] text-left p-2">
                  対応エリア
                </th>
                <td className="p-2">{company.companyArea}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Profile
