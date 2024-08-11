import { getCompaniesByPrefecture } from "@/actions/company"
import CompanySearchItem from "@/components/main/CompanySearchItem"
import { prefectureMapping } from "@/lib/utils"

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
        <div>制作会社が見つかりませんでした</div>
      ) : (
        companies.map((company) => (
          <CompanySearchItem key={company.id} company={company} />
        ))
      )}
    </div>
  )
}

export default SearchPage
