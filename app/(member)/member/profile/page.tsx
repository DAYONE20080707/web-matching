import { redirect } from "next/navigation"
import { getAuthUser } from "@/lib/nextauth"
import { getCompanyById } from "@/actions/company"
import Profile from "@/components/member/Profile"

const ProfilePage = async () => {
  const user = await getAuthUser()

  if (!user) {
    redirect("/")
  }

  const company = await getCompanyById({ companyId: user.companyId })

  return (
    <div className="bg-white md:border w-full rounded md:rounded-r-md p-2 md:p-10 h-full">
      {company ? (
        <Profile user={user} company={company} />
      ) : (
        <div>企業情報が登録されていません。</div>
      )}
    </div>
  )
}

export default ProfilePage
