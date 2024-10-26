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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AREA_LIST,
  PREFECTURES,
  PRODUCT_TYPE_LIST,
  DESIRED_FUNCTION_LIST,
} from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { ProjectSchema } from "@/schemas"
import { Loader2, CalendarIcon } from "lucide-react"
import { Project } from "@prisma/client"
import { useRouter } from "next/navigation"
import { editProject } from "@/actions/project"
import { Switch } from "@/components/ui/switch"
import { ja } from "date-fns/locale"
import toast from "react-hot-toast"

interface ProjectAdminDetailProps {
  project: Project
}

const ProjectAdminDetail = ({ project }: ProjectAdminDetailProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // エリアリストの初期値設定
  const initialAreaList =
    project.area || project.companyPrefecture
      ? AREA_LIST.filter((item) =>
          (project.area || project.companyPrefecture)
            .split("、")
            .includes(item.label)
        ).map((item) => item.id)
      : []

  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      name: project.name,
      email: project.email,
      companyName: project.companyName,
      companyPostCode: project.companyPostCode,
      companyPrefecture: project.companyPrefecture,
      companyCity: project.companyCity,
      companyAddress: project.companyAddress,
      companyPhone: project.companyPhone,
      areaList: initialAreaList,
      title: project.title,
      budget: project.budget,
      planPageNumber: project.planPageNumber,
      productTypeList: project.productTypes
        .split("、")
        .map((label) => {
          const found = PRODUCT_TYPE_LIST.find(
            (item) => item.label === label.trim()
          )
          return found ? found.id : null
        })
        .filter((id) => id !== null),
      otherProductType: project.otherProductType || "",
      desiredFunctionTypeList: project.desiredFunctionTypes
        .split("、")
        .map((label) => {
          const found = DESIRED_FUNCTION_LIST.find(
            (item) => item.label === label.trim()
          )
          return found ? found.id : null
        })
        .filter((id) => id !== null),
      otherDesiredFunctionType: project.otherDesiredFunctionType || "",
      requests: project.requests || "",
      referralFee: project.referralFee,
      maxReferrals: project.maxReferrals,
      isReferralAllowed: project.isReferralAllowed,
      contactMethod: project.contactMethod,
      dueDate: new Date(project.dueDate),
      publishEndDate: new Date(project.publishEndDate),
    },
  })

  // 送信
  const onSubmit = async (values: z.infer<typeof ProjectSchema>) => {
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

      const sortedAreaList = values.areaList
        .sort((a, b) => parseInt(a) - parseInt(b))
        .map((id) => {
          const productType = AREA_LIST.find((item) => item.id === id)
          return productType ? productType.label : ""
        })
        .filter((label) => label !== "")

      const area = sortedAreaList.join("、")

      // 案件情報編集
      await editProject({
        ...values,
        id: project.id,
        productTypes,
        desiredFunctionTypes,
        area,
      })

      toast.success("案件情報を編集しました")
      router.push("/admin")
      router.refresh()
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("案件情報の編集に失敗しました")
      }
    } finally {
      setIsLoading(false)
    }
  }

  // 全選択
  const selectAll = () => {
    form.setValue(
      "areaList",
      AREA_LIST.map((item) => item.id)
    )
  }

  // 全チェックを外す
  const deselectAll = () => {
    form.setValue("areaList", [])
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="isReferralAllowed"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-5">
              <FormLabel className="font-bold">紹介可否</FormLabel>
              <FormControl>
                <div>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-5 mb-2">
          <FormField
            control={form.control}
            name="referralFee"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">紹介金額(円)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="30,000"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                     className="no-arrows"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxReferrals"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">紹介数(社)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="3"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                     className="no-arrows"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="publishEndDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">掲載期日</FormLabel>
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

        <FormField
          control={form.control}
          name="areaList"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">紹介エリア</FormLabel>
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
                  type="button"
                  variant="outline"
                  onClick={deselectAll}
                  className="py-2"
                >
                  全選択解除
                </Button>
              </div>
              <div className="grid grid-cols-4 md:grid-cols-9 gap-1 md:gap-3">
                {AREA_LIST.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="areaList"
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
                                  ? field.onChange([...field.value, item.id])
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

        <div className="font-bold text-xl pt-5">ユーザー情報</div>

        <div className="grid grid-cols-2 gap-5 mb-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">名前</FormLabel>
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
                <FormLabel className="font-bold">メールアドレス</FormLabel>
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
        </div>

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

          <FormField
            control={form.control}
            name="contactMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">
                  連絡方法(メール、電話、訪問)
                </FormLabel>
                <FormControl>
                  <Input placeholder="メール" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="font-bold text-xl">査定内容</div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">タイトル</FormLabel>
              <FormControl>
                <Input
                  placeholder="新規ホームページ制作の一括査定依頼"
                  {...field}
                />
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
                    type="number"
                    placeholder="1,000,000"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                     className="no-arrows"
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
                     className="no-arrows"
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
                                    ? field.onChange([...field.value, item.id])
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
                          rows={4}
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
                                    ? field.onChange([...field.value, item.id])
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
                          rows={4}
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

        <Button type="submit" className="w-full font-bold" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          編集する
        </Button>
      </form>
    </Form>
  )
}

export default ProjectAdminDetail
