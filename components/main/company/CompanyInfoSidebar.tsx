"use client";

import { Company } from "@prisma/client";
import Image from "next/image";

interface CompanyInfoSidebarProps {
  company: Company;
  address: string;
}

const CompanyInfoSidebar = ({ company, address }: CompanyInfoSidebarProps) => {
  return (
    <div className="md:col-span-3 bg-white rounded p-6 h-fit">
      <div className="flex justify-center">
        <Image
          src={company.companyLogoUrl || "/top/noImage.png"}
          alt="logo"
          className="rounded w-full aspect-[252/181] object-contain"
          width={252}
          height={181}
          priority={true}
        />
      </div>
      <div className="mt-6 space-y-6">
        <div className="pb-6 border-b border-[#EFEFEF]">
          <div className="text-xl font-medium">{company.companyName}</div>
          <div className="mt-2 text-base font-light">
            {company.companyBusiness}
          </div>
        </div>
        <div className="pb-6 border-b border-[#EFEFEF]">
          <div className="text-primary font-extrabold text-lg">
            ホームページURL
          </div>
          <div className="mt-2 text-base font-light">{company.companySiteUrl}</div>
          <div className="mt-6">
            <div className="text-primary font-extrabold text-lg">所在地</div>
            <div className="mt-2 text-base font-light">{company.companyPostCode}</div>
            <div className="text-base font-light">{address}</div>
          </div>
        </div>
        <div>
          <div className="text-primary font-extrabold text-lg">自社の特徴</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {(company.companyFeature?.split(",") || []).map((feature, index) => (
              <span
                key={index}
                className="text-sm bg-primary text-white px-2 py-1"
              >
                {feature.trim()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoSidebar;