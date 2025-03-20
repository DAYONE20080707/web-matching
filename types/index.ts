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
  title?: React.ReactNode
  subTitle: React.ReactNode
  number?: React.ReactNode // numberはオプショナル
  body?: React.ReactNode // bodyをオプショナルに変更
  imageSrc?: string
  titleElement?: React.ElementType
  subTitleElement?: React.ElementType
  numberElement?: React.ElementType
  bodyElement?: React.ElementType
}

export interface LinkButtonProps {
  href: string | URL // undefined を許可しない
  children?: React.ReactNode
  className?: string
  hoverColor?: string
}