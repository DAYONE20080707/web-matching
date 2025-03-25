import MainForm from "@/components/main/MainForm"
import CompanySearch from "@/components/main/CompanySearch"
import { getCompanyCountByPrefecture } from "@/actions/company"
import ContentFrame from "@/components/ui/frame/ContentFrame"
import TopFirstView from "@/components/main/top/TopFirstView"
import TopStepList from "@/components/main/top/TopStepList"
import TopReasonList from "@/components/main/top/TopReasonList"
import CtaForm from "@/components/main/CtaForm"
import TopQuestion from "@/components/main/top/TopQuestion"

// メインページ
const Home = async () => {
  const companyCounts = await getCompanyCountByPrefecture()

  return (
    <div className="">
      <TopFirstView />

      <MainForm />

      <TopReasonList />

      <div className=" bg-primary py-16">
        <CtaForm />
      </div>

      <div className=" bg-white">
        <CompanySearch companyCounts={companyCounts} />
      </div>

      <TopStepList />

      <div className=" bg-primary py-16">
        <CtaForm />
      </div>

      <div className=" bg-white">
        <TopQuestion />
      </div>
    </div>
  )
}

export default Home
