"use client"

import { Project } from "@prisma/client"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import {
  negotiateProject,
  lostProject,
  receivedProject,
  lostDelivered,
} from "@/actions/project"

interface ProjectDetailProps {
  project: Project & { status: string }
  companyId: string
}

const ProjectDetail = ({ project, companyId }: ProjectDetailProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleNegotiation = async () => {
    setIsLoading(true)

    try {
      // 紹介希望
      await negotiateProject({
        companyId,
        projectId: project.id,
        itemName: project.companyName + "様の案件",
      })

      toast.success("紹介希望しました、お客様にご連絡をお願いします")
      router.refresh()
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("紹介希望に失敗しました")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleReceived = async () => {
    setIsLoading(true)

    try {
      await receivedProject({
        companyId,
        projectId: project.id,
      })
      toast.success("案件を受注しました")
      router.push("/member/project")
      router.refresh()
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("案件の受注に失敗しました")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleLost = async () => {
    setIsLoading(true)

    try {
      await lostProject({
        companyId,
        projectId: project.id,
      })
      toast.success("案件を失注しました")
      router.push("/member/project")
      router.refresh()
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("案件の失注に失敗しました")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelivered = async () => {
    setIsLoading(true)

    try {
      await lostDelivered({
        companyId,
        projectId: project.id,
      })
      toast.success("案件を納品しました")
      router.push("/member/project")
      router.refresh()
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("案件の納品に失敗しました")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="w-[200px] font-bold">掲載日</TableCell>
            <TableCell>
              {format(new Date(project.createdAt), "yyyy.MM.dd HH:mm")}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-[200px] font-bold">更新日</TableCell>
            <TableCell>
              {format(new Date(project.updatedAt), "yyyy.MM.dd HH:mm")}
            </TableCell>
          </TableRow>

          {project.status === "NEW" && (
            <TableRow>
              <TableCell className="w-[200px] font-bold">掲載期日</TableCell>
              <TableCell>
                {format(new Date(project.publishEndDate), "yyyy.MM.dd HH:mm")}
              </TableCell>
            </TableRow>
          )}

          <TableRow>
            <TableCell className="w-[200px] font-bold">法人名</TableCell>
            <TableCell>{project.companyName}</TableCell>
          </TableRow>

          {project.status !== "NEW" && (
            <>
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
                <TableCell className="w-[200px] font-bold">電話番号</TableCell>
                <TableCell>{project.companyPhone}</TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>

      <div className="text-xl font-bold border-b border-black py-5 mb-5">
        依頼内容
      </div>

      <Table className="mb-10">
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

      <div className="flex items-center justify-center space-x-5">
        {project.status === "NEW" ? (
          <Button className="w-[200px]" onClick={handleNegotiation}>
            紹介希望
          </Button>
        ) : project.status === "NEGOTIATION" ? (
          <>
            <Button className="w-[200px]" onClick={handleReceived}>
              受注
            </Button>
            <Button className="w-[200px]" onClick={handleLost}>
              失注
            </Button>
          </>
        ) : project.status === "RECEIVED" ? (
          <>
            <Button className="w-[200px]" onClick={handleDelivered}>
              納品
            </Button>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default ProjectDetail
