import Link from "next/link";

const subsidies = [
  {
    subtitle: "4,000万円",
    title: "ものづくり補助金",
    description:
      "革新的な製品・サービスの開発や設備投資を支援。幅広い業種が対象で、生産性向上を目指す企業におすすめです。",
    href: "/",
  },
  {
    subtitle: "9,000万円",
    title: "新事業進出補助金（新設）",
    description:
      "新たな事業への参入を支援。設備投資やシステム開発、建物費など幅広い用途で活用できます。",
    href: "/",
  },
  {
    subtitle: "5億円",
    title: "中小企業成長加速化補助金（新設）",
    description:
      "売上高100億円超を目指す、成長志向の中小企業向け。大型設備投資や先進的な取り組みに対応します。",
    href: "/",
  },
  {
    subtitle: "1億円",
    title: "中小企業省力化投資補助金",
    description:
      "人手不足対策や業務効率化のための、省力化・自動化設備の導入を支援します。",
    href: "/",
  },
  {
    subtitle: "450万円",
    title: "IT導入補助金",
    description:
      "業務の効率化やDX推進を目的としたITツールやシステム導入を支援。中小企業のデジタル化を後押しします。",
    href: "/",
  },
  {
    subtitle: "250万円",
    title: "小規模事業者持続化補助金",
    description:
      "販路開拓や集客強化など、経営計画に基づく取り組みを支援。小規模事業者の成長をサポートします。",
    href: "/",
  },
  {
    subtitle: "3億円",
    title: "Go-Tech事業",
    description:
      "中小企業による高度な技術開発や製品・プロセスの高度化に向けた取り組みを支援する大型補助金です。",
    href: "/",
  },
  {
    subtitle: "2,000万円",
    title: "事業承継・M&A補助金",
    description:
      "事業承継やM&Aに関わる経費を支援。後継者不足や事業継続の課題解決に貢献します。",
    href: "/",
  },

];

const CompanySearchType = () => {
  return (
    <>
      <section>
        <h3 className="text-primary font-bold mb-5 ">
          <span className="text-xl font-bold ">目的</span>から探す
        </h3>
        <div className="text-center grid md:grid-cols-3 gap-6">
          {subsidies.map((item) => (
            <div key={item.title} className=" hover:opacity-75">
              <Link href={item.href} className="block bg-white rounded-lg p-6">

                <h4 className="font-extrabold md:text-xl pb-4 mb-4 border-b-2 border-primary">
                  {item.title}
                </h4>
                <p className="font-extrabold text-lg text-primary capitalize">
                  補助上額額：{item.subtitle}
                </p>
                <p className=" h-20 md:text-base text-left mt-4">{item.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default CompanySearchType;
