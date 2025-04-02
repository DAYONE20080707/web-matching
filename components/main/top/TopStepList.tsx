"use client";

import Image from "next/image";

import TopStepItem from "./TopStepItem";
import ContentHeadline from "@/components/ui/text/ContentHeadline";

const TopStepList = () => {
  return (
    <div id="step" className="px-3 md:max-w-[1200px] mx-auto py-20">
      <ContentHeadline
        subTitle="ご利用の流れ"
        mainTitle="かんたん! 3ステップで完結！"
      />

      <section className="flex flex-col-reverse md:flex-row justify-center md:justify-start items-center md:space-x-10 mt-10">
        <div className=" md:w-2/5">
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

        <div className="md:col-span-2 mt-12 md:mt-0">
          <Image
            src="/top/step.png"
            alt="ステップ"
            width={600}
            height={492}
            priority={false}
            className="rounded object-cover"
          />
        </div>
      </section>
    </div>
  );
};

export default TopStepList;
