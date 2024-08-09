"use client"

import { format } from "date-fns"

interface NewsItemProps {
  news: {
    id: string
    date: string
    content: string
  }
}

const NewsItem = ({ news }: NewsItemProps) => {
  return (
    <div className="border-b border-gray-300 pb-3 mb-3">
      <div className="text-sm mb-2">
        {format(new Date(news.date), "yyyy.MM.dd")}
      </div>
      <div>{news.content}</div>
    </div>
  )
}

export default NewsItem
