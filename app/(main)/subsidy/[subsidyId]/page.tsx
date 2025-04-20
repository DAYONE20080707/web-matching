import { getCompaniesBySubsidyId } from "@/actions/company"
import CompanySearchItem from "@/components/main/CompanySearchItem"
import { SUBSIDIES } from "@/lib/utils"
import ContentFrame from "@/components/ui/frame/ContentFrame"
import LinkButton from "@/components/ui/button/LinkButton"
import Breadcrumb from "@/components/ui/Breadcrumb"
import ContentHeadline from "@/components/ui/text/ContentHeadline"

interface SubsidyPageProps {
  params: {
    subsidyId: string
  }
}

const SubsidyPage = async ({ params }: SubsidyPageProps) => {
  const { subsidyId } = params

  const companies = await getCompaniesBySubsidyId(subsidyId)
  const subsidy = SUBSIDIES.find((subsidy) => subsidy.id === subsidyId)

  return (
    <div className="bg-secondary pt-12">
      <ContentFrame>
        <Breadcrumb items={[{ title: `${subsidy?.title}の会社の一覧` }]} />
        <div className="mt-10">
          <ContentHeadline
            subTitle="Companies"
            mainTitle={`${subsidy?.title}の会社の一覧`}
          />
          <div className="my-5">全{companies.length}件</div>
          {companies.length === 0 ? (
            <div className="w-full h-80 flex items-center justify-center">
              <div>
                <p className="text-xl mb-10">会社が見つかりませんでした。</p>
                <LinkButton href="/">一覧へ戻る</LinkButton>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:gap-10">
              {companies.map((company) => (
                <CompanySearchItem key={company.id} company={company} />
              ))}
            </div>
          )}
        </div>
      </ContentFrame>
    </div>
  )
}

export default SubsidyPage
