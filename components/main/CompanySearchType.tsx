import { SUBSIDIES } from "@/lib/utils"
import Link from "next/link"

const CompanySearchType = () => {
  return (
    <section>
      <h3 className="text-primary font-bold mb-5 ">
        <span className="text-xl font-bold ">対応補助金</span>から探す
      </h3>
      <div className="text-center grid md:grid-cols-3 gap-6">
        {SUBSIDIES.map((item) => (
          <div key={item.title} className=" hover:opacity-75">
            <Link href={item.href} className="block bg-white rounded-lg p-6">
              <h4 className="font-extrabold md:text-xl pb-4 mb-4 border-b-2 border-primary">
                {item.title}
              </h4>
              <p className="font-extrabold text-lg text-primary capitalize">
                補助上額額：{item.subtitle}
              </p>
              <p className="h-20 md:text-base text-left mt-4">
                {item.description}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CompanySearchType
