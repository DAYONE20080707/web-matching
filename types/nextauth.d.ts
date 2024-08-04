import NextAuth, { type DefaultSession } from "next-auth"

export type SessionUser = {
  id: string
  email: string | null
  name: string
  isAdmin: boolean
  companyId: string | null
  position: string | null
  message: string | null
}

declare module "next-auth" {
  interface Session {
    user: SessionUser
  }
}
