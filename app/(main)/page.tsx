import MainForm from "@/components/main/MainForm"

// メインページ
const Home = () => {
  return (
    <div>
      <div className="bg-gray-50 py-20">
        <div className="px-3 max-w-screen-lg mx-auto">
          <MainForm />
        </div>
      </div>
    </div>
  )
}

export default Home
