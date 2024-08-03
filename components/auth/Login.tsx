"use client"

import { useState, useTransition } from "react"
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
import { ChevronRight, Loader2, EyeOffIcon, EyeIcon } from "lucide-react"
import { signIn } from "next-auth/react"
import { LoginSchema } from "@/schemas"
import { LOGIN_SUCCESS_REDIRECT } from "@/routes"
import { useSearchParams } from "next/navigation"
import { FormError } from "@/components/auth/FormError"
import Link from "next/link"

// ログイン
const Login = () => {
  const [error, setError] = useState("")
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const [isPending, startTransition] = useTransition()
  const searchParams = useSearchParams()
  const urlError =
    searchParams?.get("error") === "CredentialsSignin"
      ? "メールアドレス、パスワードが正しくありません"
      : ""
  const callbackUrl = searchParams?.get("callbackUrl")

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 送信
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("")

    startTransition(async () => {
      try {
        const res = await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
          callbackUrl: callbackUrl || LOGIN_SUCCESS_REDIRECT,
        })

        if (res?.url) {
          window.location.href = res.url
        } else if (res?.error) {
          switch (res.error) {
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
        ログイン
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
                <FormLabel className="font-bold">パスワード</FormLabel>
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
            <FormError message={error || urlError} />
            <Button
              type="submit"
              className="w-full space-x-2 rounded-none shadow-none py-5 font-bold"
              disabled={isPending}
            >
              {isPending && <Loader2 className="animate-spin" />}
              <span>ログイン</span>
            </Button>
          </div>
        </form>
      </Form>

      <div className="text-center mt-5 space-y-2">
        <div>
          <Link
            href="/reset-password"
            className="text-sm text-primary font-bold"
          >
            パスワードをお忘れの方はこちら{" "}
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

export default Login
