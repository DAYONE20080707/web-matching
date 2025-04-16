"use client";

import Image from "next/image";
import LinkButton from "@/components/ui/button/LinkButton";
import { MailCheck } from "lucide-react";
const Thanks = () => {
  return (
    <>
      <div className="flex flex-col items-center pb-8 md:pb-[134px] pt-10 md:pt-10">
        <MailCheck size={64} className="w-16 h-16 md:w-20 md:h-20" />
        <h2 className="text-xl md:text-[28px] tracking-wider mt-[37px] md:mt-[31px] ![line-height:160%]">
          お問い合わせが送信されました
        </h2>
        <p className="text-base md:text-lg text-center ![line-height:200%] mt-10 whitespace-pre-line">
          お問い合わせいただき、誠にありがとうございます。<br />
          お問い合わせ内容を確認後、３営業日以内に担当者からご連絡致しますので、<br />
          今しばらくお待ちくださいませ。
        </p>
        <div className="w-full mt-8 md:mt-16 flex justify-center">
          <LinkButton
            href="/"
            className="mx-0 flex justify-center items-center"
          >
            {/* <Mail className="w-4 h-4 mr-2" /> */}
            トップに戻る
          </LinkButton>
        </div>
      </div>
    </>
  );
};

export default Thanks;
