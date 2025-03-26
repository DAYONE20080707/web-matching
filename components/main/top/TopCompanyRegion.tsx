"use client"

import Link from "next/link"
import MainFrame from "../../ui/frame/MainFrame"
import ContentFrame from "../../ui/frame/ContentFrame"
import ContentHeadline from "../../ui/text/ContentHeadline"
import { REGIONS } from "../prefectures"

interface CompanySearchProps {
  companyCounts: { prefecture: string | null; count: number }[]
}

const TopCompanyRegion = ({ companyCounts }: CompanySearchProps) => {
  const getCompanyCount = (prefecture: string) => {
    const countObj = companyCounts.find(
      (item) => item.prefecture === prefecture
    )
    return countObj ? `(${countObj.count})` : ""
  }

  return (
    <MainFrame>
      <ContentFrame>
        <div className=" text-center">
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

        <section className=" mt-20">
          <h3 className="text-primary font-bold mb-5 ">
            <span className="text-xl font-bold ">地域</span>から制作会社を探す
          </h3>
          <div className=" bg-white p-10 rounded-xl">
            {REGIONS.map((region) => (
              <div key={region.name} className="mb-6">
                <div className="mb-3 font-bold">{region.name}</div>
                <div className="md:flex md:items-center md:space-x-3 md:flex-wrap grid grid-cols-4 gap-1">
                  {region.prefectures.map((pref) => (
                    <div key={pref.slug}>
                      <Link
                        href={`/search/${pref.slug}`}
                        className="underline text-blue-500"
                      >
                        {pref.name}
                      </Link>
                      <span className="ml-1">{getCompanyCount(pref.name)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </ContentFrame>
    </MainFrame>
  )
}

export default TopCompanyRegion
