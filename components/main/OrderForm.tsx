"use client"

import { Button } from "@/components/ui/button"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { OrderFormSchema } from "@/schemas"
import {
  PREFECTURES,
  PRODUCT_TYPE_LIST,
  DESIRED_FUNCTION_LIST,
} from "@/lib/utils"
import { useState } from "react"
import { createProject } from "@/actions/project"
import { Loader2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import toast from "react-hot-toast"

interface OrderFormProps {
  name: string
  email: string
  handleClose: () => void
}

const OrderForm = ({ name, email, handleClose }: OrderFormProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const form = useForm<z.infer<typeof OrderFormSchema>>({
    resolver: zodResolver(OrderFormSchema),
    defaultValues: {
      companyName: "",
      companyPostCode: "",
      companyPrefecture: "",
      companyCity: "",
      companyAddress: "",
      companyPhone: "",
      budget: 100000,
      planPageNumber: 10,
      productTypeList: [],
      otherProductType: "",
      desiredFunctionTypeList: [],
      otherDesiredFunctionType: "",
      requests: "",
    },
  })

  // 送信
  const onSubmit = async (values: z.infer<typeof OrderFormSchema>) => {
    setIsLoading(true)

    try {
      const sortedProductTypeList = values.productTypeList
        .sort((a, b) => parseInt(a) - parseInt(b))
        .map((id) => {
          const productType = PRODUCT_TYPE_LIST.find((item) => item.id === id)
          return productType ? productType.label : ""
        })
        .filter((label) => label !== "")

      const productTypes = sortedProductTypeList.join("、")

      const sortedDesiredFunctionTypeList = values.desiredFunctionTypeList
        .sort((a, b) => parseInt(a) - parseInt(b))
        .map((id) => {
          const desiredFunctionType = DESIRED_FUNCTION_LIST.find(
            (item) => item.id === id
          )
          return desiredFunctionType ? desiredFunctionType.label : ""
        })
        .filter((label) => label !== "")

      const desiredFunctionTypes = sortedDesiredFunctionTypeList.join("、")

      // 査定申込み
      const project = await createProject({
        ...values,
        name,
        email,
        productTypes,
        desiredFunctionTypes,
      })

      if (project) {
        setIsComplete(true)
        form.reset()
        toast.success("査定申込みが完了しました")
      } else {
        toast.error("査定申込みに失敗しました")
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("査定申込みに失敗しました")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="text-black">
      {isComplete ? (
        <div className="text-center">
          <div className="font-bold text-xl mb-5">査定申込み完了</div>
          <div className="mb-5">
            査定申込み完了しました。
            <br />
            確認のメールが届きます。
            <br />
            査定には最短3日かかります。
          </div>

          <Button className="w-full font-bold" onClick={handleClose}>
            TOPに戻る
          </Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">法人名</FormLabel>
                  <FormControl>
                    <Input placeholder="株式会社デイワン" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <div className="font-bold mb-2">法人住所</div>

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

            <div className="grid grid-cols-2 gap-5 mb-2">
              <FormField
                control={form.control}
                name="companyPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">電話番号</FormLabel>
                    <FormControl>
                      <Input placeholder="03-0000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="font-bold text-xl">査定内容</div>

            <div className="grid grid-cols-2 gap-5 mb-2">
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">ご予算(円)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="1000000"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="planPageNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      予定ページ数(ページ)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="10"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-5 mb-2">
              <FormField
                control={form.control}
                name="productTypeList"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">制作種類内容</FormLabel>
                    <div className="">
                      {PRODUCT_TYPE_LIST.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="productTypeList"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-2 space-y-0 mb-3"
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
                    <FormField
                      control={form.control}
                      name="otherProductType"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="ご自由にご記入ください"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="desiredFunctionTypeList"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">欲しい機能</FormLabel>
                    <div className="">
                      {DESIRED_FUNCTION_LIST.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="desiredFunctionTypeList"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-2 space-y-0 mb-3"
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
                    <FormField
                      control={form.control}
                      name="otherDesiredFunctionType"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="ご自由にご記入ください"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="requests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">
                    ご質問・ご要望など
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="ご自由にご記入ください"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full font-bold"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              送信する
            </Button>
          </form>
        </Form>
      )}
    </div>
  )
}

export default OrderForm
