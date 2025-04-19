"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import SubmitButton from "@/components/ui/button/SubmitButton"

// フォームフィールドの型定義
interface FormField {
  label: string
  name: string
  type: "text" | "email" | "tel" | "textarea" | "select"
  placeholder?: string
  required: boolean
  options?: { value: string; label: string }[]
}

const formFields: FormField[] = [
  {
    label: "お問い合わせ内容",
    name: "inquiryType",
    type: "select",
    options: [
      { value: "", label: "以下から選択してください" },
      { value: "inquiry1", label: "お問い合わせ内容1" },
      { value: "inquiry2", label: "お問い合わせ内容2" },
      { value: "inquiry3", label: "お問い合わせ内容3" },
    ],
    required: true,
  },
  {
    label: "会社名",
    name: "company",
    type: "text",
    placeholder: "株式会社〇〇",
    required: false,
  },
  {
    label: "姓",
    name: "lastName",
    type: "text",
    placeholder: "田中",
    required: true,
  },
  {
    label: "名",
    name: "firstName",
    type: "text",
    placeholder: "太郎",
    required: true,
  },
  {
    label: "所属部署名",
    name: "department",
    type: "text",
    placeholder: "所属部署名をご入力ください",
    required: false,
  },
  {
    label: "役職",
    name: "position",
    type: "text",
    placeholder: "役職名をご入力ください",
    required: false,
  },
  {
    label: "メールアドレス",
    name: "email",
    type: "email",
    placeholder: "example@example.com",
    required: true,
  },
  {
    label: "電話番号",
    name: "phone",
    type: "tel",
    placeholder: "03-1234-5678",
    required: true,
  },
  {
    label: "ご検討中のサービス",
    name: "serviceType",
    type: "select",
    options: [
      { value: "", label: "以下から選択してください" },
      { value: "service1", label: "ご検討中のサービス1" },
      { value: "service2", label: "ご検討中のサービス2" },
      { value: "service3", label: "ご検討中のサービス3" },
    ],
    required: true,
  },
  {
    label: "本文",
    name: "message",
    type: "textarea",
    placeholder: "お問い合わせ内容をご入力ください",
    required: true,
  },
]

// 初期値を動的に設定
const initialFormData: Record<string, string> = {}
formFields.forEach((field) => {
  initialFormData[field.name] = ""
})

const ContactForm = () => {
  const [formData, setFormData] = useState(initialFormData)
  const [loading, setLoading] = useState(false)
  const [responseMessage, setResponseMessage] = useState("")
  const router = useRouter()

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResponseMessage("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        router.push("/contact/thanks")
      } else {
        const data = await res.json()
        setResponseMessage(data.error || "送信に失敗しました。")
      }
    } catch (error) {
      setResponseMessage("エラーが発生しました。")
    } finally {
      setLoading(false)
    }
  }

  return (
    <article className="md:w-[700px]  h-auto pt-16 pb-20 md:pt-10 md:pb-[134px]">
      <section>
        <p className="text-sm md:text-base ![line-height:200%] tracking-[0.03em] whitespace-pre-line">
          必須項目を全てご入力の上「送信ボタン」を押して、フォームを送信してください。
        </p>
      </section>

      <section className=" md:w-[700px]   text-sm md:text-base mt-10 md:mt-10">
        {responseMessage && <p className="text-red-500">{responseMessage}</p>}
        <form onSubmit={handleSubmit}>
          {formFields.map((field) => (
            <div key={field.name} className="mb-6 md:mb-6 w-full">
              <label className="text-sm md:text-base block font-normal mb-1 md:mb-2 ![line-height:200%]">
                {field.label}{" "}
                {field.required && <span className="text-red-500">(必須)</span>}
              </label>

              {field.type === "select" && field.options && (
                <select
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="w-full py-2 md:py-3 px-3 md:px-4 border appearance-none bg-[length:16px_10px] md:bg-[length:22px_10px] bg-[right_1.5rem_center] bg-no-repeat text-base md:text-lg"
                  required={field.required}
                >
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}

              {field.type !== "select" && (
                <>
                  {field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required={field.required}
                      rows={7}
                      className="w-full py-3 md:py-4 px-3 md:px-4 border h-[244px] md:h-[240px]"
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="w-full py-2 md:py-3 px-3 md:px-4 border ![line-height:170%]"
                    />
                  )}
                </>
              )}
            </div>
          ))}
          <div className="flex justify-center mt-6 md:mt-6">
            <SubmitButton loading={loading} />
          </div>
          <p className="text-center mx-auto ![line-height:170%] text-xs md:text-sm mt-6 md:mt-16 tracking-[0.05em] whitespace-pre-line">
            上記ボタンを押すことで、利用規約および、当社のサービス等に関する情報を提供する目的で、
            <br />
            送信された個人情報を保管・処理することに同意したものとみなされます。
            <br />
            お客様はこれらの情報提供をいつでも停止できます。
            <br />
            個人情報の開示や削除依頼等のお問い合わせ先、およびお客様の個人情報を尊重して保護するための弊社取り組みについては、
            <br />
            プライバシーポリシーをご覧ください。
          </p>
        </form>
      </section>
    </article>
  )
}

export default ContactForm
