"use client"

import { signOut } from "next-auth/react"

const Logout = () => {
  return (
    <button
      onClick={() => {
        signOut({ callbackUrl: "/" })
      }}
    >
      ログアウト
    </button>
  )
}

export default Logout
