"use client"

import { useEffect, useState } from "react"
// import CompanyDetailModal from "@/components/modals/CompanyDetailModal"
// import LoginModal from "@/components/modals/LoginModal"
// import TypeCheckModal from "@/components/modals/TypeCheckModal"
// import TypeResultModal from "@/components/modals/TypeResultModal"

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      {/* <CompanyDetailModal />
      <LoginModal />
      <TypeCheckModal />
      <TypeResultModal /> */}
    </>
  )
}

export default ModalProvider
