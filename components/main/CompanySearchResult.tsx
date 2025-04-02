import Link from "next/link";
import Image from "next/image";

const subsidies = [
  {
    type: "制作会社",
    title: "ABC株式会社",
    image: "/top/case-bg.jpg",
    logoImage: "/top/case-logo.jpg",
    href: "/",
    pref: "東京都",
    tags: [
      "パッケージデザイン",
      "ブランディング",
      "ロゴデザイン",
      "Webデザイン",
    ],
  },
  {
    type: "制作会社",
    title: "123株式会社",
    image: "/top/case-bg.jpg",
    logoImage: "/top/case-logo.jpg",
    href: "/",
    pref: "東京都",
    tags: ["ブランディング", "商品開発", "マーケティング"],
  },
  {
    type: "制作会社",
    title: "テスト株式会社",
    image: "/top/case-bg.jpg",
    logoImage: "/top/case-logo.jpg",
    href: "/",
    pref: "東京都",
    tags: ["パッケージデザイン", "商品企画", "販促物制作"],
  },
];

const CompanySearchResult = () => {
  return (
    <>
      <section>
        <h3 className="text-primary font-bold mb-5 ">
          <span className="text-xl font-bold ">実績</span>から探す
        </h3>
        <div className="text-center grid md:grid-cols-3 gap-6">
          {subsidies.map((item) => (
            <div key={item.title}>
              <Link
                href={item.href}
                className="bg-white rounded-lg overflow-hidden block p-6 h-full"
              >
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="relative">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={336}
                        height={180}
                        className="w-full block object-cover"
                      />
                      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                        <Image
                          src={item.logoImage}
                          alt={`${item.title}のロゴ`}
                          width={80}
                          height={80}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <p className="mt-9 text-xs text-[#5F5F5F]">{item.type}</p>
                    <h4 className="mt-1 text-base font-extrabold pb-4 border-b-2 border-primary">
                      {item.title}
                    </h4>

                    <div className="flex flex-wrap mt-4">
                      {item.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs px-1 flex items-center gap-[1px]"
                        >
                          <span className="text-primary font-extrabold text-lg">
                            ＃
                          </span>
                          <span className="text-[#393939]">{tag}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center">
                    <Image
                      src="/top/pin.png"
                      alt="location pin"
                      width={12}
                      height={14}
                      className="mr-1"
                    />
                    <p className="text-xs text-[#5F5F5F]">{item.pref}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default CompanySearchResult;
