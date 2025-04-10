// app/(main)/blog/page.tsx

import React from "react"
import BlogList from "@/components/main/blog/BlogList"
import PageHeadline from "@/components/ui/text/PageHeadline"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Webマーケティングのお役立ち情報の発信",
  description:
    "ホームページ制作、DX化に関するお役立ち情報を発信しております。最新のトレンドや成功事例を交えながら、ビジネスの成長を加速させるための情報です。",
  metadataBase: new URL("https://day-1.tokyo/"),
  openGraph: {
    title: "Webマーケティングのお役立ち情報の発信",
    description:
      "ホームページ制作、DX化に関するお役立ち情報を発信しております。最新のトレンドや成功事例を交えながら、ビジネスの成長を加速させるための情報です。",
    url: "https://day-1.tokyo/blog",
    images: [
      {
        url: "/static-image.png",
        width: 1200,
        height: 630,
        alt: "株式会社デイワンのイメージ画像",
      },
    ],
  },
}

const BlogPage = () => {
  return (
    <>
      <PageHeadline
        subtitle="Tips and Colum"
        mainTitle="お役立ち情報"
        body="Webマーケティングに関する研究をお役立ち情報をまとめております。コンセプト開発から、Web制作、SEOまで幅広く発信!"
      />

      <BlogList />
    </>
  )
}

export default BlogPage
