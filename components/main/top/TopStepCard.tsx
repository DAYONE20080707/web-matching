// components/top/TopStepCard.tsx
"use client"

interface TopStepCardProps {
  stepNumber: string
  stepTitle: string
  stepSubTitle: string
  stepBody: string
}

const TopStepItem: React.FC<TopStepCardProps> = ({
  stepNumber,
  stepTitle,
  stepSubTitle,
  stepBody,
}) => {
  return (
    <div className="step p-6 ">
      <div className="mb-4"></div>
      <h3 className=" font-bold text-xl mb-2 ">
        <span className="text-primary font-bold text-sm mr-4">
          {stepNumber}
        </span>
        {stepTitle}
      </h3>
      <h4 className="text-gray-500 text-base mb-2">{stepSubTitle}</h4>
      <p className="text-gray-700 text-base">{stepBody}</p>
    </div>
  )
}

export default TopStepItem
