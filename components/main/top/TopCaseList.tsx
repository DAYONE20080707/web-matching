import ContentFrame from "@/components/ui/frame/ContentFrame"
import CaseList from "../case/CaseList"
import LinkButton from "@/components/ui/button/LinkButton"

const TopCaseList = () => {
  return (
    <>
      <ContentFrame>
        <section>
          <CaseList />
          <p className=" text-lg md:text-2xl mt-10">現在、準備中です。しばらくお待ちください。</p>
        </section>
{/*
        <div className=" flex justify-center mt-10">
          <LinkButton href="case " className=" block w-[300px]">
            もっと見る
          </LinkButton>
        </div> */}
      </ContentFrame>
    </>
  )
}

export default TopCaseList
