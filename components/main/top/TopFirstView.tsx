// "use client"

import MainFrame from "@/components/ui/frame/MainFrame"
import Image from "next/image"

const TopFirstView = () => {
  return (
    <article>
      <section className="relative w-full h-[640px]  mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* 背景画像（最背面） */}
        <figure className="absolute w-full h-full z-[-1] md:top-0 left-0">
          {/* SP用画像 */}
          <div className="block md:hidden h-full w-full relative">
            <Image
              src="/top/top-kv-sp.jpg"
              alt="キービジュアル"
              fill
              className="object-cover object-[75%_top]"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* PC用画像 */}
          <div className="hidden md:block h-full w-full relative">
            <Image
              src="/top/top-kv-01.jpg"
              alt="キービジュアル"
              fill
              className="object-cover object-top"
              sizes="100vw"
              priority
            />
          </div>
        </figure>

        {/* テキストブロック */}
        <div className="w-11/12  md:w-[1200px] mx-auto text-white md:text-black space-y-3 py-5 mt-20 z-0">
          <p className=" text-base md:text-lg">最短当日から相談可能！</p>

          <h1 className=" text-xl md:text-4xl font-semibold md:leading-160">
            補助金申請のプロに出会える! <br />
            ビジネスマッチングサービス
          </h1>

          <div>
            <p className="text-basa md:text-xl leading-200 md:leading-[200%]">
              累計
              <strong className="font-bold border-yellow-500 border-solid border-b-4">
                30万件
              </strong>
              のマッチング実績
              <strong className="font-bold border-yellow-500 border-solid border-b-4">
                2500社
              </strong>
              の優良パートナー企業の中から
              <br className=" hidden md:block" />
              ご希望に合わせて 最短
              <strong className="font-bold border-yellow-500 border-solid border-b-4">
                翌日
              </strong>
              に、最適なプロをご紹介します。
            </p>
          </div>
          <div className=" flex justify-start space-x-8 pt-4">
            <p className="bg-orange-400 w-32 h-32 flex flex-col items-center justify-center text-center text-base font-bold rounded-full border-2 border-white border-solid ">
              <span className="block text-lg">利用料</span>
              <span className="block text-3xl">0円</span>
            </p>
            <p className="bg-orange-400 w-32 h-32 flex flex-col items-center justify-center text-center text-base font-bold rounded-full border-2 border-white border-solid ">
              <span className="block text-lg">採択率</span>
              <span className="block text-2xl">30%UP</span>
            </p>
            <p className="bg-orange-400 w-32 h-32 flex flex-col items-center justify-center text-center text-base font-bold rounded-full border-2 border-white border-solid ">
              依頼<br />しなくても<br />OK!
            </p>
          </div>
        </div>
      </section>
    </article>
  )
}

export default TopFirstView
