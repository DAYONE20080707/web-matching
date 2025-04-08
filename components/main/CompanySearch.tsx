"use client";

import Link from "next/link";
import { REGIONS } from "./prefectures";

interface CompanySearchProps {
  companyCounts: { prefecture: string | null; count: number }[];
}

const CompanySearch = ({ companyCounts }: CompanySearchProps) => {
  const getCompanyCount = (prefecture: string) => {
    const countObj = companyCounts.find(
      (item) => item.prefecture === prefecture
    );
    return countObj ? `(${countObj.count})` : "";
  };

  return (
    <section className=" mt-20">
      <h3 className="text-primary font-bold mb-5 ">
        <span className="text-xl font-bold ">地域</span>から探す
      </h3>
      <div className=" bg-white py-6 px-4 md:px-12 rounded-xl">
        {REGIONS.map((region) => (
          <div key={region.name} className="mb-5">
            <h4 className="text-primary text-sm font-bold mb-1 ">
              {region.name}
            </h4>
            <ul className="md:flex md:items-center md:space-x-3 flex flex-wrap gap-x-1 gap-y-2 mt-1">
              {region.prefectures.map((pref, index) => (
                <li key={pref.slug} className="ml-1 md:ml-0">
                  <Link
                    href={`/search/${pref.slug}`}
                    className={`block pr-2 md:pr-4 text-sm text-[#393939] hover:opacity-70 ${
                      index !== region.prefectures.length - 1
                        ? "border-r border-primary"
                        : ""
                    }`}
                  >
                    {pref.name}
                  </Link>
                  <span className="md:ml-1">{getCompanyCount(pref.name)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompanySearch;
