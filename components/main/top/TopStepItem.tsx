"use client"
import Image from "next/image"

interface TopStepItemProps {
  stepNumber: string
  stepTitle: string
  stepSubTitle?: string
  stepBody: string
}

const TopStepItem: React.FC<TopStepItemProps> = ({
  stepNumber,
  stepTitle,
  stepSubTitle,
  stepBody,
}) => {
  return (
    <div className="p-6 ">
      <p className="text-primary font-bold text-sm mr-4"> {stepNumber}</p>
      <h3 className="font-bold text-lg mb-2 ">{stepTitle}</h3>
      {/* <h4 className="text-gray-500 text-base mb-2">{stepSubTitle}</h4> */}
      <p className="text-gray-700 text-sm">{stepBody}</p>
    </div>
  )
}

export default TopStepItem
