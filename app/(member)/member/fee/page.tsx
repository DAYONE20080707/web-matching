import { getUsageFeesByCompanyId } from "@/actions/usageFee"
import { getAuthUser } from "@/lib/nextauth"
import { redirect } from "next/navigation"
import UsageFee from "@/components/member/UsageFee"

const FeePage = async () => {
  // 認証情報取得
  const user = await getAuthUser()

  if (!user) {
    redirect("/")
  }

  if (!user.companyId) {
    redirect("/")
  }

  const usageFees = await getUsageFeesByCompanyId({ companyId: user.companyId })

  return (
    <div className="bg-white md:border w-full rounded md:rounded-r-md p-2 md:p-10 h-full">
      <div className="text-xl font-bold border-b border-black pb-5 mb-5">
        請求情報
      </div>

      {usageFees.length === 0 ? (
        <div>請求情報はありません</div>
      ) : (
        <UsageFee
          usageFees={
            usageFees as Record<
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
        />
      )}
    </div>
  )
}

export default FeePage
