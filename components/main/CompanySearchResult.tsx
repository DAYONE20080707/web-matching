"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getCompaniesByPickUp } from "@/actions/company"
import type { Company, CompanyImage } from "@prisma/client"

type CompanyWithImages = Company & {
  images: CompanyImage[]
}

const CompanySearchResult = () => {
  const [companies, setCompanies] = useState<CompanyWithImages[]>([])

  useEffect(() => {
    const fetchCompanies = async () => {
      const companies = await getCompaniesByPickUp()
      setCompanies(companies)
    }

    fetchCompanies()
  }, [])

  return (
    <>
      <section>
        <h3 className="text-primary font-bold mb-5 ">
          <span className="text-xl font-bold ">おすすめ</span>から探す
        </h3>
        <div className="text-center grid md:grid-cols-3 gap-6">
          {companies.map((item) => (
            <div key={item.id}>
              <Link
                href={`/company/${item.id}`}
                className="bg-white rounded-lg overflow-hidden block p-6 h-full"
              >
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="relative">
                      <div className="aspect-[16/9] relative overflow-hidden">
                        <Image
                          fill
                          src={
                            item.images.length
                              ? item.images[0].url
                              : "/noThumbnail.png"
                          }
                          alt={item.companyName}
                          className="object-cover"
                        />
                      </div>

                      {item.companyLogoUrl && (
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                          <Image
                            src={item.companyLogoUrl}
                            alt={`${item.companyName}のロゴ`}
                            width={80}
                            height={80}
                            className="object-contain"
                          />
                        </div>
                      )}
                    </div>
                    <h4 className="mt-9 text-base font-extrabold">
                      {item.companyName}
                    </h4>
                  </div>

                  <div className="mt-4 flex items-center">
                    <Image
                      src="/top/pin.png"
                      alt="location pin"
                      width={12}
                      height={14}
                      className="mr-1"
                    />
                    <p className="text-xs text-[#5F5F5F]">
                      {item.companyPrefecture}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default CompanySearchResult
