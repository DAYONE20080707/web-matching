"use client"

import { useState, useEffect } from "react"
import { User } from "@prisma/client"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
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
  const [isScrolled, setIsScrolled] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
    return ""
  })()

  return (
    <div className="relative md:max-w-[1200px] mx-auto">
      <header
        className={`w-full md:max-w-[1200px] fixed top-0 left-1/2 -translate-x-1/2 z-50 py-2 ${backgroundClass}`}
      >
        <div className="md:max-w-[1200px] mx-auto px-3">
          <p
            className={`text-xs text-right mb-2 transition-opacity duration-300 ${
              isScrolled ? "opacity-0" : "opacity-100"
            }`}
          >
            補助金コンサルタントを一括比較、見積もりができる
            <br className="block md:hidden" />
            ビジネスマッチングサービス | 補助金navi
          </p>

          <div className="px-2 md:px-5 py-2 md:py-3 flex items-center justify-between bg-white rounded-lg shadow-md">
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

            <div className="hidden md:flex items-center space-x-3 text-sm">
              {menuItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.name}
                </Link>
              ))}
            </div>

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

        {isMenuOpen && (
          <div className="fixed inset-0 w-full h-screen bg-gray-700 bg-opacity-80 text-white flex flex-col items-center justify-start pt-12 z-50">
            <button className="absolute top-5 right-5" onClick={closeMenu}>
              <X className="w-8 h-8" />
            </button>
            <ul className="space-y-6 text-base">
              {menuItems.map((item) => (
                <li key={item.href} className="hover:opacity-70">
                  <Link href={item.href} onClick={closeMenu}>
                    {item.name}
                  </Link>
                </li>
              ))}

              {user ? (
                <>
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
                  {/* ✅ ログアウトボタン追加 */}
                  <li
                    className="text-xs border-2 border-white text-white font-bold rounded px-3 py-1.5 cursor-pointer hover:bg-white hover:text-black"
                    onClick={() => {
                      signOut({ callbackUrl: "/" })
                      closeMenu()
                    }}
                  >
                    ログアウト
                  </li>
                </>
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
    </div>
  )
}

export default Navigation
