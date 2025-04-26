"use client"

import LinkButton from "@/components/ui/button/LinkButton"

const Thanks = () => {
  return (
    <>
      <div className="flex flex-col items-center pb-8 md:pb-[134px] pt-10 md:pt-10">
        <h2 className="text-xl md:text-[28px] tracking-wider mt-[37px] md:mt-[31px] ![line-height:160%]">
          一括申し込みが完了しました
        </h2>
        <p className="text-base md:text-lg text-center ![line-height:200%] mt-10 whitespace-pre-line">
          補助金のプロから順次、連絡が入ります。
          <br />
          ご登録のメールアドレスよりご確認ください。
        </p>
        <div className="w-full mt-8 md:mt-16 flex justify-center">
          <LinkButton
            href="/"
            className="mx-0 flex justify-center items-center"
          >
            トップに戻る
          </LinkButton>
        </div>
      </div>
    </>
  )
}

export default Thanks
