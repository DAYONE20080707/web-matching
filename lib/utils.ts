import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const projectPerPage = 20

export const SITE_NAME = "一括サイト"

export const PREFECTURES = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
]

export const PRODUCT_TYPE_LIST = [
  {
    id: "1",
    label: "事業再構築補助金",
  },
  {
    id: "2",
    label: "IT導入補助金",
  },
  {
    id: "3",
    label: "小規模事業者持続化補助金",
  },
  {
    id: "4",
    label: "ものづくり補助金",
  },
  {
    id: "5",
    label: "その他",
  },
] as const

export const DESIRED_FUNCTION_LIST = [
  {
    id: "1",
    label: "事業計画書の作成サポート（構成・骨子設計から支援）",
  },
  {
    id: "2",
    label: "数値計画（損益予測・売上目標など）の作成支援",
  },
  {
    id: "3",
    label: "GビズIDの取得サポート",
  },
  {
    id: "4",
    label: "電子申請システム（jGrantsなど）の入力代行",
  },
  {
    id: "5",
    label: "交付申請や実績報告のサポート",
  },
  {
    id: "6",
    label: "実行支援パートナーの紹介（開発・制作など）",
  },
  {
    id: "7",
    label: "その他",
  },
] as const

export const prefectureMapping: { [key: string]: string } = {
  hokkaido: "北海道",
  aomori: "青森県",
  akita: "秋田県",
  yamagata: "山形県",
  iwate: "岩手県",
  miyagi: "宮城県",
  fukushima: "福島県",
  tokyo: "東京都",
  kanagawa: "神奈川県",
  saitama: "埼玉県",
  chiba: "千葉県",
  tochigi: "栃木県",
  ibaraki: "茨城県",
  gunma: "群馬県",
  aichi: "愛知県",
  gifu: "岐阜県",
  shizuoka: "静岡県",
  mie: "三重県",
  niigata: "新潟県",
  yamanashi: "山梨県",
  nagano: "長野県",
  ishikawa: "石川県",
  toyama: "富山県",
  fukui: "福井県",
  osaka: "大阪府",
  hyogo: "兵庫県",
  kyoto: "京都府",
  shiga: "滋賀県",
  nara: "奈良県",
  wakayama: "和歌山県",
  okayama: "岡山県",
  hiroshima: "広島県",
  tottori: "鳥取県",
  shimane: "島根県",
  yamaguchi: "山口県",
  kagawa: "香川県",
  tokushima: "徳島県",
  ehime: "愛媛県",
  kochi: "高知県",
  fukuoka: "福岡県",
  saga: "佐賀県",
  nagasaki: "長崎県",
  kumamoto: "熊本県",
  oita: "大分県",
  miyazaki: "宮崎県",
  kagoshima: "鹿児島県",
  okinawa: "沖縄県",
}

export const AREA_LIST = [
  {
    id: "1",
    label: "北海道",
  },
  {
    id: "2",
    label: "青森県",
  },
  {
    id: "3",
    label: "岩手県",
  },
  {
    id: "4",
    label: "宮城県",
  },
  {
    id: "5",
    label: "秋田県",
  },
  {
    id: "6",
    label: "山形県",
  },
  {
    id: "7",
    label: "福島県",
  },
  {
    id: "8",
    label: "茨城県",
  },
  {
    id: "9",
    label: "栃木県",
  },
  {
    id: "10",
    label: "群馬県",
  },
  {
    id: "11",
    label: "埼玉県",
  },
  {
    id: "12",
    label: "千葉県",
  },
  {
    id: "13",
    label: "東京都",
  },
  {
    id: "14",
    label: "神奈川県",
  },
  {
    id: "15",
    label: "新潟県",
  },
  {
    id: "16",
    label: "富山県",
  },
  {
    id: "17",
    label: "石川県",
  },
  {
    id: "18",
    label: "福井県",
  },
  {
    id: "19",
    label: "山梨県",
  },
  {
    id: "20",
    label: "長野県",
  },
  {
    id: "21",
    label: "岐阜県",
  },
  {
    id: "22",
    label: "静岡県",
  },
  {
    id: "23",
    label: "愛知県",
  },
  {
    id: "24",
    label: "三重県",
  },
  {
    id: "25",
    label: "滋賀県",
  },
  {
    id: "26",
    label: "京都府",
  },
  {
    id: "27",
    label: "大阪府",
  },
  {
    id: "28",
    label: "兵庫県",
  },
  {
    id: "29",
    label: "奈良県",
  },
  {
    id: "30",
    label: "和歌山県",
  },
  {
    id: "31",
    label: "鳥取県",
  },
  {
    id: "32",
    label: "島根県",
  },
  {
    id: "33",
    label: "岡山県",
  },
  {
    id: "34",
    label: "広島県",
  },
  {
    id: "35",
    label: "山口県",
  },
  {
    id: "36",
    label: "徳島県",
  },
  {
    id: "37",
    label: "香川県",
  },
  {
    id: "38",
    label: "愛媛県",
  },
  {
    id: "39",
    label: "高知県",
  },
  {
    id: "40",
    label: "福岡県",
  },
  {
    id: "41",
    label: "佐賀県",
  },
  {
    id: "42",
    label: "長崎県",
  },
  {
    id: "43",
    label: "熊本県",
  },
  {
    id: "44",
    label: "大分県",
  },
  {
    id: "45",
    label: "宮崎県",
  },
  {
    id: "46",
    label: "鹿児島県",
  },
  {
    id: "47",
    label: "沖縄県",
  },
] as const

export const QUESTIONS = [
  {
    id: "1",
    question: "利用に費用はかかりますか？",
    answer:
      "いいえ、当サービスの利用は完全無料です。専門家のご紹介やマッチングに費用は一切かかりません。",
  },
  {
    id: "2",
    question: "どのような専門家が登録されていますか？",
    answer:
      "補助金に精通したコンサルタントや社労士、中小企業診断士など、各分野のプロフェッショナルが多数登録しています。",
  },
  {
    id: "3",
    question: "相談には何が必要ですか？",
    answer:
      "業種、事業の内容、検討中の取り組みなど、簡単な情報を入力いただくだけでOKです。初めての方でも安心してご利用いただけます。",
  },
  {
    id: "4",
    question: "紹介された専門家と必ず契約しなければなりませんか？",
    answer:
      "いいえ。ご紹介後にお断りいただくことも可能です。相性が合わない場合は、別の専門家の再紹介も承ります。",
  },
  {
    id: "5",
    question: "小規模な事業や個人でも利用できますか？",
    answer:
      "はい、可能です。個人事業主や小規模法人でも利用できる補助金制度が多数あり、専門家が最適な申請をサポートします。",
  },
  {
    id: "6",
    question: "どの補助金に対応していますか？",
    answer:
      "ものづくり補助金、IT導入補助金、事業再構築補助金をはじめ、最新の制度や自治体独自の補助金にも対応しています。",
  },
  {
    id: "7",
    question: "マッチング後のやりとりはどうなりますか？",
    answer:
      "マッチングが完了すると、専門家と直接やりとりしていただけます。やりとりの途中でサポートが必要な場合は、運営がフォローします。",
  },
]

export const SUBSIDIES = [
  {
    id: "1",
    title: "ものづくり補助金",
    subtitle: "4,000万円",
    description:
      "革新的な製品・サービスの開発や設備投資を支援。幅広い業種が対象で、生産性向上を目指す企業におすすめです。",
    href: "/subsidy/1",
  },
  {
    id: "2",
    title: "新事業進出補助金（新設）",
    subtitle: "9,000万円",
    description:
      "新たな事業への参入を支援。設備投資やシステム開発、建物費など幅広い用途で活用できます。",
    href: "/subsidy/2",
  },
  {
    id: "3",
    title: "中小企業成長加速化補助金（新設）",
    subtitle: "5億円",
    description:
      "売上高100億円超を目指す、成長志向の中小企業向け。大型設備投資や先進的な取り組みに対応します。",
    href: "/subsidy/3",
  },
  {
    id: "4",
    title: "中小企業省力化投資補助金",
    subtitle: "1億円",
    description:
      "人手不足対策や業務効率化のための、省力化・自動化設備の導入を支援します。",
    href: "/subsidy/4",
  },
  {
    id: "5",
    title: "IT導入補助金",
    subtitle: "450万円",
    description:
      "業務の効率化やDX推進を目的としたITツールやシステム導入を支援。中小企業のデジタル化を後押しします。",
    href: "/subsidy/5",
  },
  {
    id: "6",
    title: "小規模事業者持続化補助金",
    subtitle: "250万円",
    description:
      "販路開拓や集客強化など、経営計画に基づく取り組みを支援。小規模事業者の成長をサポートします。",
    href: "/subsidy/6",
  },
  {
    id: "7",
    title: "Go-Tech事業",
    subtitle: "3億円",
    description:
      "中小企業による高度な技術開発や製品・プロセスの高度化に向けた取り組みを支援する大型補助金です。",
    href: "/subsidy/7",
  },
  {
    id: "8",
    title: "事業承継・M&A補助金",
    subtitle: "2,000万円",
    description:
      "事業承継やM&Aに関わる経費を支援。後継者不足や事業継続の課題解決に貢献します。",
    href: "/subsidy/8",
  },
  {
    id: "9",
    title: "地域・業界特化型の補助金",
    subtitle: "補助金による",
    description:
      "自治体独自の補助金や、特定業界向けの支援制度も多数あります。地域や業種に合わせた補助金情報をご案内します。",
    href: "/subsidy/9",
  },
]
