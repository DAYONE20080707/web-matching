// components/ui/text/TopHeadline.tex

import { TextProps } from '@/types'
import React from 'react'

const TopPageHeadline: React.FC<TextProps> = ({
  title,
  subTitle,
  body,
  titleElement: TitleTag = 'h1',
  subTitleElement: SubTitleTag = 'h2',
  bodyElement: BodyTag = 'p',
}) => (
  <>
    <div className=" w-full md:w-[700px]  mt-20 md:mt-40">
      <SubTitleTag className="  font-ebGaramond text-3xl md:text-4xl italic font-bold  leading-[110%] md:leading-[140%]">
        {subTitle}
      </SubTitleTag>
      <TitleTag className=" text-base md:text-xl font-bold leading-[200%] md:leading-[200%] mt-12 md:mt-32">
        {title}
      </TitleTag>


      {body && (
        <BodyTag className="  text-xs md:text-sm mt-4 leading-[200%] md:leading-[200%]">{body}</BodyTag>
      )}
    </div>
  </>
)

export default TopPageHeadline
