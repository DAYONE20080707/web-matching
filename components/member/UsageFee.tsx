"use client"

import { useState, useEffect } from "react"

interface UsageFeeProps {
  usageFees: Record<
    string,
    {
      items: Array<{
        itemName: string
        unitPrice: number
        quantity: number
        totalPrice: number
      }>
      totalAmount: number
    }
  >
}

const UsageFee = ({ usageFees }: UsageFeeProps) => {
  const [year, setYear] = useState<string>("")
  const [month, setMonth] = useState<string>("")
  const [currentUsageFee, setCurrentUsageFee] = useState<any>(null)

  // 年と月が選択されたら、対応する利用料金を設定
  useEffect(() => {
    if (year && month) {
      const key = `${year}-${month}`
      setCurrentUsageFee(usageFees[key] || null)
    }
  }, [year, month, usageFees])

  // 初期表示で今月の利用料金を設定
  useEffect(() => {
    if (!year && !month) {
      const now = new Date()
      const initialYear = now.getFullYear().toString()
      const initialMonth = String(now.getMonth() + 1).padStart(2, "0")
      setYear(initialYear)
      setMonth(initialMonth)
      setCurrentUsageFee(usageFees[`${initialYear}-${initialMonth}`] || null)
    }
  }, [year, month, usageFees])

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center  mb-10 md:space-x-5 space-y-2 md:space-y-0">
        <div className="font-bold">ご利用年月</div>
        <div>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border py-1 text-center"
          >
            <option value="">選択してください</option>
            {[...Array(5)].map((_, index) => (
              <option key={index} value={2024 - index}>
                {2024 - index}
              </option>
            ))}
          </select>
          <label className="mx-3">年</label>
        </div>
        <div>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border py-1 text-center"
          >
            <option value="">選択してください</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={String(m).padStart(2, "0")}>
                {m}月
              </option>
            ))}
          </select>
          <label className="ml-3">月</label>
        </div>
      </div>

      <div className="text-xl font-bold border-b border-black pb-5 mb-5">
        {year}年{month}月 ご利用金額
      </div>

      <div>
        {currentUsageFee ? (
          <>
            {currentUsageFee.items.length > 0 ? (
              <div>
                <table className="min-w-full border-collapse border">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border p-2 text-sm">品名</th>
                      <th className="border p-2 text-sm w-[100px]">紹介金額</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsageFee.items.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className="border p-2 text-center">
                          {item.itemName}
                        </td>

                        <td className="border p-2 text-center">
                          {item.totalPrice.toLocaleString()}円
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-5 font-bold text-right">
                  合計金額: {currentUsageFee.totalAmount.toLocaleString()}円
                </div>
              </div>
            ) : (
              <div>請求情報はありません</div>
            )}
          </>
        ) : (
          <div>請求情報はありません</div>
        )}
      </div>
    </div>
  )
}

export default UsageFee
