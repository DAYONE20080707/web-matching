"use client"

import Image from "next/image"
import { ItemCardProps } from "@/types"

const TopFeatureItem = ({
  mainTitle,
  subTitle,
  body,
  imageSrc,
}: ItemCardProps) => {
  return (
    <div className="bg-white rounded-xl">
      <figure className=" w-full ">
        <Image
          src={imageSrc || "/no-image.png"}
          alt="特徴の画像"
          width={400}
          height={378}
          priority={false}
          className="rounded-t-xl object-cover w-full"
        />
      </figure>
      <div className=" px-4 py-4">
        <p className=" text-primary text-base">{subTitle}</p>
        <h2 className=" w-auto h-12 md:text-lg font-bold leading-tight mt-2">
          {mainTitle}
        </h2>
        <p className=" text-base leading-160">{body}</p>
      </div>
    </div>
  )
}

export default TopFeatureItem
