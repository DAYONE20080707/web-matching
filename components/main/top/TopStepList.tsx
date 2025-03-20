"use client"

import { ChevronsDown } from "lucide-react"
import TopStepItem from "./TopStepItem"
import ContentHeadline from "@/components/ui/text/ContentHeadline"
import LinkButton from "@/components/ui/button/LinkButton"

const TopStepList = () => {
  return (
    <div id="step" className=" mx-auto py-20">
      <section>
        <ContentHeadline
          mainTitle="不動産売却の流れ"
          body="かんたん! 3ステップで売却"
        />
      </section>

      <section className="w-full mx-auto flex flex-col items-center gap-8">

        <TopStepItem
          image={{ url: "/step-img-1.png" }}
          number="01"
          mainTitle="無料査定申し込み"
          subTitle="1分でカンタン入力"
          body="物件情報を入力するだけで、複数の不動産会社に一括査定依頼！"
          contact={
            <LinkButton href="/contact">お問い合わせはこちら</LinkButton>
          }
        />
        <ChevronsDown className=" w-8 h-8 text-gray-500 " />
        <TopStepItem
          image={{ url: "/step-img-2.png" }}
          number="02"
          mainTitle="無料査定申し込み"
          subTitle="1分でカンタン入力"
          body="物件情報を入力するだけで、複数の不動産会社に一括査定依頼！"
        />
         <ChevronsDown className=" w-8 h-8 text-gray-500 " />
        <TopStepItem
          image={{ url: "/step-img-3.png" }}
          number="03"
          mainTitle="無料査定申し込み"
          subTitle="1分でカンタン入力"
          body="物件情報を入力するだけで、複数の不動産会社に一括査定依頼！"
        />
      </section>
    </div>
  )
}

export default TopStepList
