import { Metadata } from "next";
import ContactForm from "@/components/main/contact/ContactForm";
import ContentHeadline from "@/components/ui/text/ContentHeadline";
import Breadcrumb from "@/components/ui/Breadcrumb";
import ContentFrame from "@/components/ui/frame/ContentFrame"

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "お問い合わせはこちらから。ご質問やご相談など、お気軽にご連絡ください。",
};

export default function ContactPage() {
  return (
    <>
      <div className="bg-secondary pt-12">
      <ContentFrame>
          <Breadcrumb items={[{ title: "お問い合わせ" }]} />
          <div className="mt-10">
            <ContentHeadline subTitle="Contact" mainTitle="お問い合わせ" />
            <ContactForm />
          </div>
        </ContentFrame>
      </div>
    </>
  );
}
