// components/ui/main/frame/PageHeadline.tsx

import Breadcrumb from '@/components/ui/module/Breadcrumbs'

interface PageHeadlineProps {
  mainTitle: string
  subtitle: string
  body?: React.ReactNode
  parentDirectoryName?: string
  parentDirectoryLink?: string
}

const PageHeadline: React.FC<PageHeadlineProps> = ({
  mainTitle,
  subtitle,
  body,
  parentDirectoryName,
  parentDirectoryLink,
}) => {
  return (
    <>
      <section className="  w-11/12 md:w-[1200px] mx-auto px-4 md:px-0">
        <div className=" w-full md:w-[600px] mt-10">
          <Breadcrumb
            mainTitle={mainTitle}
            parentDirectoryName={parentDirectoryName}
            parentDirectoryLink={parentDirectoryLink}
          />

          <div className=" mt-20 ">
            <h1 className=" font-ebGaramond text-2xl md:text-4xl italic font-bold">
              {subtitle}
            </h1>
            <h2 className=" text-base md:text-xl font-bold mt-2">{mainTitle}</h2>
          </div>
          <p className="text-xs md:text-sm leading-[200%] mt-20"> {body}</p>
        </div>
      </section>

    </>
  )
}

export default PageHeadline
