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
    <section className="relative bg-white mx-auto -mt-40 px-3 md:px-20 py-10 md:py-14 rounded-xl border-4 border-black">
      <figure className="absolute -top-5 left-20">
        <Image
          src="/message.svg"
          alt="message"
          width={209}
          height={53}
          priority={true}
        />
      </figure>
      <div className=" w-1/2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className=" text-lg font-bold">お名前</FormLabel>
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
                  <FormLabel className=" text-lg font-bold">メールアドレス</FormLabel>
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
                className="w-full space-x-2 mt-8 font-bold rounded-lg"
              >
                今すぐ相談する！（無料）
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  )
}

export default MainForm
