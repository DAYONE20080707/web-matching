"use client"

import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import Link from "next/link"

// ナビゲーション
const menuItems = [
  {
    title: "紹介案件一覧",
    href: "/admin",
  },
  {
    title: "企業一覧",
    href: "/admin/company",
  },
  {
    title: "メッセージ一覧",
    href: "/admin/message",
  },
]

// サイドバー
const AdminSidebar = () => {
  const pathname = usePathname()

  return (
    <div>
      <div className="m-5 text-gray-300 font-bold text-xs">メニュー</div>
      <div className="border-b border-gray-300 mb-5">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              pathname === item.href
                ? `bg-[#F17F7F] hover:bg-[#F17F7F] text-white `
                : `hover:bg-[#F17F7F]`,
              "justify-start w-full rounded-none py-3 font-bold hover:text-white"
            )}
          >
            {item.title}
          </Link>
        ))}
      </div>

      <div className="m-5 text-gray-300 font-bold text-xs">設定</div>

      <div className="border-b border-gray-300 mb-5">
        <div
          className={cn(
            buttonVariants({ variant: "ghost" }),
            ` font-bold cursor-pointer justify-start w-full rounded-none py-3 hover:bg-[#F17F7F] hover:text-white`
          )}
          onClick={() => {
            if (!window.confirm("ログアウトしますが、宜しいですか？")) {
              return
            }
            signOut({ callbackUrl: "/reset-password" })
          }}
        >
          パスワード再設定
        </div>
      </div>
    </div>
  )
}

export default AdminSidebar
