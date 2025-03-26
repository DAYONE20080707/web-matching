import { TextHeadlineProps } from "@/types"

const ContentHeadline: React.FC<TextHeadlineProps> = ({
  mainTitle,
  subTitle,
}) => {
  return (
    <div className=" w-full ">
        <p className="text-primary text-base md:text-lg font-bold">
        {subTitle}
      </p>

      <h2 className=" text-2xl font-bold md:leading-160 mt-4 ">
        {mainTitle}
      </h2>

    </div>
  )
}

export default ContentHeadline
