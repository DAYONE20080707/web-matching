"use client"

import { Project } from "@prisma/client"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { format, addDays } from "date-fns"

interface ProjectDetailProps {
  project: Project
}

const ProjectDetail = ({ project }: ProjectDetailProps) => {
  return (
    <div>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="w-[200px] font-bold">掲載</TableCell>
            <TableCell>
              {format(new Date(project.createdAt), "yyyy.MM.dd HH:mm")}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-[200px] font-bold">更新</TableCell>
            <TableCell>
              {format(new Date(project.updatedAt), "yyyy.MM.dd HH:mm")}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="pb-5 w-[200px] font-bold">回答期限</TableCell>
            <TableCell className="pb-5">
              {format(
                addDays(new Date(project.createdAt), 7),
                "yyyy.MM.dd HH:mm"
              )}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="w-[200px] font-bold">氏名</TableCell>
            <TableCell>{project.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-[200px] font-bold">
              メールアドレス
            </TableCell>
            <TableCell>{project.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-[200px] font-bold">法人名</TableCell>
            <TableCell>{project.companyName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-[200px] font-bold">法人住所</TableCell>
            <TableCell>
              {project.companyPostCode}
              <br />
              {project.companyPrefecture}
              {project.companyCity}
              {project.companyAddress}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-[200px] font-bold">電話番号</TableCell>
            <TableCell>{project.companyPhone}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="text-xl font-bold border-b border-black py-5 mb-5">
        依頼内容
      </div>

      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="w-[200px] font-bold">予算</TableCell>
            <TableCell>{project.budget.toLocaleString()}円</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-[200px] font-bold">紹介金額</TableCell>
            <TableCell>30,000円</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-[200px] font-bold">ページ数</TableCell>
            <TableCell>{project.planPageNumber}ページ</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-[200px] font-bold">制作種類内容</TableCell>
            <TableCell>
              {project.productTypes}
              <br />
              {project.otherProductType}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-[200px] font-bold">欲しい機能</TableCell>
            <TableCell>
              {project.desiredFunctionTypes}
              <br />
              {project.otherDesiredFunctionType}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-[200px] font-bold">意見・要望</TableCell>
            <TableCell>{project.requests}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default ProjectDetail
