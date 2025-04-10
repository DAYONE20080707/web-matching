import Image from "next/image"
import ContentFrame from "@/components/ui/frame/ContentFrame"
import ContentHeadline from "@/components/ui/text/ContentHeadline"
import LinkButton from "@/components/ui/button/LinkButton"

const TopAbout = () => {
  return (
    <>
      <ContentFrame>
        <section className="flex flex-col md:flex-row md:justify-between gap-8">
          <figure>
            <Image
              src="/top/top-about.jpg"
              alt="aboutのイメージ画像"
              width={560}
              height={492}
            />
          </figure>
          <div className="md:w-[520px]">
            <ContentHeadline
              subTitle="About"
              mainTitle="補助金naviがコンサルティング会社への発注を無料で徹底支援！"
            />
            <p className=" text-base md:leading-200 my-10">
              補助金naviは、補助金申請を支援する専門コンサルタントを無料でご紹介する、日本最大級のマッチングサービスです。
              <br />
              <br />
              「どの制度が使えるのかわからない」「誰に相談すればいいの？」そんなお悩みはありませんか？
              補助金naviでは、実績豊富な複数のコンサル会社に一括で見積もり依頼が可能です。
              <br />
              費用だけでなく、対応スピードや得意分野、過去の採択実績などを比較して、最適なパートナーを選べます。
              <br />
              専任のアドバイザーが課題を丁寧にヒアリングし、申請準備からコンサル選びまでしっかりサポートします。
              <br />
              <br />
              ご利用はすべて<strong>完全無料</strong>
              ですので、まずはお気軽にご相談ください。
            </p>

            <LinkButton href="/">今すぐ相談する！（無料）</LinkButton>
          </div>
        </section>
      </ContentFrame>
    </>
  )
}

export default TopAbout
