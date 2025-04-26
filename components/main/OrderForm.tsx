"use client"

import { Button } from "@/components/ui/button"
import type { z } from "zod"
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
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
import { Textarea } from "@/components/ui/textarea"
import { addDays } from "date-fns"
import { Loader2, CalendarIcon } from "lucide-react"
import { ja } from "date-fns/locale"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

interface OrderFormProps {
  name: string
  email: string
  handleClose: () => void
}

const OrderForm = ({ name, email, handleClose }: OrderFormProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof OrderFormSchema>>({
    resolver: zodResolver(OrderFormSchema),
    defaultValues: {
      companyName: "",
      companyPostCode: "",
      companyPrefecture: "",
      companyCity: "",
      companyAddress: "",
      companyPhone: "",
      title: "",
      budget: 100000,
      productTypeList: [],
      otherProductType: "",
      desiredFunctionTypeList: [],
      otherDesiredFunctionType: "",
      requests: "",
      dueDate: addDays(new Date(), 14),
    },
  })

  // 送信
  const onSubmit = async (values: z.infer<typeof OrderFormSchema>) => {
    setIsLoading(true)

    try {
      const sortedProductTypeList = values.productTypeList
        .sort((a, b) => Number.parseInt(a) - Number.parseInt(b))
        .map((id) => {
          const productType = PRODUCT_TYPE_LIST.find((item) => item.id === id)
          return productType ? productType.label : ""
        })
        .filter((label) => label !== "")

      const productTypes = sortedProductTypeList.join("、")

      const sortedDesiredFunctionTypeList = values.desiredFunctionTypeList
        .sort((a, b) => Number.parseInt(a) - Number.parseInt(b))
        .map((id) => {
          const desiredFunctionType = DESIRED_FUNCTION_LIST.find(
            (item) => item.id === id
          )
          return desiredFunctionType ? desiredFunctionType.label : ""
        })
        .filter((label) => label !== "")

      const desiredFunctionTypes = sortedDesiredFunctionTypeList.join("、")

      // 一括申し込み
      const project = await createProject({
        ...values,
        name,
        email,
        productTypes,
        desiredFunctionTypes,
      })

      if (project) {
        handleClose()
        router.push("/thanks")
        form.reset()
      } else {
        toast.error("一括申し込みに失敗しました")
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("一括申し込みに失敗しました")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="text-black">
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
            <div className="font-bold mb-2 text-sm">法人住所</div>

            <div className="grid grid-cols-2 gap-5 mb-2">
              <FormField
                control={form.control}
                name="companyPostCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="0000000" {...field} />
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
                    <Input placeholder="0312345678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="font-bold text-xl">一括内容</div>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">タイトル</FormLabel>
                <FormControl>
                  <Input placeholder="事業再構築補助金の依頼" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">納期</FormLabel>
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px]",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: ja })
                          ) : (
                            <span>日付を選択</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        locale={ja}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-5 mb-2">
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">ご予算(円)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1,000,000"
                      {...field}
                      value={field.value ? field.value.toLocaleString() : ""}
                      onChange={(e) => {
                        const value = e.target.value.replace(/,/g, "")
                        const numValue = value ? Number(value) : 0
                        field.onChange(numValue)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-2">
            <FormField
              control={form.control}
              name="productTypeList"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">制作種類内容</FormLabel>
                  <div>
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
                  <div>
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-2">
            <FormField
              control={form.control}
              name="otherProductType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">
                    その他制作種類内容
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="ご自由にご記入ください"
                      {...field}
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="otherDesiredFunctionType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">その他欲しい機能</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="ご自由にご記入ください"
                      {...field}
                      rows={4}
                    />
                  </FormControl>
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
                <FormLabel className="font-bold">ご質問・ご要望など</FormLabel>
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
    </div>
  )
}

export default OrderForm
