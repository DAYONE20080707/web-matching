"use client"

import CaseItem from "@/components/main/case/CaseItem"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { microcms } from "@/lib/microcms"
import { CaseType } from "@/types"
import ContentHeadline from "@/components/ui/text/ContentHeadline"

const CaseList = () => {
  const [cases, setCases] = useState<CaseType[]>([])
  const [visibleCases, setVisibleCases] = useState<number>(6)

  useEffect(() => {
    const fn = async () => {
      const result = await microcms.getList({
        endpoint: "cases",
        queries: {
          limit: 50,
          orders: "-publishedAt",
        },
        customRequestInit: {
          cache: "no-store",
        },
      })
      setCases(result.contents)
    }

    fn()
  }, [])

  const handleLoadMore = () => {
    setVisibleCases((prev) => prev + 4)
  }

  return (
    <div className="">
      <ContentHeadline
        // subTitle="導入事例"
        mainTitle="このような事業が補助金に採択されています。"
      />

      {/* <div className="bg-white rounded-lg p-3 md:pt-10 md:px-10 text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          {cases.slice(0, visibleCases).map((singleCase) => (
            <CaseItem key={singleCase.id} case={singleCase} />
          ))}
        </div>
      </div>

      {visibleCases < cases.length && (
        <div className="flex justify-center">
          <Button className="w-[600px] rounded" onClick={handleLoadMore}>
            もっと見る
          </Button>
        </div>
      )} */}
    </div>
  )
}

export default CaseList
