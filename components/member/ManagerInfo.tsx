"use client"

import { useState } from "react"
import { z } from "zod"
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
import { Textarea } from "@/components/ui/textarea"
import { ManagerInfoSchema } from "@/schemas"
import { Loader2 } from "lucide-react"
import { User } from "@prisma/client"
import { useRouter } from "next/navigation"
import { editUser } from "@/actions/user"
import toast from "react-hot-toast"

interface ManagerInfoProps {
  user: User
}

const ManagerInfo = ({ user }: ManagerInfoProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof ManagerInfoSchema>>({
    resolver: zodResolver(ManagerInfoSchema),
    defaultValues: {
      name: user.name,
      email: user.email!,
      position: user.position || "",
      message: user.message || "",
    },
  })

  // 送信
  const onSubmit = async (values: z.infer<typeof ManagerInfoSchema>) => {
    setIsLoading(true)

    try {
      // 企業情報編集
      const result = await editUser({
        ...values,
        id: user.id,
      })

      if (result) {
        form.reset()
        toast.success("担当者情報を編集しました")
        router.push("/member")
        router.refresh()
      } else {
        toast.error("担当者情報の編集に失敗しました")
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("担当者情報の編集に失敗しました")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">担当者名</FormLabel>
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
                  担当者メールアドレス
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

          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">担当者役職</FormLabel>
                <FormControl>
                  <Input placeholder="代表取締役社長" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">担当メッセージ</FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder="弊社のサービスをご利用いただきありがとうございます。"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4 w-full">
            <Button
              type="submit"
              className="w-full space-x-2 font-bold"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="animate-spin" />}
              <span>更新する</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ManagerInfo
