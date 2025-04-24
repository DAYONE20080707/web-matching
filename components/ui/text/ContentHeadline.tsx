import { TextHeadlineProps } from "@/types"

const ContentHeadline: React.FC<TextHeadlineProps> = ({
  mainTitle,
  subTitle,
}) => {
  return (
    <div className=" w-full ">
      <p className=" text-xl md:text-lg font-bold text-primary">{subTitle}</p>

      <h2 className="text-2xl md:text-3xl font-bold md:leading-160">{mainTitle}</h2>
    </div>
  )
}

export default ContentHeadline
