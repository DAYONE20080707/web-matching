import "./globals.css"
import type { Metadata } from "next"
import { Noto_Sans_JP } from "next/font/google" 

import AuthProvider from "@/components/providers/AuthProvider"
import ToastProvider from "@/components/providers/ToastProvider"
import QueryProvider from "@/components/providers/QueryProvider"
import ModalProvider from "@/components/providers/ModalProvider"

const notoSansJP = Noto_Sans_JP({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    template: "査定一括",
    default: "査定一括",
  },
  viewport: {
    width: "device-width",
    initialScale: 1.0,
    maximumScale: 1.0,
    userScalable: false,
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout = async ({ children }: RootLayoutProps) => {
  return (
    <html lang="ja">
      <body className={notoSansJP.className}>
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
