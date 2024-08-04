import { redirect } from "next/navigation"
import { getAuthUser } from "@/lib/nextauth"
import Image from "next/image"
import Link from "next/link"
import Logout from "@/components/auth/Logout"
import Sidebar from "@/components/member/Sidebar"

interface MemberLayoutProps {
  children: React.ReactNode
}

const MemberLayout = async ({ children }: MemberLayoutProps) => {
  // 認証情報取得
  const user = await getAuthUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="mx-auto px-3 sm:px-5 max-w-screen-xl flex space-x-3">
        <nav className="bg-white w-[250px] rounded-l-lg h-[850px] flex flex-col justify-between border">
          <div>
            <div className="flex items-center justify-center p-5">
              <Link href="/member">
                <div>会社名</div>
              </Link>
            </div>

            <div className="border-b border-gray-300"></div>

            <div className="py-5">
              <div className="mx-10 border rounded-full border-red-500 mb-5">
                <div className="text-center text-xs text-red-500 font-bold py-1">
                  ログイン中
                </div>
              </div>

              <div className="text-sm font-bold text-center">
                {user.name} 様
              </div>
            </div>

            <div className="border-b border-gray-300"></div>

            <Sidebar />
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
        <main className="flex-1 min-h-[850px]">{children}</main>
      </div>
    </div>
  )
}

export default MemberLayout
