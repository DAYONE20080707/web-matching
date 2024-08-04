import Navigation from "@/components/auth/Navigation"
// import { getAuthUser } from "@/lib/nextauth"

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = async ({ children }: MainLayoutProps) => {
  // const user = await getAuthUser()
  const user = null

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation user={user} />
      <main className="flex-1">{children}</main>
    </div>
  )
}

export default MainLayout
