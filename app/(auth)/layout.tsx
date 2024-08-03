interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  return (
    <div className="h-screen bg-[#E3F9EE]">
      <main className="flex items-center justify-center h-full">
        {children}
      </main>
    </div>
  )
}

export default AuthLayout
