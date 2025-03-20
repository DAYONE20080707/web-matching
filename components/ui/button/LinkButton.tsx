// components/ui/button/LinkButton.tsx

import Link from "next/link"
import { LinkButtonProps } from "@/types"

const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  children,
  className,
}) => {
  return (
    <>
      <Link
        href={href}
        className={`  text-white bg-primary py-2 px-2 rounded-sm  ${className}`}

      >
        {children}

      </Link>
    </>
  )
}

export default LinkButton
