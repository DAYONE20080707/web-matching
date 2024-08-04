import { redirect } from "next/navigation"
import { getAuthUser } from "@/lib/nextauth"
import { getVerifyTokenValidity } from "@/actions/user"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface VerifyPageProps {
  params: {
    token: string
  }
}

// パスワード再発行確認ページ
const VerifyPage = async ({ params }: VerifyPageProps) => {
  const { token } = params

  // 認証情報取得
  const user = await getAuthUser()

  if (user) {
    redirect("/")
  }

  // トークンの有効性を判定
  const result = await getVerifyTokenValidity({ token })

  return (
    <div className="w-[500px] bg-white p-5 rounded-xl">
      {result.error ? (
        <>
          <div className="text-primary text-xl font-bold text-center border-b border-black pb-5 mb-5 mt-3">
            アカウント本登録失敗
          </div>

          <div className="text-center">
            <div>
              アカウント本登録が既に完了しているか、無効なトークンです。
            </div>
            <div className="mb-5">再度、アカウント登録を実施してください。</div>

            <Button asChild className="w-full font-bold">
              <Link href="/signup/user">アカウント登録</Link>
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="text-primary text-xl font-bold text-center border-b border-black pb-5 mb-5 mt-3">
            アカウント本登録完了
          </div>

          <div className="text-center">
            <div>アカウント本登録が完了しました。</div>
            <div className="mb-5">ログイン画面にお進みください。</div>

            <Button asChild className="w-full font-bold">
              <Link href="/login">ログイン</Link>
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default VerifyPage
