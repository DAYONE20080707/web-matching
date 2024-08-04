"use client"

import { User } from "@prisma/client"

interface NavigationProps {
  user: User | null
}

// ナビゲーション
const Navigation = ({ user }: NavigationProps) => {
  return (
    <header className="border-b">
      <div className="px-3 max-w-screen-lg mx-auto py-5">
        <div className="font-bold text-2xl">DAY ONE</div>
      </div>
    </header>
  )
}

export default Navigation
