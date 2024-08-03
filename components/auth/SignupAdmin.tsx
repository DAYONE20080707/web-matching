"use client"

import { useState, useTransition } from "react"
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
import { ChevronRight, Loader2, EyeOffIcon, EyeIcon } from "lucide-react"
import Link from "next/link"
import { RegisterSchema } from "@/schemas"
import { z } from "zod"
import { signIn } from "next-auth/react"
import { adminSignup } from "@/actions/user"
import { LOGIN_SUCCESS_REDIRECT } from "@/routes"
import { FormError } from "@/components/auth/FormError"

// 管理者アカウント登録
const SignupAdmin = () => {
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()
  const [passwordVisibility, setPasswordVisibility] = useState(false)

  // フォームの状態
  const form = useForm<z.infer<typeof RegisterSchema>>({
    // 入力値の検証
    resolver: zodResolver(RegisterSchema),
    // 初期値
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  // 送信
  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setError("")

    startTransition(async () => {
      try {
        const res = await adminSignup(values)

        if (res.error) {
          setError(res.error)
          return
        }

        const loginRes = await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
          callbackUrl: LOGIN_SUCCESS_REDIRECT,
        })

        if (loginRes?.url) {
          window.location.href = loginRes.url
        } else if (loginRes?.error) {
          switch (loginRes.error) {
            case "CredentialsSignin":
              setError("メールアドレス、パスワードが正しくありません")
              break
            case "Configuration":
              setError("認証に関する設定エラーが発生しました")
              break
            case "AccessDenied":
              setError("アクセスが拒否されました")
              break
            case "Verification":
              setError("メール認証が必要です")
              break
            default:
              setError("エラーが発生しました")
          }
        }
      } catch (error) {
        console.error(error)
        setError("エラーが発生しました")
      }
    })
  }

  return (
    <div className="w-[500px] bg-white p-5 rounded-xl">
      <div className="text-primary text-xl font-bold text-center border-b border-black pb-5 mb-5 mt-3">
        管理者アカウント登録
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>名前</FormLabel>
                <FormControl>
                  <Input placeholder="名前" {...field} disabled={isPending} />
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
                <FormLabel>メールアドレス</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@dayone.com"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>パスワード</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={passwordVisibility ? "text" : "password"}
                      placeholder="********"
                      {...field}
                      disabled={isPending}
                    />
                    <div
                      className="absolute inset-y-0 right-0 flex cursor-pointer items-center p-3 text-muted-foreground"
                      onClick={() => setPasswordVisibility(!passwordVisibility)}
                    >
                      {passwordVisibility ? (
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

          <div className="space-y-4 w-full">
            <FormError message={error} />
            <Button
              type="submit"
              className="w-full space-x-2 rounded-none shadow-none py-5 font-bold"
              disabled={isPending}
            >
              {isPending && <Loader2 className="animate-spin" />}
              <span>新規登録</span>
            </Button>
          </div>
        </form>
      </Form>

      <div className="text-center mt-5 space-y-2">
        <div>
          <Link href="/login" className="text-sm text-primary font-bold">
            既にアカウントを持ちの方はこちら{" "}
            <ChevronRight className="w-4 h-4 inline align-text-bottom" />
          </Link>
        </div>

        <div>
          <Link href="/" className="text-sm text-primary font-bold">
            トップページ
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignupAdmin
