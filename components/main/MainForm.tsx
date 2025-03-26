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

      <ContentFrame className="">
        <section className="relative bg-white mx-auto -mt-40 px-3 md:px-20 py-10 md:py-14 rounded-xl border-4 border-black">
          <figure className="absolute -top-12 left-10">
            <Image
              src="/top/fukidashi.svg"
              alt="message"
              width={380}
              height={53}
              priority={true}
            />
          </figure>
          <div className=" w-1/2">
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
                      <FormLabel className=" text-lg font-bold">
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
                      <FormLabel className=" text-lg font-bold">
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
                    className="block w-full h-auto bg-primary text-base text-center text-white py-4 px-2 mt-12 rounded-xl shadow-slate-700 shadow-md hover:opacity-70  "
                  >
                    今すぐ相談する！（無料）
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </section>
      </ContentFrame>

  )
}

export default MainForm
