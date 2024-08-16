import { redirect } from "next/navigation"
import { getAuthUser } from "@/lib/nextauth"
import Link from "next/link"
import Logout from "@/components/auth/Logout"
import AdminSidebar from "@/components/admin/AdminSidebar"

interface AdminLayoutProps {
  children: React.ReactNode
}

const AdminLayout = async ({ children }: AdminLayoutProps) => {
  // 認証情報取得
  const user = await getAuthUser()

  if (!user) {
    redirect("/login")
  }

  if (!user.isAdmin) {
    redirect("/")
  }

  return (
    <div className="bg-gray-50 min-h-screen py-5 md:py-10">
      <div className="mx-auto px-2 md:px-5 max-w-screen-xl flex md:space-x-3">
        <nav className="bg-white w-[250px] rounded-l-lg h-[800px] hidden md:flex flex-col justify-between border">
          <div>
            <div className="flex items-center justify-center p-5">
              <Link href="/admin">
                <div className="font-bold">管理者</div>
              </Link>
            </div>

            <div className="pb-5">
              <div className="text-sm font-bold text-center">
                {user.name} 様
              </div>
            </div>

            <div className="border-b border-gray-300"></div>

            <AdminSidebar />
          </div>

          <div>
            <div className="px-5 py-2 text-sm border border-black rounded-full text-center mx-5 hover:bg-gray-50 cursor-pointer">
              <Logout />
            </div>

            <div className="p-5 text-sm">
              <Link href="/">
                <div className="border border-black rounded-full p-2 text-center hover:bg-gray-50">
                  トップページ
                </div>
              </Link>
            </div>
          </div>
        </nav>
        <main className="flex-1 min-h-[800px]">{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout
