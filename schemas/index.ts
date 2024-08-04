import { z } from "zod"

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "お名前を入力してください",
  }),
  email: z.string().email({
    message: "メールアドレスを入力してください",
  }),
  password: z.string().min(8, {
    message: "英数字8文字以上で入力してください",
  }),
})

export const LoginSchema = z.object({
  email: z.string().email({
    message: "メールアドレスを入力してください",
  }),
  password: z.string().min(8, {
    message: "英数字8文字以上で入力してください",
  }),
})

export const MainFormSchema = z.object({
  name: z.string().min(1, {
    message: "お名前を入力してください",
  }),
  email: z.string().email({
    message: "メールアドレスを入力してください",
  }),
})

const phoneRegex = /^(0\d{1,4}-\d{1,4}-\d{4})$/
const postcodeRegex = /^\d{3}-\d{4}$/

export const OrderFormSchema = z.object({
  companyName: z.string().min(2, {
    message: "法人名を入力してください",
  }),
  companyPostCode: z.string().regex(postcodeRegex, {
    message: "有効な郵便番号を入力してください（例: 123-4567）",
  }),
  companyPrefecture: z.string().min(2, {
    message: "都道府県を入力してください",
  }),
  companyCity: z.string().min(2, {
    message: "市区町村を入力してください",
  }),
  companyAddress: z.string().min(2, {
    message: "丁目・番地・部屋番号を入力してください",
  }),
  companyPhone: z.union([
    z.string().regex(phoneRegex, {
      message: "有効な電話番号を入力してください（例: 03-1234-5678）",
    }),
    z.literal(""),
  ]),
  budget: z.number().positive({
    message: "予算は数値で入力してください（例: 1000000）",
  }),
})
