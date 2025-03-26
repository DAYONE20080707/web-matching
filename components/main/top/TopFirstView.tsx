// "use client"

import MainFrame from "@/components/ui/frame/MainFrame"
import Image from "next/image"

const TopFirstView = () => {
  return (
    <MainFrame>
      <section className="relative w-full h-[100dvh] mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* 背景画像（最背面） */}
        <figure className="absolute top-0 left-0 w-full h-full z-[-1]">
          <Image
            src="/top-kv.jpg"
            alt="top"
            fill
            className=" object-cover"
            priority
          />
        </figure>

        {/* テキストブロック */}
        <div className="w-11/12  md:max-w-screen-xl mx-auto space-y-3 py-5 -mt-20 z-0">
          <p className="text-xl">最短当日から相談可能！</p>

          <h1 className="text-5xl font-semibold md:leading-140">
            補助金申請のプロに出会える! <br />
            ビジネスマッチングサービス
          </h1>

          <div>
            <p className="text-xl md:leading-[200%]">
              累計
              <strong className="font-bold border-yellow-500 border-solid border-b-4">
                30万件
              </strong>
              のマッチング実績
              <strong className="font-bold border-yellow-500 border-solid border-b-4">
                2500社
              </strong>
              の優良パートナー企業の中から
              <br />
              ご希望に合わせて 最短
              <strong className="font-bold border-yellow-500 border-solid border-b-4">
                翌日
              </strong>
              に、最適なプロをご紹介します。
            </p>
          </div>
          <div className=" flex justify-start space-x-8 pt-12">
            <p className="bg-secondary w-32 h-32 flex flex-col items-center justify-center text-center text-base font-bold rounded-full">
              <span className="block">利用料</span>
              <span className="block text-2xl">0円</span>
            </p>
            <p className="bg-secondary w-32 h-32 flex flex-col items-center justify-center text-center text-base font-bold rounded-full">
              <span className="block">利用料</span>
              <span className="block text-2xl">0円</span>
            </p>
            <p className="bg-secondary w-32 h-32 flex flex-col items-center justify-center text-center text-base font-bold rounded-full">
              <span className="block">利用料</span>
              <span className="block text-2xl">0円</span>
            </p>
          </div>
        </div>
      </section>
    </MainFrame>
  )
}

export default TopFirstView
