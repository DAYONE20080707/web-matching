"use client"

import { z } from "zod"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MainFormSchema } from "@/schemas"
import { useModal } from "@/hooks/use-modal-store"
import ContentFrame from "../ui/frame/ContentFrame"

const MainForm = () => {
  const { onOpen } = useModal()

  const form = useForm<z.infer<typeof MainFormSchema>>({
    resolver: zodResolver(MainFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  })

  // 送信
  const onSubmit = (values: z.infer<typeof MainFormSchema>) => {
    onOpen("order", { order: values })
    form.reset()
  }

  return (
    <section className="bg-secondary py-10 px-8">
      <div className=" relative w-[1200px] mx-auto">
        <figure className="absolute -top-20 left-0 md:left-10">
          <Image
            src="/top/fukidashi.svg"
            alt="message"
            width={300}
            height={53}
            priority={true}
            className=" hidden md:block"
          />
          <Image
            src="/top/fukidashi.svg"
            alt="message"
            width={250}
            height={53}
            priority={true}
            className="block md:hidden"
          />
        </figure>
        <div className="flex justify-start gap-x-32">
          <div className="  w-2/3 bg-white py-8 px-10 rounded-xl">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className=" text-base font-bold">
                        お名前
                      </FormLabel>
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
                      <FormLabel className=" text-base font-bold">
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

                <div className="">
                  <Button
                    type="submit"
                    className="block w-full h-auto bg-primary text-base text-center text-white py-4 px-2 mt-6 rounded-xl shadow-slate-700 shadow-md hover:opacity-70  "
                  >
                    今すぐ相談する！（無料）
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          <div className=" w-1/3 mt-2">
            <p className=" text-3xl font-bold">
              {" "}
              <span className=" text-red-500">30秒</span>で入力完了！
            </p>
            <h3 className=" text-3xl font-bold mt-4">
              経験や業界知見が豊富な <br />
              プロが見つかる
            </h3>
            <p className=" text-base leading-160 mt-4">
              完全無料で発注先を紹介する
              <br />
              「ビジネスマッチングエージェント」です。
              <br />
              専門スタッフが充実のサポートで補助金申請のプロを紹介！
              <br />
              無料で徹底支援いたします。
              <br />
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MainForm
