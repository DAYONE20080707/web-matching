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
import { PerformanceSchema } from "@/schemas"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { createPerformance } from "@/actions/performance"
import toast from "react-hot-toast"

interface PerformanceNewProps {
  companyId: string
}

const PerformanceNew = ({ companyId }: PerformanceNewProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof PerformanceSchema>>({
    resolver: zodResolver(PerformanceSchema),
    defaultValues: {
      title: "",
      content: "",
      url: "",
      industry: "",
      genre: "",
      scope: "",
    },
  })

  // 送信
  const onSubmit = async (values: z.infer<typeof PerformanceSchema>) => {
    setIsLoading(true)

    try {
      // 実績登録
      const result = await createPerformance({
        ...values,
        companyId,
      })

      if (result) {
        form.reset()
        toast.success("実績を登録しました")
        router.push("/member/performance")
        router.refresh()
      } else {
        toast.error("実績の登録に失敗しました")
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("実績の登録に失敗しました")
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">タイトル</FormLabel>
                <FormControl>
                  <Input placeholder="企業ホームページ制作" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">本文</FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    placeholder="企業のブランディングを強化するためのホームページを制作しました。"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="font-bold">画像</div>

          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">業界</FormLabel>
                <FormControl>
                  <Input placeholder="IT" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">ジャンル</FormLabel>
                <FormControl>
                  <Input placeholder="Web制作" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="scope"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">担当範囲</FormLabel>
                <FormControl>
                  <Input placeholder="デザイン、開発、SEO対策" {...field} />
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
              <span>登録する</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default PerformanceNew
