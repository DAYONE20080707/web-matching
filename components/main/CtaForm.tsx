"use client";

import { z } from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MainFormSchema } from "@/schemas";
import { useModal } from "@/hooks/use-modal-store";
import MainFrame from "../ui/frame/MainFrame";
import ContentFrame from "../ui/frame/ContentFrame";

const CtaForm = () => {
  const { onOpen } = useModal();

  const form = useForm<z.infer<typeof MainFormSchema>>({
    resolver: zodResolver(MainFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  // 送信
  const onSubmit = (values: z.infer<typeof MainFormSchema>) => {
    onOpen("order", { order: values });
    form.reset();
  };

  return (
    <div className=" w-full ">
      <ContentFrame>
        <section className="relative  max-w-screen-lg bg-white mx-auto px-4 md:px-8 py-8 md:py-8 rounded-xl shadow-lg">
          <figure className="absolute -top-20 md:-left-10">
            <Image
              src="/top/fukidashi.svg"
              alt="吹き出し"
              width={350}
              height={53}
              className="w-[250px] md:w-[350px]"
              priority={true}
            />
          </figure>

          <div className=" flex flex-col md:flex-row justify-center gap-x-10">
            <div className=" md:w-1/2 text-center mt-4">
              <h2 className=" text-2xl font-bold">
                プロへの発注を無料で徹底支援！
              </h2>
              <p className=" text-base mt-4 md:leading-200">
                完全無料で発注先を紹介する
                <br />
                「ビジネスマッチングエージェント」です。
                <br />
                専門スタッフが充実のサポートで補助金申請のプロを紹介！ <br />
                無料で徹底支援いたします。
                <br />
                お気軽にお問い合わせください。
              </p>
            </div>
            <div className=" md:w-1/2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">お名前</FormLabel>
                        <FormControl>
                          <Input placeholder="田中太郎" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold">
                          メールアドレス
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="example@dayone.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className=" w-full space-y-4">
                    <Button
                      type="submit"
                      className="block w-full h-auto bg-primary text-base text-center text-white py-4 px-2 mt-12 rounded-xl shadow-slate-700 shadow-md hover:opacity-70 "
                    >
                      今すぐ相談する！（無料）
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </section>
      </ContentFrame>
    </div>
  );
};

export default CtaForm;
