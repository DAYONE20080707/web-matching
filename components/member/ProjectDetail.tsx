"use client"

import { Project } from "@prisma/client"
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
        itemName: `${project.companyName} - ${project.title}`,
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
      <table className="w-full border-collapse text-sm">
        <tbody>
          <tr>
            <th className="w-[80px] md:w-[200px] font-bold text-left p-2">
              掲載日
            </th>
            <td className="p-2">
              {format(new Date(project.createdAt), "yyyy.MM.dd HH:mm")}
            </td>
          </tr>
          <tr>
            <th className="w-[80px] md:w-[200px] font-bold text-left p-2">
              更新日
            </th>
            <td className="p-2">
              {format(new Date(project.updatedAt), "yyyy.MM.dd HH:mm")}
            </td>
          </tr>

          {project.status === "NEW" && (
            <tr>
              <th className="w-[80px] md:w-[200px] font-bold text-left p-2">
                掲載期日
              </th>
              <td className="p-2">
                {format(new Date(project.publishEndDate), "yyyy.MM.dd HH:mm")}
              </td>
            </tr>
          )}

          <tr>
            <th className="w-[80px] md:w-[200px] font-bold text-left p-2">
              法人名
            </th>
            <td className="p-2">{project.companyName}</td>
          </tr>

          {project.status !== "NEW" && (
            <>
              <tr>
                <th className="w-[80px] md:w-[200px] font-bold text-left p-2">
                  法人住所
                </th>
                <td className="p-2">
                  {project.companyPostCode}
                  <br />
                  {project.companyPrefecture}
                  {project.companyCity}
                  {project.companyAddress}
                </td>
              </tr>

              <tr>
                <th className="w-[80px] md:w-[200px] font-bold text-left p-2">
                  氏名
                </th>
                <td className="p-2">{project.name}</td>
              </tr>
              <tr>
                <th className="w-[80px] md:w-[200px] font-bold text-left p-2">
                  メール
                  <br className="block md:hidden" />
                  アドレス
                </th>
                <td className="p-2">{project.email}</td>
              </tr>

              <tr>
                <th className="w-[80px] md:w-[200px] font-bold text-left p-2">
                  電話番号
                </th>
                <td className="p-2">{project.companyPhone}</td>
              </tr>

              <tr>
                <th className="w-[80px] md:w-[200px] font-bold text-left p-2">
                  連絡方法
                </th>
                <td className="p-2">{project.contactMethod}</td>
              </tr>
            </>
          )}
        </tbody>
      </table>

      <div className="text-xl font-bold border-b border-black py-5 mb-5">
        依頼内容
      </div>

      <table className="w-full border-collapse mb-10  text-sm">
        <tbody>
          <tr>
            <th className="w-[80px] md:w-[200px] font-bold text-left p-2">
              予算
            </th>
            <td className="p-2">{project.budget.toLocaleString()}円</td>
          </tr>
          <tr>
            <th className="w-[80px] md:w-[200px] font-bold text-left p-2">
              紹介金額
            </th>
            <td className="p-2">{project.referralFee.toLocaleString()}円</td>
          </tr>
          <tr>
            <th className="w-[80px] md:w-[200px] font-bold text-left p-2">
              制作種類
              <br className="block md:hidden" />
              内容
            </th>
            <td className="p-2">
              {project.productTypes}
              <br />
              {project.otherProductType}
            </td>
          </tr>
          <tr>
            <th className="w-[80px] md:w-[200px] font-bold text-left p-2">
              欲しい
              <br className="block md:hidden" />
              機能
            </th>
            <td className="p-2">
              {project.desiredFunctionTypes}
              <br />
              {project.otherDesiredFunctionType}
            </td>
          </tr>
          <tr>
            <th className="w-[80px] md:w-[200px] font-bold text-left p-2">
              意見・
              <br className="block md:hidden" />
              要望
            </th>
            <td className="p-2">{project.requests}</td>
          </tr>
        </tbody>
      </table>

      <div className="flex items-center justify-center space-x-5">
        {project.status === "NEW" ? (
          <Button
            className="w-full md:w-[200px] bg-yellow-500 hover:bg-yellow-500/90"
            onClick={handleNegotiation}
          >
            紹介希望
          </Button>
        ) : project.status === "NEGOTIATION" ? (
          <>
            <Button
              className="w-full md:w-[200px] bg-green-500 hover:bg-green-500/90"
              onClick={handleReceived}
            >
              受注
            </Button>
            <Button
              className="w-full md:w-[200px] bg-gray-500 hover:bg-gray-500/90"
              onClick={handleLost}
            >
              失注
            </Button>
          </>
        ) : project.status === "RECEIVED" ? (
          <>
            <Button
              className="w-full md:w-[200px] bg-purple-500 hover:bg-purple-500/90"
              onClick={handleDelivered}
            >
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
