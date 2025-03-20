// components/ui/frame/ContentFrame.tsx

import { FrameProps } from '@/types'

const ContentFrame = ({ children, className, id }: FrameProps) => {
  return (
    <div className={` w-11/12  max-w-screen-xl mx-auto py-20 ${className}`} id={id}>
      {children}
    </div>
  )
}

export default ContentFrame
