import MainForm from "@/components/main/MainForm"
import { getCompanyCountByPrefecture } from "@/actions/company"
import TopFirstView from "@/components/main/top/TopFirstView"
import TopStepList from "@/components/main/top/TopStepList"
import TopFeatureList from "@/components/main/top/TopFeatureList"
import CtaForm from "@/components/main/CtaForm"
import TopQuestion from "@/components/main/top/TopQuestion"
import TopAbout from "@/components/main/top/TopAbout"
import TopCompanySearch from "@/components/main/top/TopCompanySearch"
import TopCaseList from "@/components/main/top/TopCaseList"
import TopBlogList from "@/components/main/top/TopBlogList"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '補助金申請マッチングサービス',
  description:
    '補助金の申請を検討している事業者と、経験豊富なプロをマッチング。事業再構築補助金、IT導入補助金、小規模事業者持続化補助金など、各種補助金に対応した最適なサポートをご紹介します。申請書作成から実績報告まで、スムーズな申請を支援します。',
  metadataBase: new URL('https://day-1.tokyo/'),
  openGraph: {
    title: '補助金申請サポートなら｜コンサルタント一括マッチング',
    description:
      '事業再構築補助金、IT導入補助金、小規模事業者持続化補助金などに対応。補助金申請を成功に導くプロと事業者をつなぐマッチングサービス。申請支援・採択率向上・実績報告まで伴走型でサポートします。',
    url: 'https://hojokin-navi.day-1.tokyo/',
    images: [
      {
        url: '/static-image.png',
        width: 1200,
        height: 630,
        alt: '補助金申請サポートサービスのイメージ画像',
      },
    ],
  },
}

// メインページ
const Home = async () => {
  const companyCounts = await getCompanyCountByPrefecture()

  return (
    <div>
      <TopFirstView />
      <MainForm />

      <div id="about">
        <TopAbout />
      </div>

      <div id="feature" className="bg-secondary">
        <TopFeatureList />
      </div>

      <div id="cta" className="bg-primary py-8">
        <CtaForm />
      </div>

      <div id="search" className="bg-secondary">
        <TopCompanySearch companyCounts={companyCounts} />
      </div>

      <div className="bg-primary py-8">
        <CtaForm />
      </div>

      {/* <div id="case">
        <TopCaseList />
      </div> */}

      <div id="step">
        <TopStepList />
      </div>

      <div className="bg-primary py-16">
        <CtaForm />
      </div>

      <div id="blog" className="bg-secondary">
        <TopBlogList />
      </div>

      <div id="question" className="bg-white">
        <TopQuestion />
      </div>
    </div>
  )
}

export default Home
