import ContentFrame from "@/components/ui/frame/ContentFrame"
import BlogList from "../blog/BlogList"
import LinkButton from "@/components/ui/button/LinkButton"

const TopBlogList = () => {
  return (
    <>
      <ContentFrame>
        <section>
          <BlogList />
        </section>

        <div className=" flex justify-center mt-10">
          <LinkButton href="blog " className=" w-[300px] ">
            もっと見る
          </LinkButton>
        </div>
      </ContentFrame>
    </>
  )
}

export default TopBlogList
