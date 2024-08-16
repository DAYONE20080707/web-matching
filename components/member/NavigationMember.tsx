"use client"

import { useMedia } from "react-use"
import { useEffect, useState } from "react"
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Logout from "@/components/auth/Logout"
import MobileSidebar from "@/components/member/MobileSidebar"
import Sidebar from "@/components/member/Sidebar"

interface NavigationMemberProps {
  userName: string
  companyName: string
  unreadMessagesCount: number
}

const NavigationMember = ({
  userName,
  companyName,
  unreadMessagesCount,
}: NavigationMemberProps) => {
  const isMobileMedia = useMedia("(max-width: 768px)", false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  if (isMobileMedia) {
    return (
      <div className="absolute top-2 right-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="">
              <Menu className="w-8 h-8" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-0">
            <SheetHeader>
              <SheetTitle></SheetTitle>
            </SheetHeader>
            <div className="bg-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-center p-5">
                  <SheetClose asChild>
                    <Link href="/member">
                      <div className="font-bold">{companyName}</div>
                    </Link>
                  </SheetClose>
                </div>

                <div className="pb-5">
                  <div className="text-sm font-bold text-center">
                    {userName} 様
                  </div>
                </div>

                <div className="border-b border-gray-300"></div>

                <MobileSidebar unreadMessagesCount={unreadMessagesCount} />
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
            </div>
          </SheetContent>
        </Sheet>
      </div>
    )
  } else {
    return (
      <nav className="bg-white w-[250px] rounded-l-lg h-[800px] flex flex-col justify-between border">
        <div>
          <div className="flex items-center justify-center p-5">
            <Link href="/member">
              <div className="font-bold">{companyName}</div>
            </Link>
          </div>

          <div className="pb-5">
            <div className="text-sm font-bold text-center">{userName} 様</div>
          </div>

          <div className="border-b border-gray-300"></div>

          <Sidebar unreadMessagesCount={unreadMessagesCount} />
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
    )
  }
}

export default NavigationMember
