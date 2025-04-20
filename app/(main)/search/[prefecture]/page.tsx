import { getCompaniesByPrefecture } from "@/actions/company";
import CompanySearchItem from "@/components/main/CompanySearchItem";
import { prefectureMapping } from "@/lib/utils";
import ContentFrame from "@/components/ui/frame/ContentFrame";
import LinkButton from "@/components/ui/button/LinkButton";
import Image from "next/image";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ContentHeadline from "@/components/ui/text/ContentHeadline";

interface SearchPageProps {
  params: {
    prefecture: string;
  };
}

const SearchPage = async ({ params }: SearchPageProps) => {
  const { prefecture } = params;

  const companies = await getCompaniesByPrefecture({ prefecture });

  const prefectureKanji = prefectureMapping[prefecture];

  return (
    <div className="bg-secondary pt-12">
      <ContentFrame>
        <Breadcrumb items={[{ title: `${prefectureKanji}の会社の一覧` }]} />
        <div className="mt-10">
          <ContentHeadline
            subTitle="Companies"
            mainTitle={`${prefectureKanji}の会社の一覧`}
          />
          <div className="my-5">全{companies.length}件</div>
          {companies.length === 0 ? (
            <div className="w-full h-80 flex items-center justify-center">
              <div>
                <p className="text-xl mb-10">
                  会社が見つかりませんでした。
                </p>
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
  );
};

export default SearchPage;
