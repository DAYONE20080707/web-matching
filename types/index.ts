import { ReactNode } from "react"

export interface OrderType {
  name: string
  email: string
}

export interface CaseType {
  id: string
  thumbnail: {
    url?: string
  }
  title: string
  content: string
  address: string
  area: number
  buildingYear: number
  salesPrice: number
}

export interface BlogType {
  id: string
  thumbnail: {
    url?: string
  }
  title: string
  content: string
  category: string
  publishedAt: string
}

export interface NewsType {
  id: string
  title: string
  content: string
  publishedAt: string
}


export interface FrameProps {
  children: React.ReactNode
  className?: string
  id?: string // id属性を追加
}

export interface TextProps {
  mainTitle?: React.ReactNode
  subTitle?: React.ReactNode
  number?: React.ReactNode // numberはオプショナル
  body?: React.ReactNode // bodyをオプショナルに変更
  imageSrc?: string
  titleElement?: React.ElementType
  subTitleElement?: React.ElementType
  numberElement?: React.ElementType
  bodyElement?: React.ElementType
}

export interface TextHeadlineProps {
  imageSrc?: string
  imageAlt?: string
  mainTitle?: string | ReactNode
  subTitle?: string | ReactNode
  body?: string | ReactNode
  className?: string

  showOverlay?: boolean // 黒のオーバーレイを適用するかどうか
}

export interface LinkButtonProps {
  href: string | URL // undefined を許可しない
  children?: React.ReactNode
  className?: string
  hoverColor?: string
}

export interface ItemCardProps {
number?: string
  mainTitle: string
  subTitle: string
  body: string
  imageSrc:string
}

export interface BlogType {
  id: string
  thumbnail: {
    url?: string
  }
  title: string
  content: string
  category: string
  publishedAt: string
}