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
      <div className="px-3 max-w-screen-lg mx-auto py-4 flex items-center justify-between ">
        <div className="font-bold text-xl">
          <Link href="/">一括サイト</Link>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          {user ? (
            <>
              <div className="border border-black rounded-full px-3 py-1 cursor-pointer hover:bg-gray-50">
                {user.isAdmin ? (
                  <Link href="/admin">管理ページ</Link>
                ) : (
                  <Link href="/member">マイページ</Link>
                )}
              </div>
              <div
                className="border border-black rounded-full px-3 py-1 cursor-pointer hover:bg-gray-50"
                onClick={() => {
                  signOut({ callbackUrl: "/" })
                }}
              >
                ログアウト
              </div>
            </>
          ) : (
            <div className="border border-black rounded-full px-3 py-1 cursor-pointer hover:bg-gray-50">
              <Link href="/login">ログイン</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navigation
