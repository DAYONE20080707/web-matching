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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AREA_LIST, PREFECTURES } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronRight, Loader2, EyeOffIcon, EyeIcon } from "lucide-react"
import { RegisterSchema } from "@/schemas"
import { z } from "zod"
import { userSignup } from "@/actions/user"
import { FormError } from "@/components/auth/FormError"
import toast from "react-hot-toast"
import Link from "next/link"

// 一般アカウント登録
const SignupUser = () => {
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const [isSignup, setIsSignup] = useState(false)

  // フォームの状態
  const form = useForm<z.infer<typeof RegisterSchema>>({
    // 入力値の検証
    resolver: zodResolver(RegisterSchema),
    // 初期値
    defaultValues: {
      name: "",
      email: "",
      password: "",
      companyName: "",
      companyEmail: "",
      companyPostCode: "",
      companyPrefecture: "",
      companyCity: "",
      companyAddress: "",
      companyPhone: "",
      companyAreaList: [],
    },
  })

  // 送信
  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setError("")

    startTransition(async () => {
      try {
        const sortedCompanyAreaList = values.companyAreaList
          .sort((a, b) => parseInt(a) - parseInt(b))
          .map((id) => {
            const productType = AREA_LIST.find((item) => item.id === id)
            return productType ? productType.label : ""
          })
          .filter((label) => label !== "")

        const companyArea = sortedCompanyAreaList.join("、")

        const response = await userSignup({
          ...values,
          companyArea,
        })

        if (response.error) {
          toast.error(response.error)
          setError(response.error)
        } else if (response.success) {
          toast.success(response.success)
          setError(response.success)
          setIsSignup(true)
        }
      } catch (error) {
        console.error(error)
        setError("エラーが発生しました")
      }
    })
  }

  // 全選択
  const selectAll = () => {
    form.setValue(
      "companyAreaList",
      AREA_LIST.map((item) => item.id)
    )
  }

  // 全チェックを外す
  const deselectAll = () => {
    form.setValue("companyAreaList", [])
  }

  return (
    <div className="w-[700px] bg-white p-5 rounded-xl border">
      {isSignup ? (
        <>
          <div className="text-primary text-xl font-bold text-center border-b border-black pb-5 mb-5 mt-3">
            アカウント本登録メール送信
          </div>

          <div className="text-sm">
            担当者様のメールアドレスにアカウント本登録に必要な情報を送信しました。
            <br />
            メールのURLよりアカウント本登録を完了させてください。
            <br />
            ※メールが届かない場合、入力したメールアドレスが間違っている可能性があります。
            <br />
            お手数ですが、再度、アカウント登録からやり直してください。
          </div>
        </>
      ) : (
        <>
          <div className="text-primary text-xl font-bold text-center border-b border-black pb-5 mb-5 mt-3">
            アカウント登録
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="font-bold">担当者情報</div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">お名前</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="田中太郎"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">メールアドレス</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example1@dayone.com"
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
                          onClick={() =>
                            setPasswordVisibility(!passwordVisibility)
                          }
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

              <div className="font-bold">企業情報</div>

              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">企業名</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="株式会社デイワン"
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
                name="companyEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      企業メールアドレス
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example2@dayone.com"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <div className="font-bold mb-2 text-sm">本社所在地</div>

                <div className="grid grid-cols-2 gap-5 mb-2">
                  <FormField
                    control={form.control}
                    name="companyPostCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="000-0000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-5 mb-2">
                  <FormField
                    control={form.control}
                    name="companyPrefecture"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="都道府県" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {PREFECTURES.map((prefecture) => (
                              <SelectItem key={prefecture} value={prefecture}>
                                {prefecture}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="companyCity"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="市区町村" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="companyAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="丁目・番地・部屋番号" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="companyPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">電話番号</FormLabel>
                    <FormControl>
                      <Input placeholder="03-1234-5678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyAreaList"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">対応エリア</FormLabel>
                    <div className="flex items-center space-x-2 mb-4">
                      <Button
                        variant="outline"
                        type="button"
                        onClick={selectAll}
                        className="py-2"
                      >
                        全選択
                      </Button>
                      <Button
                        variant="outline"
                        type="button"
                        onClick={deselectAll}
                        className="py-2"
                      >
                        全選択解除
                      </Button>
                    </div>
                    <div className="grid grid-cols-4 md:grid-cols-7 gap-1 md:gap-3">
                      {AREA_LIST.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="companyAreaList"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="space-x-1 flex items-end"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel>{item.label}</FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4 w-full">
                <FormError message={error} />
                <Button
                  type="submit"
                  className="w-full space-x-2 font-bold"
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
          </div>
        </>
      )}
    </div>
  )
}

export default SignupUser
