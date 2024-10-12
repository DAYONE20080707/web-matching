"use client"

import Link from "next/link"

interface CompanySearchProps {
  companyCounts: { prefecture: string | null; count: number }[]
}

const CompanySearch = ({ companyCounts }: CompanySearchProps) => {
  const getCompanyCount = (prefecture: string) => {
    const countObj = companyCounts.find(
      (item) => item.prefecture === prefecture
    )
    return countObj ? `(${countObj.count})` : ""
  }

  return (
    <div>
      <div className="text-center my-10 font-bold text-2xl">制作会社を探す2</div>

      {/* 北海道・東北 */}
      <div className="mb-5 font-bold">
        <span className="font-bold text-xl">地域</span>から制作会社を探す
      </div>

      <div className="mb-3 font-bold">北海道・東北</div>
      <div className="md:flex md:items-center md:space-x-3 mb-5 md:flex-wrap grid grid-cols-4 gap-1">
        <div>
          <Link href="/search/hokkaido" className="underline text-blue-500">
            北海道
          </Link>
          <span className="ml-1">{getCompanyCount("北海道")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/aomori" className="underline text-blue-500">
            青森県
          </Link>
          <span className="ml-1">{getCompanyCount("青森県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/akita" className="underline text-blue-500">
            秋田県
          </Link>
          <span className="ml-1">{getCompanyCount("秋田県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/yamagata" className="underline text-blue-500">
            山形県
          </Link>
          <span className="ml-1">{getCompanyCount("山形県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/iwate" className="underline text-blue-500">
            岩手県
          </Link>
          <span className="ml-1">{getCompanyCount("岩手県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/miyagi" className="underline text-blue-500">
            宮城県
          </Link>
          <span className="ml-1">{getCompanyCount("宮城県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/fukushima" className="underline text-blue-500">
            福島県
          </Link>
          <span className="ml-1">{getCompanyCount("福島県")}</span>
        </div>
      </div>

      {/* 関東 */}
      <div className="mb-3 font-bold">関東</div>
      <div className="md:flex md:items-center md:space-x-3 mb-5 md:flex-wrap grid grid-cols-4 gap-1">
        <div>
          <Link href="/search/tokyo" className="underline text-blue-500">
            東京都
          </Link>
          <span className="ml-1">{getCompanyCount("東京都")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/kanagawa" className="underline text-blue-500">
            神奈川県
          </Link>
          <span className="ml-1">{getCompanyCount("神奈川県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/saitama" className="underline text-blue-500">
            埼玉県
          </Link>
          <span className="ml-1">{getCompanyCount("埼玉県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/chiba" className="underline text-blue-500">
            千葉県
          </Link>
          <span className="ml-1">{getCompanyCount("千葉県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/tochigi" className="underline text-blue-500">
            栃木県
          </Link>
          <span className="ml-1">{getCompanyCount("栃木県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/ibaraki" className="underline text-blue-500">
            茨城県
          </Link>
          <span className="ml-1">{getCompanyCount("茨城県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/gunma" className="underline text-blue-500">
            群馬県
          </Link>
          <span className="ml-1">{getCompanyCount("群馬県")}</span>
        </div>
      </div>

      {/* 中部 */}
      <div className="mb-3 font-bold">中部</div>
      <div className="md:flex md:items-center md:space-x-3 mb-5 md:flex-wrap grid grid-cols-4 gap-1">
        <div>
          <Link href="/search/aichi" className="underline text-blue-500">
            愛知県
          </Link>
          <span className="ml-1">{getCompanyCount("愛知県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/gifu" className="underline text-blue-500">
            岐阜県
          </Link>
          <span className="ml-1">{getCompanyCount("岐阜県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/shizuoka" className="underline text-blue-500">
            静岡県
          </Link>
          <span className="ml-1">{getCompanyCount("静岡県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/mie" className="underline text-blue-500">
            三重県
          </Link>
          <span className="ml-1">{getCompanyCount("三重県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/niigata" className="underline text-blue-500">
            新潟県
          </Link>
          <span className="ml-1">{getCompanyCount("新潟県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/yamanashi" className="underline text-blue-500">
            山梨県
          </Link>
          <span className="ml-1">{getCompanyCount("山梨県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/nagano" className="underline text-blue-500">
            長野県
          </Link>
          <span className="ml-1">{getCompanyCount("長野県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/ishikawa" className="underline text-blue-500">
            石川県
          </Link>
          <span className="ml-1">{getCompanyCount("石川県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/toyama" className="underline text-blue-500">
            富山県
          </Link>
          <span className="ml-1">{getCompanyCount("富山県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/fukui" className="underline text-blue-500">
            福井県
          </Link>
          <span className="ml-1">{getCompanyCount("福井県")}</span>
        </div>
      </div>

      {/* 関西 */}
      <div className="mb-3 font-bold">関西</div>
      <div className="md:flex md:items-center md:space-x-3 mb-5 md:flex-wrap grid grid-cols-4 gap-1">
        <div>
          <Link href="/search/osaka" className="underline text-blue-500">
            大阪府
          </Link>
          <span className="ml-1">{getCompanyCount("大阪府")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/hyogo" className="underline text-blue-500">
            兵庫県
          </Link>
          <span className="ml-1">{getCompanyCount("兵庫県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/kyoto" className="underline text-blue-500">
            京都府
          </Link>
          <span className="ml-1">{getCompanyCount("京都府")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/shiga" className="underline text-blue-500">
            滋賀県
          </Link>
          <span className="ml-1">{getCompanyCount("滋賀県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/nara" className="underline text-blue-500">
            奈良県
          </Link>
          <span className="ml-1">{getCompanyCount("奈良県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/wakayama" className="underline text-blue-500">
            和歌山県
          </Link>
          <span className="ml-1">{getCompanyCount("和歌山県")}</span>
        </div>
      </div>

      {/* 中国・四国 */}
      <div className="mb-3 font-bold">中国・四国</div>
      <div className="md:flex md:items-center md:space-x-3 mb-5 md:flex-wrap grid grid-cols-4 gap-1">
        <div>
          <Link href="/search/okayama" className="underline text-blue-500">
            岡山県
          </Link>
          <span className="ml-1">{getCompanyCount("岡山県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/hiroshima" className="underline text-blue-500">
            広島県
          </Link>
          <span className="ml-1">{getCompanyCount("広島県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/tottori" className="underline text-blue-500">
            鳥取県
          </Link>
          <span className="ml-1">{getCompanyCount("鳥取県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/shimane" className="underline text-blue-500">
            島根県
          </Link>
          <span className="ml-1">{getCompanyCount("島根県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/yamaguchi" className="underline text-blue-500">
            山口県
          </Link>
          <span className="ml-1">{getCompanyCount("山口県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/kagawa" className="underline text-blue-500">
            香川県
          </Link>
          <span className="ml-1">{getCompanyCount("香川県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/tokushima" className="underline text-blue-500">
            徳島県
          </Link>
          <span className="ml-1">{getCompanyCount("徳島県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/ehime" className="underline text-blue-500">
            愛媛県
          </Link>
          <span className="ml-1">{getCompanyCount("愛媛県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/kochi" className="underline text-blue-500">
            高知県
          </Link>
          <span className="ml-1">{getCompanyCount("高知県")}</span>
        </div>
      </div>

      {/* 九州・沖縄 */}
      <div className="mb-3 font-bold">九州・沖縄</div>
      <div className="md:flex md:items-center md:space-x-3 mb-5 md:flex-wrap grid grid-cols-4 gap-1">
        <div>
          <Link href="/search/fukuoka" className="underline text-blue-500">
            福岡県
          </Link>
          <span className="ml-1">{getCompanyCount("福岡県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/saga" className="underline text-blue-500">
            佐賀県
          </Link>
          <span className="ml-1">{getCompanyCount("佐賀県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/nagasaki" className="underline text-blue-500">
            長崎県
          </Link>
          <span className="ml-1">{getCompanyCount("長崎県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/kumamoto" className="underline text-blue-500">
            熊本県
          </Link>
          <span className="ml-1">{getCompanyCount("熊本県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/oita" className="underline text-blue-500">
            大分県
          </Link>
          <span className="ml-1">{getCompanyCount("大分県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/miyazaki" className="underline text-blue-500">
            宮崎県
          </Link>
          <span className="ml-1">{getCompanyCount("宮崎県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/kagoshima" className="underline text-blue-500">
            鹿児島県
          </Link>
          <span className="ml-1">{getCompanyCount("鹿児島県")}</span>
        </div>
        <div className="hidden md:block">|</div>
        <div>
          <Link href="/search/okinawa" className="underline text-blue-500">
            沖縄県
          </Link>
          <span className="ml-1">{getCompanyCount("沖縄県")}</span>
        </div>
      </div>
    </div>
  )
}

export default CompanySearch
