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
import { Loader2, EyeOffIcon, EyeIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { resetPassword } from "@/actions/user"
import toast from "react-hot-toast"

// 入力データの検証ルールを定義
const schema = z
  .object({
    password: z.string().min(8, { message: "8文字以上入力する必要があります" }),
    repeatedPassword: z
      .string()
      .min(8, { message: "8文字以上入力する必要があります" }),
  })
  .refine((data) => data.password === data.repeatedPassword, {
    message: "新しいパスワードと確認用パスワードが一致しません",
    path: ["repeatedPassword"], // エラーメッセージが適用されるフィールド
  })

// 入力データの型を定義
type InputType = z.infer<typeof schema>

interface ResetPasswordProps {
  token: string
}

// パスワード再発行確認
const ResetPassword = ({ token }: ResetPasswordProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [passwordVisibility1, setPasswordVisibility1] = useState(false)
  const [passwordVisibility2, setPasswordVisibility2] = useState(false)

  // フォームの状態
  const form = useForm<InputType>({
    // 入力値の検証
    resolver: zodResolver(schema),
    // 初期値
    defaultValues: {
      password: "",
      repeatedPassword: "",
    },
  })

  // 送信
  const onSubmit: SubmitHandler<InputType> = async (data) => {
    setIsLoading(true)

    try {
      // パスワード再発行
      const response = await resetPassword({
        token,
        password: data.password,
      })

      if (response.error) {
        toast.error(response.error)
        setMessage(response.error)
      } else if (response.success) {
        toast.success(response.success)
        router.refresh()
        router.push("/login")
      }
    } catch (error) {
      toast.error("パスワード再発行に失敗しました")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-[500px] bg-white p-5 rounded-xl">
      <div className="text-primary text-xl font-bold text-center border-b border-black pb-5 mb-5 mt-3">
        パスワード再発行
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">新しいパスワード</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={passwordVisibility1 ? "text" : "password"}
                      placeholder="********"
                      {...field}
                    />
                    <div
                      className="absolute inset-y-0 right-0 flex cursor-pointer items-center p-3 text-muted-foreground"
                      onClick={() =>
                        setPasswordVisibility1(!passwordVisibility1)
                      }
                    >
                      {passwordVisibility1 ? (
                        <EyeOffIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="repeatedPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">
                  新しいパスワード(確認用)
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={passwordVisibility2 ? "text" : "password"}
                      placeholder="********"
                      {...field}
                    />
                    <div
                      className="absolute inset-y-0 right-0 flex cursor-pointer items-center p-3 text-muted-foreground"
                      onClick={() =>
                        setPasswordVisibility2(!passwordVisibility2)
                      }
                    >
                      {passwordVisibility2 ? (
                        <EyeOffIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </div>
                  </div>
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
        <div className="text-center text-sm text-red-500 mt-5">{message}</div>
      )}
    </div>
  )
}

export default ResetPassword
