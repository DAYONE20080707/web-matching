// components/ui/frame/MainFrame.tsx
import { FrameProps } from '@/types'

const MainFrame = ({ children }: FrameProps) => {
  return <article className=" py-24">{children}</article>
}

export default MainFrame
