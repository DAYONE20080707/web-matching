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
import { Company, User } from "@prisma/client"
import { useRouter } from "next/navigation"
import { editCompany } from "@/actions/company"
import { ja } from "date-fns/locale"
import toast from "react-hot-toast"

interface CompanyAdminProps {
  company: Company & {
    users: User[]
  }
}

const CompanyAdmin = ({ company }: CompanyAdminProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof CompanyInfoSchema>>({
    resolver: zodResolver(CompanyInfoSchema),
    defaultValues: {
      companyName: company.companyName,
      companyEmail: company.companyEmail,
      companySiteUrl: company.companySiteUrl || "",
      companyRepName: company.companyRepName || "",
      companyPostCode: company.companyPostCode || "",
      companyPrefecture: company.companyPrefecture || "",
      companyCity: company.companyCity || "",
      companyAddress: company.companyAddress || "",
      companyPrefectureMap: company.companyPrefectureMap || "",
      companyCityMap: company.companyCityMap || "",
      companyAddressMap: company.companyAddressMap || "",
      companyfoundDate: company.companyfoundDate || new Date(),
      companyPhone: company.companyPhone || "",
      companyCapital: company.companyCapital || "",
      companyEmployee: company.companyEmployee || "",
      companyBusiness: company.companyBusiness || "",
      companyFeature: company.companyFeature || "",
      companyPoint1: company.companyPoint1 || "",
      companyPoint2: company.companyPoint2 || "",
      companyPoint3: company.companyPoint3 || "",
      companyPr: company.companyPr || "",
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
        router.push("/admin/company")
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
      <div className="font-bold mb-5 text-lg">担当者情報</div>

      {company.users.map((user) => (
        <div key={user.id} className="mb-5">
          <div className="flex items-center">
            <div className="font-bold text-sm w-[200px]">担当者名</div>
            <div>{user.name}</div>
          </div>
          <div className="flex items-center">
            <div className="font-bold text-sm w-[200px]">
              担当者メールアドレス
            </div>
            <div>{user.email}</div>
          </div>
          <div className="flex items-center">
            <div className="font-bold text-sm w-[200px]">担当者役職</div>
            <div>{user.position}</div>
          </div>
        </div>
      ))}

      <div className="font-bold mb-5 text-lg">企業情報</div>

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

export default CompanyAdmin
