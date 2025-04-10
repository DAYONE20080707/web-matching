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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PerformanceSchema } from "@/schemas"
import { CloudUpload, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { editPerformance } from "@/actions/performance"
import { Performance } from "@prisma/client"
import ImageUploading, { ImageListType } from "react-images-uploading"
import Image from "next/image"
import toast from "react-hot-toast"

interface PerformanceEditProps {
  performance: Performance
}

const PerformanceEdit = ({ performance }: PerformanceEditProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [imageUpload, setImageUpload] = useState<ImageListType>([
    {
      dataURL: performance.imageUrl || "/noImage.png",
    },
  ])

  const form = useForm<z.infer<typeof PerformanceSchema>>({
    resolver: zodResolver(PerformanceSchema),
    defaultValues: {
      title: performance.title,
      content: performance.content,
      url: performance.url || "",
      industry: performance.industry,
      genre: performance.genre,
      scope: performance.scope,
    },
  })

  // 送信
  const onSubmit = async (values: z.infer<typeof PerformanceSchema>) => {
    setIsLoading(true)

    try {
      let base64Image

      if (
        imageUpload[0].dataURL &&
        imageUpload[0].dataURL.startsWith("data:image")
      ) {
        base64Image = imageUpload[0].dataURL
      }

      // 実績編集
      const result = await editPerformance({
        id: performance.id,
        ...values,
        base64Image,
      })

      if (result) {
        form.reset()
        toast.success("実績を編集しました")
        router.push("/member/performance")
        router.refresh()
      } else {
        toast.error("実績の編集に失敗しました")
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("実績の編集に失敗しました")
      }
    } finally {
      setIsLoading(false)
    }
  }

  // 画像アップロード
  const onChangeImage = (imageList: ImageListType) => {
    const file = imageList[0]?.file
    const maxFileSize = 5 * 1024 * 1024

    // ファイルサイズチェック
    if (file && file.size > maxFileSize) {
      toast.error("ファイルサイズは5MBを超えることはできません")
      return
    }

    setImageUpload(imageList)
  }

  return (
    <div>
      <Form {...form}>
        <div>
          <FormLabel className="font-bold">サムネイル</FormLabel>
          <div className="mt-2">
            <ImageUploading
              value={imageUpload}
              onChange={onChangeImage}
              maxNumber={1}
              acceptType={["jpg", "png", "jpeg"]}
            >
              {({ imageList, onImageUpload, onImageUpdate, dragProps }) => (
                <div className="flex flex-col items-center justify-center space-y-3">
                  {imageList.length == 0 && (
                    <button
                      onClick={onImageUpload}
                      className="w-full md:w-[384px] h-[216px] border-2 border-dashed rounded hover:bg-gray-50"
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
                              onClick={() => onImageUpdate(index)}
                              size="icon"
                              className="rounded-full"
                            >
                              <CloudUpload className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">タイトル</FormLabel>
                <FormControl>
                  <Input placeholder="事業再構築補助金申請支援" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">本文</FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    placeholder="中小企業の事業再構築補助金申請を支援し、無事に採択されました。補助金申請書の作成から事業計画策定まで一貫してサポートしました。"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="font-bold">画像</div>

          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">業界</FormLabel>
                <FormControl>
                  <Input placeholder="製造業" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">ジャンル</FormLabel>
                <FormControl>
                  <Input placeholder="補助金申請支援" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="scope"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">担当範囲</FormLabel>
                <FormControl>
                  <Input
                    placeholder="事業計画策定、申請書作成、ヒアリング対応"
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
              <span>編集する</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default PerformanceEdit
