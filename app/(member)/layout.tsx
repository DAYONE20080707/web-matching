import { redirect } from "next/navigation"
import { getAuthUser } from "@/lib/nextauth"
import { getCompanyById } from "@/actions/company"
import { getUnreadMessagesCount } from "@/actions/message"
import NavigationMember from "@/components/member/NavigationMember"

interface MemberLayoutProps {
  children: React.ReactNode
}

const MemberLayout = async ({ children }: MemberLayoutProps) => {
  // 認証情報取得
  const user = await getAuthUser()

  if (!user) {
    redirect("/login")
  }

  if (user.isAdmin) {
    redirect("/")
  }

  if (!user.companyId) {
    redirect("/")
  }

  const company = await getCompanyById({ companyId: user.companyId })

  if (!company) {
    redirect("/")
  }

  const unreadMessagesCount = await getUnreadMessagesCount({
    companyId: user.companyId,
    userIsAdmin: user.isAdmin,
  })

  return (
    <div className="md:bg-gray-50 min-h-screen py-2 md:py-10 relative">
      <div className="mx-auto md:px-5 max-w-screen-xl flex md:space-x-3">
        <NavigationMember
          userName={user.name}
          companyName={company.companyName}
          unreadMessagesCount={unreadMessagesCount}
        />
        <main className="flex-1 min-h-[800px]">{children}</main>
      </div>
    </div>
  )
}

export default MemberLayout
