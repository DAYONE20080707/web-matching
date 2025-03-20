// components/ui/text/ContentHeadline.tsx

import React from "react"
import Image from "next/image"
import { TextProps } from "@/types"

const ContentHeadline: React.FC<TextProps> = ({
  mainTitle,
  subTitle,
  body,
  titleElement: TitleTag = "h2",
  subTitleElement: SubTitleTag = "h6",
  bodyElement: BodyTag = "p",
}) => (
  <>
    <div className=" w-full">
      {/* サブタイトル */}
      {subTitle && (
        <SubTitleTag className="font-ebGaramond text-2xl md:text-4xl  italic font-bold">
          {subTitle}
        </SubTitleTag>
      )}

      {/* タイトル */}
      <TitleTag className=" text-base md:text-xl font-bold mt-2">
        {mainTitle}
      </TitleTag>

      {/* 本文 */}
      {body && (
        <BodyTag className="font-semibold md:w-[500px] leading-7">
          {body}
        </BodyTag>
      )}
    </div>
  </>
)

export default ContentHeadline
