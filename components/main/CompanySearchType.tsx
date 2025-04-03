import Link from "next/link";

const subsidies = [
  {
    subtitle: "restructuring",
    title: "事業再構築補助金",
    description:
      "事業再構築補助金とは仮のテキスト仮のテキスト仮のテキスト仮のテキスト",
    href: "/",
  },
  {
    subtitle: "manufacturing",
    title: "ものづくり補助金",
    description:
      "ものづくり補助金とは仮のテキスト仮のテキスト仮のテキスト仮のテキスト",
    href: "/",
  },
  {
    subtitle: "IT introduction",
    title: "IT導入補助金",
    description:
      "IT導入補助金とは仮のテキスト仮のテキスト仮のテキスト仮のテキスト",
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
            <div key={item.title}>
              <Link href={item.href} className="block bg-white rounded-lg p-6">
                <p className="font-extrabold text-xl text-primary capitalize">
                  {item.subtitle}
                </p>
                <h4 className="font-extrabold text-base pb-4 border-b-2 border-primary">
                  {item.title}
                </h4>
                <p className="mt-4 text-left">{item.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default CompanySearchType;
