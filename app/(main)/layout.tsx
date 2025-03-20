import Navigation from "@/components/ui/navigation/Navigation"
import { getAuthUser } from "@/lib/nextauth"
import Footer from "@/components/main/Footer"

interface MainLayoutProps {
  children: React.ReactNode
}

const MainLayout = async ({ children }: MainLayoutProps) => {
  const user = await getAuthUser()

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation user={user} />
      <main className="flex-1 mb-10">{children}</main>
      <Footer user={user} />
      <footer className="text-center py-3 text-xs border-t">
        Copyright(C) DAY ONE. All Rights Reserved.
      </footer>
    </div>
  )
}

export default MainLayout
