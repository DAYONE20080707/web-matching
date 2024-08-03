import "./globals.css"
import type { Metadata, Viewport } from "next"
import { M_PLUS_1 } from "next/font/google"

import AuthProvider from "@/components/providers/AuthProvider"
import ToastProvider from "@/components/providers/ToastProvider"
import QueryProvider from "@/components/providers/QueryProvider"
import ModalProvider from "@/components/providers/ModalProvider"

const mPlus1 = M_PLUS_1({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    template: "査定一括",
    default: "査定一括",
  },
}

export const viewport: Viewport = {
  maximumScale: 1,
  userScalable: false,
}

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout = async ({ children }: RootLayoutProps) => {
  return (
    <html lang="ja">
      <body className={mPlus1.className}>
        <AuthProvider>
          <QueryProvider>
            <ToastProvider />
            <ModalProvider />
            {children}
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout
