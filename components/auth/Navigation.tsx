"use client"

import { User } from "@prisma/client"
import { signOut } from "next-auth/react"
import Link from "next/link"

interface NavigationProps {
  user: User | null
}

// ナビゲーション
const Navigation = ({ user }: NavigationProps) => {
  return (
    <header className="border-b">
      <div className="px-3 max-w-screen-lg mx-auto py-5 flex items-center justify-between ">
        <div className="font-bold text-2xl">DAY ONE</div>

        {user && (
          <div className="flex items-center space-x-2 text-xs">
            <div className="border border-black rounded-full px-3 py-1 cursor-pointer hover:bg-gray-50">
              <Link href="/member">ダッシュボード</Link>
            </div>
            <div
              className="border border-black rounded-full px-3 py-1 cursor-pointer hover:bg-gray-50"
              onClick={() => {
                signOut({ callbackUrl: "/" })
              }}
            >
              ログアウト
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navigation
