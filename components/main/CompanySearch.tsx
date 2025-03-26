"use client"

import Link from "next/link"
import MainFrame from "../ui/frame/MainFrame"
import ContentFrame from "../ui/frame/ContentFrame"
import ContentHeadline from "../ui/text/ContentHeadline"
import { REGIONS } from "./prefectures"

interface CompanySearchProps {
  companyCounts: { prefecture: string | null; count: number }[]
}

const CompanySearch = ({ companyCounts }: CompanySearchProps) => {
  const getCompanyCount = (prefecture: string) => {
    const countObj = companyCounts.find(
      (item) => item.prefecture === prefecture
    )
    return countObj ? `(${countObj.count})` : ""
  }

  return (
    <section className=" mt-20">
      <h3 className="text-primary font-bold mb-5 ">
        <span className="text-xl font-bold ">地域</span>から探す
      </h3>
      <div className=" bg-white p-12 rounded-xl">
        {REGIONS.map((region) => (
          <div key={region.name} className="mb-6">
            <h4 className="font-bold mb-3 ">{region.name}</h4>
            <ul className="md:flex md:items-center md:space-x-3 md:flex-wrap grid grid-cols-4 gap-1">
              {region.prefectures.map((pref, index) => (
                <li key={pref.slug}>
                  <Link
                    href={`/search/${pref.slug}`}
                    className={`block w-20 underline text-blue-500 hover:opacity-70 ${
                      index !== region.prefectures.length - 1 ? "border-r border-gray-500" : ""
                    }`}
                  >
                    {pref.name}
                  </Link>
                  <span className="ml-1">{getCompanyCount(pref.name)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CompanySearch
