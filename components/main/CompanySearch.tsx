"use client"

import Link from "next/link"

interface CompanySearchProps {
  companyCounts: { prefecture: string; count: number }[]
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
      <div className="text-center my-10 font-bold text-2xl">制作会社を探す</div>

      {/* 北海道・東北 */}
      <div className="mb-5">
        <span className="font-bold text-xl">地域</span>から制作会社を探す
      </div>

      <div className="mb-3">北海道・東北</div>
      <div className="flex items-center space-x-3 mb-5 flex-wrap">
        <Link href="/search/hokkaido" className="underline text-blue-500">
          北海道 {getCompanyCount("北海道")}
        </Link>
        <div>|</div>
        <Link href="/search/aomori" className="underline text-blue-500">
          青森県 {getCompanyCount("青森県")}
        </Link>
        <div>|</div>
        <Link href="/search/akita" className="underline text-blue-500">
          秋田県 {getCompanyCount("秋田県")}
        </Link>
        <div>|</div>
        <Link href="/search/yamagata" className="underline text-blue-500">
          山形県 {getCompanyCount("山形県")}
        </Link>
        <div>|</div>
        <Link href="/search/iwate" className="underline text-blue-500">
          岩手県 {getCompanyCount("岩手県")}
        </Link>
        <div>|</div>
        <Link href="/search/miyagi" className="underline text-blue-500">
          宮城県 {getCompanyCount("宮城県")}
        </Link>
        <div>|</div>
        <Link href="/search/fukushima" className="underline text-blue-500">
          福島県 {getCompanyCount("福島県")}
        </Link>
      </div>

      {/* 関東 */}
      <div className="mb-3">関東</div>
      <div className="flex items-center space-x-3 mb-5 flex-wrap">
        <Link href="/search/tokyo" className="underline text-blue-500">
          東京都 {getCompanyCount("東京都")}
        </Link>
        <div>|</div>
        <Link href="/search/kanagawa" className="underline text-blue-500">
          神奈川県 {getCompanyCount("神奈川県")}
        </Link>
        <div>|</div>
        <Link href="/search/saitama" className="underline text-blue-500">
          埼玉県 {getCompanyCount("埼玉県")}
        </Link>
        <div>|</div>
        <Link href="/search/chiba" className="underline text-blue-500">
          千葉県 {getCompanyCount("千葉県")}
        </Link>
        <div>|</div>
        <Link href="/search/tochigi" className="underline text-blue-500">
          栃木県 {getCompanyCount("栃木県")}
        </Link>
        <div>|</div>
        <Link href="/search/ibaraki" className="underline text-blue-500">
          茨城県 {getCompanyCount("茨城県")}
        </Link>
        <div>|</div>
        <Link href="/search/gunma" className="underline text-blue-500">
          群馬県 {getCompanyCount("群馬県")}
        </Link>
      </div>

      {/* 中部 */}
      <div className="mb-3">中部</div>
      <div className="flex items-center space-x-3 mb-5 flex-wrap">
        <Link href="/search/aichi" className="underline text-blue-500">
          愛知県 {getCompanyCount("愛知県")}
        </Link>
        <div>|</div>
        <Link href="/search/gifu" className="underline text-blue-500">
          岐阜県 {getCompanyCount("岐阜県")}
        </Link>
        <div>|</div>
        <Link href="/search/shizuoka" className="underline text-blue-500">
          静岡県 {getCompanyCount("静岡県")}
        </Link>
        <div>|</div>
        <Link href="/search/mie" className="underline text-blue-500">
          三重県 {getCompanyCount("三重県")}
        </Link>
        <div>|</div>
        <Link href="/search/niigata" className="underline text-blue-500">
          新潟県 {getCompanyCount("新潟県")}
        </Link>
        <div>|</div>
        <Link href="/search/yamanashi" className="underline text-blue-500">
          山梨県 {getCompanyCount("山梨県")}
        </Link>
        <div>|</div>
        <Link href="/search/nagano" className="underline text-blue-500">
          長野県 {getCompanyCount("長野県")}
        </Link>
        <div>|</div>
        <Link href="/search/ishikawa" className="underline text-blue-500">
          石川県 {getCompanyCount("石川県")}
        </Link>
        <div>|</div>
        <Link href="/search/toyama" className="underline text-blue-500">
          富山県 {getCompanyCount("富山県")}
        </Link>
        <div>|</div>
        <Link href="/search/fukui" className="underline text-blue-500">
          福井県 {getCompanyCount("福井県")}
        </Link>
      </div>

      {/* 関西 */}
      <div className="mb-3">関西</div>
      <div className="flex items-center space-x-3 mb-5 flex-wrap">
        <Link href="/search/osaka" className="underline text-blue-500">
          大阪府 {getCompanyCount("大阪府")}
        </Link>
        <div>|</div>
        <Link href="/search/hyogo" className="underline text-blue-500">
          兵庫県 {getCompanyCount("兵庫県")}
        </Link>
        <div>|</div>
        <Link href="/search/kyoto" className="underline text-blue-500">
          京都府 {getCompanyCount("京都府")}
        </Link>
        <div>|</div>
        <Link href="/search/shiga" className="underline text-blue-500">
          滋賀県 {getCompanyCount("滋賀県")}
        </Link>
        <div>|</div>
        <Link href="/search/nara" className="underline text-blue-500">
          奈良県 {getCompanyCount("奈良県")}
        </Link>
        <div>|</div>
        <Link href="/search/wakayama" className="underline text-blue-500">
          和歌山県 {getCompanyCount("和歌山県")}
        </Link>
      </div>

      {/* 中国・四国 */}
      <div className="mb-3">中国・四国</div>
      <div className="flex items-center space-x-3 mb-5 flex-wrap">
        <Link href="/search/okayama" className="underline text-blue-500">
          岡山県 {getCompanyCount("岡山県")}
        </Link>
        <div>|</div>
        <Link href="/search/hiroshima" className="underline text-blue-500">
          広島県 {getCompanyCount("広島県")}
        </Link>
        <div>|</div>
        <Link href="/search/tottori" className="underline text-blue-500">
          鳥取県 {getCompanyCount("鳥取県")}
        </Link>
        <div>|</div>
        <Link href="/search/shimane" className="underline text-blue-500">
          島根県 {getCompanyCount("島根県")}
        </Link>
        <div>|</div>
        <Link href="/search/yamaguchi" className="underline text-blue-500">
          山口県 {getCompanyCount("山口県")}
        </Link>
        <div>|</div>
        <Link href="/search/kagawa" className="underline text-blue-500">
          香川県 {getCompanyCount("香川県")}
        </Link>
        <div>|</div>
        <Link href="/search/tokushima" className="underline text-blue-500">
          徳島県 {getCompanyCount("徳島県")}
        </Link>
        <div>|</div>
        <Link href="/search/ehime" className="underline text-blue-500">
          愛媛県 {getCompanyCount("愛媛県")}
        </Link>
        <div>|</div>
        <Link href="/search/kochi" className="underline text-blue-500">
          高知県 {getCompanyCount("高知県")}
        </Link>
      </div>

      {/* 九州・沖縄 */}
      <div className="mb-3">九州・沖縄</div>
      <div className="flex items-center space-x-3 flex-wrap">
        <Link href="/search/fukuoka" className="underline text-blue-500">
          福岡県 {getCompanyCount("福岡県")}
        </Link>
        <div>|</div>
        <Link href="/search/saga" className="underline text-blue-500">
          佐賀県 {getCompanyCount("佐賀県")}
        </Link>
        <div>|</div>
        <Link href="/search/nagasaki" className="underline text-blue-500">
          長崎県 {getCompanyCount("長崎県")}
        </Link>
        <div>|</div>
        <Link href="/search/kumamoto" className="underline text-blue-500">
          熊本県 {getCompanyCount("熊本県")}
        </Link>
        <div>|</div>
        <Link href="/search/oita" className="underline text-blue-500">
          大分県 {getCompanyCount("大分県")}
        </Link>
        <div>|</div>
        <Link href="/search/miyazaki" className="underline text-blue-500">
          宮崎県 {getCompanyCount("宮崎県")}
        </Link>
        <div>|</div>
        <Link href="/search/kagoshima" className="underline text-blue-500">
          鹿児島県 {getCompanyCount("鹿児島県")}
        </Link>
        <div>|</div>
        <Link href="/search/okinawa" className="underline text-blue-500">
          沖縄県 {getCompanyCount("沖縄県")}
        </Link>
      </div>
    </div>
  )
}

export default CompanySearch
