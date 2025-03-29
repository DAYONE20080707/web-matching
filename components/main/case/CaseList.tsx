"use client"

import CaseItem from "@/components/main/case/CaseItem"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { microcms } from "@/lib/microcms"
import { CaseType } from "@/types"

const CaseList = () => {
  const [cases, setCases] = useState<CaseType[]>([])
  const [visibleCases, setVisibleCases] = useState<number>(6)

  useEffect(() => {
    const fn = async () => {
      const result = await microcms.getList({
        endpoint: "blogs", // ✅ エンドポイントは blog のまま
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
    <div className="bg-secondary">
      <div className="px-3 max-w-screen-xl mx-auto py-20">
        <div className="text-primary text-xl mb-3">お役立ち実績</div>
        <div className="font-bold text-2xl mb-10">
          どんな実績があるかチェック
          <br />
          さまざまな補助金活用事例をご紹介
        </div>

        <div className="bg-white rounded-lg p-3 md:p-10 mb-10">
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
        )}
      </div>
    </div>
  )
}

export default CaseList
