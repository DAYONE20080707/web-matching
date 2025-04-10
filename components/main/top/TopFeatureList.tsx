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
            subTitle="Feature"
            mainTitle="「依頼先選び」の面倒な手間が省けます!!"
          />
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
          <TopFeatureItem
            subTitle="Feature 01"
            mainTitle="複数社の査定額を一括比較"
            imageSrc="/top/top-feature-01.jpg"
            body="仮のテキスト仮のテキスト仮のテキスト仮のテキスト仮のテキスト"
          />
          <TopFeatureItem
            subTitle="Feature 02"
            mainTitle="複数社の査定額を一括比較"
            imageSrc="/top/top-feature-01.jpg"
            body="仮のテキスト仮のテキスト仮のテキスト仮のテキスト仮のテキスト"
          />
          <TopFeatureItem
            subTitle="Feature 03"
            mainTitle="全国の制作会社の情報を収集。地域や強みなど、様々な切り口で制作会社を探せる！"
            imageSrc="/top/top-feature-01.jpg"
            body="仮のテキスト仮のテキスト仮のテキスト仮のテキスト仮のテキスト"
          />
        </div>
      </section>
    </ContentFrame>
  )
}

export default TopFeatureList
