"use client"
import Image from "next/image"
import { ItemCardProps } from "@/types"


interface StepCardProps extends ItemCardProps {
  contact?: React.ReactNode // `contact` を必須にする
}

const TopStepItem: React.FC<StepCardProps> = ({
  number,
  mainTitle,
  subTitle,
  body,
  image,
  contact,
}) => {
  return (
    <div className="w-8/12 bg-[#F7F5F3] flex justify-start py-8 px-10 rounded-2xl">
      <figure>
        <Image
          src={image?.url || "/no-image.png"}
          width={400}
          height={300}
          alt={mainTitle}
        />
      </figure>
      <div>
        <p className="border-b">
          step <span className="text-xl">{number}</span>
        </p>
        <h3 className="font-bold text-xl mb-2">{mainTitle}</h3>
        <h4 className="text-gray-500 text-base mb-2">{subTitle}</h4>
        <p className="text-gray-700 text-base">{body}</p>

        <div className="mt-4">{contact}</div>
      </div>
    </div>
  )
}

export default TopStepItem
