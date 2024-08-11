import Navigation from "@/components/auth/Navigation"
import { getAuthUser } from "@/lib/nextauth"

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  const user = await getAuthUser()

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation user={user} />
      <main className="flex-1 bg-gray-50 py-10 flex items-center justify-center">{children}</main>
      <footer className="text-center py-3 text-xs border-t">
        Copyright(C) DAY ONE. All Rights Reserved.
      </footer>
    </div>
  )
}

export default AuthLayout
