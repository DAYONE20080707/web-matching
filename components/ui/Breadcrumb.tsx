"use client";

import Link from "next/link";

interface BreadcrumbProps {
  mainTitle: string;
  parentDirectoryName: string;
  parentDirectoryLink: string;
}

const Breadcrumb = ({
  mainTitle,
  parentDirectoryName,
  parentDirectoryLink,
}: BreadcrumbProps) => {
  return (
    <div className="flex items-center gap-2 text-[#393939] text-xs">
      <Link href="/" className="hover:opacity-70">
        トップページ
      </Link>
      <span>{">"}</span>
      <Link href={parentDirectoryLink} className="hover:opacity-70">
        {parentDirectoryName}
      </Link>
      <span>{">"}</span>
      <span>{mainTitle}</span>
    </div>
  );
};

export default Breadcrumb;
