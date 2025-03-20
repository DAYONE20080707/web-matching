"use client"

import Image from 'next/image'

import TopStepItem from './TopStepCard'

const TopStepList = () => {


  return (
    <div id="step" className="px-3 max-w-screen-xl mx-auto py-20">
      <section>
        <h2 className="text-primary text-xl mb-3">不動産売却の流れ</h2>
        <p className="font-bold text-2xl mb-10">かんたん! 3ステップで売却</p>
      </section>

      <section className="grid sm:grid-cols-3 gap-10">
        <div>
          <div className="step">
            <TopStepItem
              stepNumber="Step 01"
              stepTitle="無料査定申し込み"
              stepSubTitle="1分でカンタン入力"
              stepBody="物件情報を入力するだけで、複数の不動産会社に一括査定依頼！"
            />
          </div>
          <div className="step">
            <TopStepItem
              stepNumber="Step 02"
              stepTitle="査定のご案内"
              stepSubTitle="各社の査定額を比較"
              stepBody="査定結果を確認し、条件の良い会社を選べます。"
            />
          </div>
          <div className="step">
            <TopStepItem
              stepNumber="Step 03"
              stepTitle="売却先を決める"
              stepSubTitle="最適な不動産会社を選択"
              stepBody="納得のいく会社と契約し、スムーズに売却完了！"
            />
          </div>
        </div>

        <div className="col-span-2 mt-12">
          <Image
            src="/step.png"
            alt="ステップ"
            width={832}
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
