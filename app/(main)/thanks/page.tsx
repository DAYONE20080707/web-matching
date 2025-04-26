import type { Metadata } from "next"
import ContentFrame from "@/components/ui/frame/ContentFrame"
import Thanks from "@/components/main/thanks/Thanks"
import Breadcrumb from "@/components/ui/Breadcrumb"
import ContentHeadline from "@/components/ui/text/ContentHeadline"

export const metadata: Metadata = {
  title: "一括申し込み完了",
  description:
    "一括申し込みが完了しました。補助金のプロから順次、連絡が入ります。",
}

const ThanksPage = () => {
  return (
    <>
      <div className="pt-12">
        <ContentFrame>
          <Breadcrumb items={[{ title: "無料相談" }]} />
          <div className="mt-10">
            <ContentHeadline subTitle="無料相談" mainTitle="一括申し込み完了" />
            <Thanks />
          </div>
        </ContentFrame>
      </div>
    </>
  )
}

export default ThanksPage
