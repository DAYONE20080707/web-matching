"use client"

import TopReasonItem from "./TopReasonItem"

const TopReasonList = () => {
  return (
    <div className="px-3 max-w-screen-xl mx-auto py-20">
      <div className="text-primary text-xl mb-3">
        「カイトルONE」が選ばれる理由
      </div>
      <div className="font-bold text-2xl mb-10">
        ワンルームマンションの売却を
        <br />
        簡単・高額にする仕組みがあります
      </div>

      <TopReasonItem
        title="複数社の査定額を一括比較"
        highlights={["どこに査定を依頼すればいいかわからない", "できるだけ高く売りたい"]}
        description={`カイトルONEなら、1回の入力で複数の不動産会社に査定依頼可能。`}
        detail="通常、査定を依頼するには複数の不動産会社へ個別に問い合わせが必要ですが、「カイトルONE」なら1回の申し込みで完了。各社の査定額を比較し、納得のいく条件で売却が可能です。"
        imageSrc="/reason/reason1.png"
      />
      <TopReasonItem
        title="投資用ワンルームの売却に強い"
        highlights={["賃貸中の物件も売れるの？", "売却価格を最大化したい"]}
        description="投資用物件を扱う不動産会社が多数登録。"
        detail="ワンルームマンション専門の買取業者や投資家向け不動産会社が多数登録しているため、賃貸中の物件でも売却可能。需要の高い業者同士が競争することで、より高額での売却が期待できます。"
        imageSrc="/reason/reason2.png"
      />
      <TopReasonItem
        title="売却までの手間を大幅カット"
        highlights={["売却の流れがわからない", "とにかくスムーズに売却したい"]}
        description="査定から売却まで、すべての手続きをサポート。"
        detail="初めての売却でも安心できるよう、査定結果の比較方法から売却完了までをフルサポート。各社とのやり取りもスムーズに進められるようサポートし、最短で売却まで導きます。"
        imageSrc="/reason/reason3.png"
      />
    </div>
  )
}

export default TopReasonList
