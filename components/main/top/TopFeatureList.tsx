"use client"

import ContentFrame from "@/components/ui/frame/ContentFrame"
import ContentHeadline from "@/components/ui/text/ContentHeadline"
import TopFeatureItem from "./TopFeatureItem"

const TopFeatureList = () => {
  return (
    <ContentFrame>
      <section>
        <div className=" text-center">
          <ContentHeadline
            // subTitle="Feature"
            mainTitle="「依頼先選び」の面倒な手間が省けます!!"
          />
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
          <TopFeatureItem
            subTitle="Feature 01"
            mainTitle="一度の入力で、複数の専門家をご紹介"
            imageSrc="/top/top-feature-01.jpg"
            body="条件に合った専門家を無料で一括ピックアップ。自分で何社も調べて問い合わせる手間が省け、スムーズに比較検討できます。"
          />
          <TopFeatureItem
            subTitle="Feature 02"
            mainTitle="信頼できる“実績あるプロ”だけを厳選"
            imageSrc="/top/top-feature-02.jpg"
            body="ご紹介するのは、補助金申請の実績や専門分野が明確な登録パートナーのみ。初めてでも安心してご相談いただけます。"
          />
          <TopFeatureItem
            subTitle="Feature 03"
            mainTitle="マッチング後のやりとりもスムーズ"
            imageSrc="/top/top-feature-03.jpg"
            body="紹介された中から気になる専門家とすぐ連絡可能。やりとりはスピーディー＆効率的だから、申請準備もぐっと楽になります。"
          />
        </div>
      </section>
    </ContentFrame>
  )
}

export default TopFeatureList
