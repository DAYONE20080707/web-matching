// components/ui/frame/ContentFrame.tsx

import { FrameProps } from "@/types"

const ContentFrame = ({ children, className, id }: FrameProps) => {
  return (
    <div className={`px-3 md:max-w-[1200px] mx-auto py-20 ${className}`} id={id}>
      {children}
    </div>
  )
}

export default ContentFrame
