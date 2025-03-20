"use client"

import { useState, useEffect } from "react"
import { User } from "@prisma/client"
// import { signOut } from "next-auth/react"
import { usePathname } from "next/navigation"
import { X, Menu } from "lucide-react"

import Image from "next/image"
import Link from "next/link"
import { menuItems } from "@/components/ui/navigation/Menu"

interface NavigationProps {
  user: User | null
}

const Navigation = ({ user }: NavigationProps) => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // メニューを開閉する関数
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // メニューを閉じる関数
  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // モバイルメニューが開いたときにスクロールを防止
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }
  }, [isMenuOpen])

  const backgroundClass = (() => {
    if (
      pathname.startsWith("/login") ||
      pathname.startsWith("/reset-password") ||
      pathname.startsWith("/signup") ||
      pathname.startsWith("/signup/admin") ||
      pathname.startsWith("/verify")
    ) {
      return "bg-gray-50"
    }
    return pathname === "/" ? "bg-white" : "bg-secondary"
  })()

  return (
    <header className={`py-5 ${backgroundClass}`}>
      <div className="max-w-screen-xl mx-auto px-3">
        <p className=" text-xs text-gray-500 text-left mb-2">プロを一括比較、見積もりができるビジネスマッチングサービス | PRONIアイミツ</p>
        <div className="px-2 md:px-5 py-2 md:py-4 flex items-center justify-between bg-white rounded-lg shadow-md">
          {/* ロゴ */}
          <div>
            <Link href="/">
              <Image
                src="/logo.png"
                alt="logo"
                width={160}
                height={36}
                priority
              />
            </Link>
          </div>

          {/* デスクトップメニュー */}
          <div className="hidden md:flex items-center space-x-3 text-sm">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.name}
              </Link>
            ))}

            {/* {user ? (
              <div className="text-xs border-2 border-primary text-primary font-bold rounded px-3 py-1.5 cursor-pointer hover:bg-primary hover:text-white">
                {user.isAdmin ? <Link href="/admin">管理ページ</Link> : <Link href="/member">マイページ</Link>}
              </div>
            ) : (
              <div className="text-xs border-2 border-primary text-primary font-bold rounded px-3 py-1.5 cursor-pointer hover:bg-primary hover:text-white">
                <Link href="/login">ログイン</Link>
              </div>
            )} */}
          </div>

          {/* ハンバーガーメニュー（モバイル用） */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-primary">
              {isMenuOpen ? (
                <X className="w-8 h-8" />
              ) : (
                <Menu className="w-8 h-8" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* モバイルメニュー */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 text-white flex flex-col items-center justify-center z-50">
          <button className="absolute top-5 right-5" onClick={closeMenu}>
            <X className="w-8 h-8" />
          </button>
          <ul className="space-y-6 text-lg">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={closeMenu}>
                  {item.name}
                </Link>
              </li>
            ))}

            {user ? (
              <li className="text-xs border-2 border-white text-white font-bold rounded px-3 py-1.5 cursor-pointer hover:bg-white hover:text-black">
                {user.isAdmin ? (
                  <Link href="/admin" onClick={closeMenu}>
                    管理ページ
                  </Link>
                ) : (
                  <Link href="/member" onClick={closeMenu}>
                    マイページ
                  </Link>
                )}
              </li>
            ) : (
              <li className="text-xs border-2 border-white text-white font-bold rounded px-3 py-1.5 cursor-pointer hover:bg-white hover:text-black">
                <Link href="/login" onClick={closeMenu}>
                  ログイン
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  )
}

export default Navigation
