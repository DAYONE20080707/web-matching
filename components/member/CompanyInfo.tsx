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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CompanyInfoSchema } from "@/schemas"
import { PREFECTURES } from "@/lib/utils"
import { Loader2, CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Company } from "@prisma/client"
import { useRouter } from "next/navigation"
import { editCompany } from "@/actions/company"
import { ja } from "date-fns/locale"
import toast from "react-hot-toast"

interface CompanyInfoProps {
  company: Company
}

const CompanyInfo = ({ company }: CompanyInfoProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof CompanyInfoSchema>>({
    resolver: zodResolver(CompanyInfoSchema),
    defaultValues: {
      companyName: company.companyName,
      companyEmail: company.companyEmail,
      companySiteUrl: company.companySiteUrl || "https://www.google.com/",
      companyRepName: company.companyRepName || "田中太郎",
      companyPostCode: company.companyPostCode || "111-1111",
      companyPrefecture: company.companyPrefecture || "東京都",
      companyCity: company.companyCity || "品川区",
      companyAddress: company.companyAddress || "大井5-11-9",
      companyPrefectureMap: company.companyPrefectureMap || "東京都",
      companyCityMap: company.companyCityMap || "品川区",
      companyAddressMap: company.companyAddressMap || "大井5-11-9",
      companyfoundDate: company.companyfoundDate || new Date(),
      companyPhone: company.companyPhone || "03-1111-1111",
      companyCapital: company.companyCapital || "1000",
      companyEmployee: company.companyEmployee || "100",
      companyBusiness: company.companyBusiness || "ホームページ制作",
      companyFeature: company.companyFeature || "高い技術力",
      companyPoint1: company.companyPoint1 || "高品質なサービス",
      companyPoint2: company.companyPoint2 || "顧客満足度",
      companyPoint3: company.companyPoint3 || "迅速な対応",
      companyPr: company.companyPr || "よろしくお願いします",
    },
  })

  // 送信
  const onSubmit = async (values: z.infer<typeof CompanyInfoSchema>) => {
    setIsLoading(true)

    try {
      // 企業情報編集
      const result = await editCompany({
        ...values,
        id: company.id,
      })

      if (result) {
        form.reset()
        toast.success("企業情報を編集しました")
        router.push("/member")
        router.refresh()
      } else {
        toast.error("企業情報の編集に失敗しました")
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("企業情報の編集に失敗しました")
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
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">企業名</FormLabel>
                <FormControl>
                  <Input placeholder="株式会社デイワン" {...field} />
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
                <FormLabel className="font-bold">企業メールアドレス</FormLabel>
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
            name="companySiteUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">企業サイト</FormLabel>
                <FormControl>
                  <Input placeholder="https://day-1.tokyo/" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyRepName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">代表者名</FormLabel>
                <FormControl>
                  <Input placeholder="田中太郎" {...field} />
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
          <div>
            <div className="font-bold mb-2 text-sm">住所(地図用)</div>
            <div>マップの表示に使用します</div>

            <div className="grid grid-cols-2 gap-5 mb-2">
              <FormField
                control={form.control}
                name="companyPrefectureMap"
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
                name="companyCityMap"
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
              name="companyAddressMap"
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
            name="companyfoundDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">設立日</FormLabel>
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
                            <span>Pick a date</span>
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
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
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
            name="companyCapital"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">資本金(円)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="1000000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyEmployee"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">社員数(人)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="10" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyBusiness"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">事業内容</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="ホームページ制作、ソフトウェア開発、ITコンサルティング"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyFeature"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">自社の特徴</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="高い技術力、柔軟なカスタマイズ対応、豊富な業界知識"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyPoint1"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">自社のポイント1</FormLabel>
                <FormControl>
                  <Input placeholder="高品質なサービス" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyPoint2"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">自社のポイント2</FormLabel>
                <FormControl>
                  <Input placeholder="顧客満足度No.1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyPoint3"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">自社のポイント3</FormLabel>
                <FormControl>
                  <Input placeholder="迅速な対応" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyPr"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">自社PR</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="弊社は創業以来、常にお客様の満足を第一に考え、最高のサービスを提供してきました。"
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

export default CompanyInfo
