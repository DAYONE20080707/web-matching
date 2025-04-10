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

      <div className="bg-primary py-8">
        <CtaForm />
      </div>

      <div id="search" className="bg-secondary">
        <TopCompanySearch companyCounts={companyCounts} />
      </div>

      <div className="bg-primary py-8">
        <CtaForm />
      </div>

      <div id="case">
        <TopCaseList />
      </div>

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
