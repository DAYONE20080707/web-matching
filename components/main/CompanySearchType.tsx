import Link from "next/link"

const subsidies = [
  {
    title: "事業再構築補助金",
    description:
      "事業再構築補助金とは仮のテキスト仮のテキスト仮のテキスト仮のテキスト",
    href: "/",
  },
  {
    title: "ものづくり補助金",
    description:
      "ものづくり補助金とは仮のテキスト仮のテキスト仮のテキスト仮のテキスト",
    href: "/",
  },
  {
    title: "IT導入補助金",
    description:
      "IT導入補助金とは仮のテキスト仮のテキスト仮のテキスト仮のテキスト",
    href: "/",
  },
]

const CompanySearchType = () => {
  return (
    <>
      <section>
        <h3 className="text-primary font-bold mb-5 ">
          <span className="text-xl font-bold ">目的</span>から探す
        </h3>
        <div className="text-center grid grid-cols-3 gap-x-20">
          {subsidies.map((item) => (
            <div key={item.title} className="bg-white rounded-lg">
              <Link href={item.href}>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default CompanySearchType
