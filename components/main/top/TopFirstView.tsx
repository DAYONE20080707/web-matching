"use client"

import Image from "next/image"

const TopFirstView = () => {
  return (
    <article className=" pb-20">
      <section className="px-3 max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className=" space-y-3 py-5">
          <p className=" text-xl">最短当日から相談可能！</p>

          <h1 className="text-5xl font-semibold md:leading-140">
            最適なコンサルタントに出会える! <br />
            ビジネスマッチングサービス
          </h1>

          <p className=" text-xl md:leading-[200%]">
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
            希望に合わせて 最短
            <strong className=" font-bold border-yellow-500 border-solid border-b-4">
              翌日
            </strong>
            に、最適な補助金コンサルタントをご紹介します。
          </p>
        </div>
        <figure>
          <Image
            src="/top-kv.png"
            alt="top"
            width={500}
            height={457}
            priority={true}
          />
        </figure>
      </section>
    </article>
  )
}

export default TopFirstView
