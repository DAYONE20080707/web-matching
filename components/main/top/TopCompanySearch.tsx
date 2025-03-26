"use client"

import CompanySearch from "../CompanySearch"
import MainFrame from "../../ui/frame/MainFrame"
import ContentFrame from "../../ui/frame/ContentFrame"
import ContentHeadline from "../../ui/text/ContentHeadline"

interface CompanySearchProps {
  companyCounts: { prefecture: string | null; count: number }[]
}

const TopCompanySearch = ({ companyCounts }: CompanySearchProps) => {
  return (
    <MainFrame>
      <ContentFrame>
        <div className="text-center">
          <ContentHeadline
            subTitle="Search"
            mainTitle={
              <>
                <span>幅広い企業ネットワークから</span>
                <br />
                <span>貴社に最適なパートナー企業を無料でご提案します</span>
              </>
            }
          />
        </div>

        <section className="mt-20">
          <CompanySearch companyCounts={companyCounts} />
        </section>
      </ContentFrame>
    </MainFrame>
  )
}

export default TopCompanySearch
