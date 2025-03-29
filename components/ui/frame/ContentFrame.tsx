// components/ui/frame/ContentFrame.tsx

import { FrameProps } from "@/types"

const ContentFrame = ({ children, className, id }: FrameProps) => {
  return (
    <div className={` w-11/12  md:max-w-screen-lg mx-auto py-12 ${className}`} id={id}>
      {children}
    </div>
  )
}

export default ContentFrame
