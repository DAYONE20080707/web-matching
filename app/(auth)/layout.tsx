interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  return (
    <div className="h-screen bg-gray-50">
      <main className="flex items-center justify-center h-full">
        {children}
      </main>
    </div>
  )
}

export default AuthLayout
