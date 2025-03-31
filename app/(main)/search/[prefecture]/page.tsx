import { getCompaniesByPrefecture } from "@/actions/company"
import CompanySearchItem from "@/components/main/CompanySearchItem"
import { prefectureMapping } from "@/lib/utils"
import LinkButton from "@/components/ui/button/LinkButton"

interface SearchPageProps {
  params: {
    prefecture: string
  }
}

const SearchPage = async ({ params }: SearchPageProps) => {
  const { prefecture } = params

  const companies = await getCompaniesByPrefecture({ prefecture })

  const prefectureKanji = prefectureMapping[prefecture]

  return (
    <div className="px-3 max-w-screen-lg mx-auto mt-10">
      <div className="flex items-end space-x-3 mb-10">
        <div className="text-xl font-bold">
          {prefectureKanji}の制作会社の一覧
        </div>
        <div>{companies.length}件</div>
      </div>

      {companies.length === 0 ? (
        <div className=" w-full h-80 flex items-center justify-center">
          <div>
            <p className=" text-xl mb-10">制作会社が見つかりませんでした。</p>
            <LinkButton href="/">一覧へ戻る</LinkButton>
          </div>
        </div>
      ) : (
        companies.map((company) => (
          <CompanySearchItem key={company.id} company={company} />
        ))
      )}
    </div>
  )
}

export default SearchPage
