"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useModal } from "@/hooks/use-modal-store"
import OrderForm from "@/components/main/OrderForm"

const OrderModal = () => {
  const { isOpen, onClose, type, data } = useModal()
  const isModalOpen = isOpen && type === "order"

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="border-0 p-5 max-w-[800px] max-h-[700px] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <OrderForm
          name={data.order?.name || ""}
          email={data.order?.email || ""}
          handleClose={handleClose}
        />
      </DialogContent>
    </Dialog>
  )
}

export default OrderModal
