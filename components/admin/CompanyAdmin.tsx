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
import { Checkbox } from "@/components/ui/checkbox"
import { CompanyInfoSchema } from "@/schemas"
import { AREA_LIST, PREFECTURES } from "@/lib/utils"
import { Loader2, CalendarIcon, CloudUpload, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Company, CompanyImage, User } from "@prisma/client"
import { useRouter } from "next/navigation"
import { editCompany } from "@/actions/company"
import { ja } from "date-fns/locale"
import ImageUploading, { ImageListType } from "react-images-uploading"
import Image from "next/image"
import toast from "react-hot-toast"

interface CompanyAdminProps {
  company: Company & {
    users: User[]
    images: CompanyImage[]
  }
}

const CompanyAdmin = ({ company }: CompanyAdminProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [imageUpload, setImageUpload] = useState<ImageListType>([
    {
      dataURL: company.companyLogoUrl || "/noImage.png",
    },
  ])
  const [companyImages, setCompanyImages] = useState<ImageListType>(
    company.images.map((img) => ({ dataURL: img.url }))
  )

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
      companyAreaList: company.companyArea
        ? company.companyArea
            .split("、")
            .map((label) => {
              const found = AREA_LIST.find(
                (item) => item.label === label.trim()
              )
              return found ? found.id : null
            })
            .filter((id) => id !== null)
        : [],
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
      const sortedCompanyAreaList = values.companyAreaList
        .sort((a, b) => parseInt(a) - parseInt(b))
        .map((id) => {
          const productType = AREA_LIST.find((item) => item.id === id)
          return productType ? productType.label : ""
        })
        .filter((label) => label !== "")

      const companyArea = sortedCompanyAreaList.join("、")

      let base64Image

      if (
        imageUpload[0].dataURL &&
        imageUpload[0].dataURL.startsWith("data:image")
      ) {
        base64Image = imageUpload[0].dataURL
      }

      // companyImages を整形
      const formattedCompanyImages = companyImages.map((image) => ({
        url: image.dataURL || image.url,
        isNew: image.file !== undefined, // 新しい画像かどうかを判定
      }))

      // 企業情報編集
      const result = await editCompany({
        ...values,
        id: company.id,
        companyArea,
        base64Image,
        companyImages: formattedCompanyImages,
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

  // ロゴアップロード
  const onLogoChange = (imageList: ImageListType) => {
    const file = imageList[0]?.file
    const maxFileSize = 5 * 1024 * 1024

    // ファイルサイズチェック
    if (file && file.size > maxFileSize) {
      toast.error("ファイルサイズは5MBを超えることはできません")
      return
    }

    setImageUpload(imageList)
  }

  // 会社案内画像アップロード
  const onImageChange = (imageList: ImageListType) => {
    const maxFileSize = 5 * 1024 * 1024 // 5MB

    // 各ファイルサイズをチェック
    for (const image of imageList) {
      if (image.file && image.file.size > maxFileSize) {
        toast.error("各ファイルサイズは5MBを超えることはできません")
        return
      }
    }

    setCompanyImages(imageList)
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
    <div>
      <div className="font-bold mb-5 text-lg">担当者情報</div>

      <div className="mb-5">
        <div className="flex items-center">
          <div className="font-bold text-sm w-[100px] md:w-[200px]">
            担当者名
          </div>
          <div>{company.users[0].name}</div>
        </div>
        <div className="flex items-center">
          <div className="font-bold text-sm w-[100px] md:w-[200px]">
            担当者メール
            <br className="block md:hidden" />
            アドレス
          </div>
          <div className="break-all">{company.users[0].email}</div>
        </div>
        <div className="flex items-center">
          <div className="font-bold text-sm w-[100px] md:w-[200px]">
            担当者役職
          </div>
          <div>{company.users[0].position}</div>
        </div>
      </div>

      <div className="font-bold mb-5 text-lg">企業情報</div>

      <Form {...form}>
        <div>
          <FormLabel className="font-bold">ロゴ</FormLabel>
          <div>
            <ImageUploading
              value={imageUpload}
              onChange={onLogoChange}
              maxNumber={1}
              acceptType={["jpg", "png", "jpeg"]}
            >
              {({ imageList, onImageUpload, onImageUpdate, dragProps }) => (
                <div className="flex flex-col items-center justify-center space-y-3">
                  {imageList.length == 0 && (
                    <button
                      onClick={onImageUpload}
                      className="w-[200px] h-[200px] border-2 border-dashed rounded hover:bg-gray-50"
                      {...dragProps}
                    >
                      <div className="text-gray-400 font-bold mb-2 text-sm">
                        ファイル選択または
                        <br />
                        ドラッグ＆ドロップ
                      </div>
                      <div className="text-gray-400 text-xs">
                        ファイル形式：jpg / jpeg / png
                      </div>
                      <div className="text-gray-400 text-xs">
                        ファイルサイズ：5MBまで
                      </div>
                    </button>
                  )}

                  {imageList.map((image, index) => (
                    <div key={index} className="relative group">
                      {image.dataURL && (
                        <>
                          <Image
                            src={image.dataURL}
                            alt="logo"
                            width={200}
                            height={200}
                            priority={true}
                          />
                          <div className="absolute top-2 right-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <Button
                              variant="outline"
                              onClick={() => onImageUpdate(index)}
                              size="icon"
                              className="rounded-full"
                            >
                              <CloudUpload className="h-4 w-4" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
          </div>
        </div>

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

          <div>
            <FormLabel className="font-bold">会社案内画像(最大6枚)</FormLabel>
            <div className="mt-3">
              <ImageUploading
                multiple
                value={companyImages}
                onChange={onImageChange}
                maxNumber={6}
                acceptType={["jpg", "png", "jpeg"]}
              >
                {({
                  imageList,
                  onImageUpload,
                  onImageUpdate,
                  onImageRemove,
                }) => (
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {imageList.map((image, index) => (
                        <div key={index}>
                          {image.dataURL && (
                            <div className="relative group">
                              <Image
                                src={image.dataURL}
                                alt="image"
                                width={384}
                                height={216}
                                priority={true}
                              />

                              <div className="absolute top-2 right-2 flex space-x-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <Button
                                  variant="outline"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    onImageUpdate(index)
                                  }}
                                  size="icon"
                                  className="rounded-full"
                                >
                                  <CloudUpload className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    onImageRemove(index)
                                  }}
                                  size="icon"
                                  className="rounded-full"
                                >
                                  <Trash2 className="h-4 w-4 text-white" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      onClick={(e) => {
                        e.preventDefault()
                        onImageUpload()
                      }}
                      disabled={imageList.length >= 6}
                    >
                      会社案内画像アップロード
                    </Button>
                  </div>
                )}
              </ImageUploading>
            </div>
          </div>

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
