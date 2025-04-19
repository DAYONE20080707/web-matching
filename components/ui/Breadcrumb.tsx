"use client";

import Link from "next/link";

interface BreadcrumbItem {
  title: string;
  link?: string; // 最後の項目はリンクなしなのでオプショナル
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <div className="flex items-center gap-2 text-[#393939] text-xs">
      <Link href="/" className="hover:opacity-70">
        トップページ
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <span>{">"}</span>
          {item.link ? (
            <Link href={item.link} className="hover:opacity-70">
              {item.title}
            </Link>
          ) : (
            <span>{item.title}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
