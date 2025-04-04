import MainForm from "@/components/main/MainForm"
import CompanySearch from "@/components/main/CompanySearch"
import { getCompanyCountByPrefecture } from "@/actions/company"
import ContentFrame from "@/components/ui/frame/ContentFrame"
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
      <TopAbout />

      <div className=" bg-secondary">
        <TopFeatureList />
      </div>

      <div className=" bg-primary py-8">
        <CtaForm />
      </div>

      <div className=" bg-secondary">
        <TopCompanySearch companyCounts={companyCounts} />
        {/* <CompanySearch companyCounts={companyCounts} /> */}
      </div>

      <div className=" bg-primary py-8">
        <CtaForm />
      </div>

      <TopCaseList />

      <TopStepList />

      <div className=" bg-primary py-16">
        <CtaForm />
      </div>
      <div className=" bg-secondary">
        <TopBlogList />
      </div>

      <div className=" bg-white">
        <TopQuestion />
      </div>
    </div>
  )
}

export default Home
