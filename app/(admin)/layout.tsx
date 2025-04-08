import { redirect } from "next/navigation";
import { getAuthUser } from "@/lib/nextauth";
import NavigationAdmin from "@/components/admin/NavigationAdmin";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = async ({ children }: AdminLayoutProps) => {
  // 認証情報取得
  const user = await getAuthUser();

  if (!user) {
    redirect("/login");
  }

  if (!user.isAdmin) {
    redirect("/");
  }

  return (
    <div className="md:bg-gray-50 min-h-screen py-2 md:py-10 relative">
      <div className="mx-auto md:px-5 md:max-w-[1200px] flex md:space-x-3">
        <NavigationAdmin userName={user.name} />

        <main className="flex-1 min-h-[800px]">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
