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
        className={` block w-[300px] h-auto bg-green-600 text-base text-center text-white py-4 px-2 rounded-xl shadow-slate-700 shadow-md hover:opacity-70  ${className}`}

      >
        {children}

      </Link>
    </>
  )
}

export default LinkButton
