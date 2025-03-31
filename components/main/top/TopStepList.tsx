"use client"

import Image from "next/image"

import TopStepItem from "./TopStepItem"

const TopStepList = () => {
  return (
    <div id="step" className="px-3 max-w-screen-xl mx-auto py-20">
      <section>
        <h2 className="text-primary text-xl mb-3">ご利用の流れ</h2>
        <p className="font-bold text-2xl mb-10">かんたん! 3ステップで完結！</p>
      </section>

      <section className=" flex justify-start items-center md:
      space-x-10">
        <div className=" w-1/3">
          <TopStepItem
            stepNumber="Step 01"
            stepTitle="フォームからお問い合わせ"
            stepSubTitle="1分でカンタン入力"
            stepBody="簡単なご情報をご入力いただくだけで完了です。"
          />

          <TopStepItem
            stepNumber="Step 02"
            stepTitle="コンシェルジュが電話/メールでヒアリング"
            stepSubTitle="ご希望をヒアリング"
            stepBody="お取り組み内容や、ご検討されている補助金をお伺いします。"
          />

          <TopStepItem
            stepNumber="Step 03"
            stepTitle="最適なパートナー（受注企業）をご紹介"
            stepBody="ご要望にマッチした申請のプロをご紹介いたします。"
          />
        </div>

        <div className="col-span-2 mt-12">
          <Image
            src="/step.png"
            alt="ステップ"
            width={600}
            height={492}
            priority={false}
            className="rounded object-cover"
          />
        </div>
      </section>
    </div>
  )
}

export default TopStepList
