"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm, SubmitHandler } from "react-hook-form"
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
import { Loader2, ChevronRight } from "lucide-react"
import toast from "react-hot-toast"
import { forgotPassword } from "@/actions/user"
import Link from "next/link"

// 入力データの検証ルールを定義
const schema = z.object({
  email: z.string().email({ message: "メールアドレスの形式ではありません" }),
})

// 入力データの型を定義
type InputType = z.infer<typeof schema>

// パスワード再発行
const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [message, setMessage] = useState("")

  // フォームの状態
  const form = useForm<InputType>({
    // 入力値の検証
    resolver: zodResolver(schema),
    // 初期値
    defaultValues: {
      email: "",
    },
  })

  // 送信
  const onSubmit: SubmitHandler<InputType> = async (data) => {
    setIsLoading(true)

    try {
      // パスワード再発行
      const response = await forgotPassword(data)

      if (response.error) {
        toast.error(response.error)
        setMessage(response.error)
      } else if (response.success) {
        toast.success(response.success)
        setMessage(response.success)
        setIsForgotPassword(true)
      }
    } catch (error) {
      toast.error("パスワード再発行に失敗しました")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-[500px] bg-white p-5 rounded-xl border">
      {isForgotPassword ? (
        <>
          <div className="text-primary text-xl font-bold text-center border-b border-black pb-5 mb-5 mt-3">
            パスワード再発行メール送信
          </div>

          <div className="text-sm">
            パスワード再発行に必要なメールを送信しました。
            <br />
            メールのURLよりパスワード再発行画面へ進んでいただき、パスワードを再発行してください。
            <br />
            ※メールが届かない場合、入力したメールアドレスが間違っている可能性があります。
            <br />
            お手数ですが、再度、パスワード再発行からやり直してください。
          </div>
        </>
      ) : (
        <>
          <div className="text-primary text-xl font-bold text-center border-b border-black pb-5 mb-5 mt-3">
            パスワード再発行
          </div>

          <div className="text-sm text-center mb-5">
            登録したメールアドレスを入力してください。
            <br />
            パスワードを再発行するための案内を送信します。
            <br />
            ※注釈はいります。注釈はいります。注釈はいります。
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">メールアドレス</FormLabel>
                    <FormControl>
                      <Input placeholder="example@dayone.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={isLoading}
                type="submit"
                className="w-full space-x-2 font-bold"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                送信する
              </Button>
            </form>
          </Form>

          {message && (
            <div className="text-center text-sm text-red-500 mt-5">
              {message}
            </div>
          )}

          <div className="text-center mt-5 space-y-2">
            <div>
              <Link href="/login" className="text-sm text-primary font-bold">
                ログインはこちら{" "}
                <ChevronRight className="w-4 h-4 inline align-text-bottom" />
              </Link>
            </div>
            <div>
              <Link href="/" className="text-sm text-primary font-bold">
                トップページ
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ForgotPassword
