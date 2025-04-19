"use client";

import { Company } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CompanySearchItemProps {
  company: Company;
}

const CompanySearchItem = ({ company }: CompanySearchItemProps) => {
  const truncateContent = (content: string | null, maxLength: number) => {
    if (!content) return "";
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + "...";
  };

  return (
    <div className="">
      <div className="p-5 md:p-10 rounded bg-white hover:opacity-80 h-full">
        <Link href={`/company/${company.id}`}>
          <div className="flex md:flex-row md:justify-start gap-4 md:gap-x-8 items-start">
            <Image
              src={company.companyLogoUrl || "/top/noImage.png"}
              alt="logo"
              className="hidden md:block rounded w-full max-w-[80px] md:max-w-[150px] object-contain"
              width={150}
              height={150}
              priority={true}
            />

            <div className="w-full">
              <div className="flex justify-start gap-4 md:gap-x-8 items-start">
                <Image
                  src={company.companyLogoUrl || "/top/noImage.png"}
                  alt="logo"
                  className="md:hidden rounded w-full max-w-[80px] md:max-w-[150px] object-contain"
                  width={150}
                  height={150}
                  priority={true}
                />
                <div>
                  <h2 className="text-base md:text-xl font-medium mb-2">
                    {company.companyName}
                  </h2>
                  <div className="text-sm md:text-base font-light text-normal line-clamp-2 md:line-clamp-3">
                    {truncateContent(company.companyPr, 100)}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-xs text-[#5f5f5f] space-y-2 mt-6">
                  <div className="flex items-start space-x-1">
                    <div className="w-[12px] mt-[2px]">
                      <Image
                        src="/icons/pin.png"
                        alt="住所"
                        width={20}
                        height={20}
                      />
                    </div>
                    <div>
                      {company.companyPrefecture}
                      {company.companyCity}
                      {company.companyAddress}
                    </div>
                  </div>
                  <div className="flex items-start space-x-1">
                    <div className="w-[12px] mt-[2px]">
                      <Image
                        src="/icons/industry.png"
                        alt="URL"
                        width={20}
                        height={20}
                      />
                    </div>
                    <div>
                      {company.companySiteUrl && (
                        <span className="break-all line-clamp-2">
                          {company.companySiteUrl}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-[#5f5f5f] space-y-2 mt-6">
                  <div className="flex items-center space-x-1">
                    <div className="w-[12px]">
                      <Image
                        src="/icons/genre.png"
                        alt="自社の特徴"
                        width={20}
                        height={20}
                      />
                    </div>
                    <div>自社の特徴</div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(company.companyFeature?.split(",") || []).map(
                      (feature, index) => (
                        <span
                          key={index}
                          className="text-xs md:text-sm bg-primary text-white px-2 py-1"
                        >
                          {feature.trim()}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CompanySearchItem;
