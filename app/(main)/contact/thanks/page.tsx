import { Metadata } from "next";
import ContentFrame from "@/components/ui/frame/ContentFrame"
import Thanks from "@/components/main/contact/Thanks";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ContentHeadline from "@/components/ui/text/ContentHeadline"

export const metadata: Metadata = {
  title: "送信完了",
  description:
    "お問い合わせいただき、ありがとうございます。確認後にご連絡いたしますので、しばらくお待ちください。",
};

export default function ThanksPage() {
  return (
    <>
      <div className="bg-secondary pt-12">
      <ContentFrame>
          <Breadcrumb items={[{ title: "お問い合わせ完了" }]} />
          <div className="mt-10">
            <ContentHeadline subTitle="Contact" mainTitle="お問い合わせ完了" />
            <Thanks />
          </div>
        </ContentFrame>
      </div>
    </>
  );
}
