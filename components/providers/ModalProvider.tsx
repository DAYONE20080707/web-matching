"use client"

import { useEffect, useState } from "react"
import OrderModal from "@/components/modals/OrderModal"

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
      <OrderModal />
    </>
  )
}

export default ModalProvider
