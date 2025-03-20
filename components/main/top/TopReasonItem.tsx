"use client"

import Image from "next/image"

interface TopeasonProps {
  title: string
  highlights: string[]
  description: string
  detail: string
  imageSrc: string
}

const TopReasonItem = ({
  title,
  highlights,
  description,
  detail,
  imageSrc,
}: TopeasonProps) => {
  return (
    <div className="bg-white rounded-lg p-3 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
      <div>
        <div className="font-bold mb-10 text-lg">{title}</div>
        <div className="bg-[#FFEA00] relative mb-10 rounded-lg">
          <div className="absolute -top-4 left-2 md:-top-8 md:left-5">
            <Image
              src="/reason/reasonCharacter.svg"
              alt="character"
              width={111}
              height={123}
              priority={false}
            />
          </div>
          <div className="font-bold py-6 ml-28 md:ml-36 text-sm">
            {highlights.map((highlight, index) => (
              <div key={index}>・{highlight}</div>
            ))}
          </div>
        </div>

        <div className="font-bold mb-5 whitespace-pre-wrap">{description}</div>

        <div>{detail}</div>
      </div>

      <div className="flex items-center justify-center">
        <Image
          src={imageSrc}
          alt="reason"
          width={440}
          height={378}
          priority={false}
          className="rounded object-cover"
        />
      </div>
    </div>
  )
}

export default TopReasonItem
