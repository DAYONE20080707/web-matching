import Link from "next/link"
import Image from "next/image"

const subsidies = [
  {
    title: "ABC株式会社",
    image: "/top/noImage.png",
    href: "/",
  },
  {
    title: "123株式会社",
    image: "/top/noImage.png",
    href: "/",
  },
  {
    title: "テスト株式会社",
    image: "/top/noImage.png",
    href: "/",
  },
  {
    title: "株式会社仮データ",
    image: "/top/noImage.png",
    href: "/",
  },
]

const CompanySearchResult = () => {
  return (
    <>
      <section>
        <h3 className="text-primary font-bold mb-5 ">
          <span className="text-xl font-bold ">実績</span>から探す
        </h3>
        <div className="text-center grid grid-cols-4 gap-x-12">
          {subsidies.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-lg overflow-hidden"
            >
              <Link href={item.href}>
                <figure className=" flex justify-center">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={200}
                    height={200}
                    className=" block object-cover"
                  />
                </figure>
                <h4>{item.title}</h4>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default CompanySearchResult
