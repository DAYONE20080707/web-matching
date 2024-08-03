import { NextApiRequest, NextApiResponse } from "next"
import { NextAuthOptions, getServerSession } from "next-auth"
import { getServerSession as pageGetServerSession } from "next-auth/next"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { db } from "@/lib/prisma"
import { LoginSchema } from "@/schemas"
import { User } from "@prisma/client"
import bcrypt from "bcrypt"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const validatedField = LoginSchema.safeParse(credentials)

        if (!validatedField.success) {
          throw new Error("Invalid email or password")
        }

        const { email, password } = validatedField.data

        const user = await db.user.findUnique({ where: { email } })

        if (!user) throw new Error("Invalid email or password")
        if (!user.password) throw new Error("Invalid email or password")

        // ユーザーが確認済みでない場合
        if (!user.isVerified) {
          throw new Error("Email verification is required")
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (!passwordMatch) throw new Error("Invalid email or password")

        return user
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (session.user) {
        session.user.name = token.name!
        session.user.email = token.email as string | null
        session.user.isAdmin = token.isAdmin as boolean
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token

      const existingUser = await db.user.findFirst({
        where: { id: token.sub },
      })

      if (!existingUser) return token

      token.name = existingUser.name
      token.email = existingUser.email
      token.isAdmin = existingUser.isAdmin

      return token
    },
  },
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/error",
  },
} satisfies NextAuthOptions

export const getAuthUser = async () => {
  const session = await getServerSession(authOptions)

  return session?.user as User | null
}

export const pageAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await pageGetServerSession(req, res, authOptions)

  return session?.user as User | null
}
