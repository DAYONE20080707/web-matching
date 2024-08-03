"use client"

import { useEffect, useState, useTransition } from "react"
import { User } from "@prisma/client"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface NavigationProps {
  user: User | null
}

// ナビゲーション
const Navigation = ({ user }: NavigationProps) => {
  return (
    <header className="text-sm">
      <div className="border-b border-black">
        <div>test</div>
      </div>
    </header>
  )
}

export default Navigation
