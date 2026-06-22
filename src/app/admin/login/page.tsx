import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import LoginForm from "@/components/admin/LoginForm";

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brown-50 px-6">
      <div className="w-full max-w-sm rounded-xl border border-brown-200 bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-center text-xl font-bold text-brown-700">Admin Girişi</h1>
        <LoginForm />
      </div>
    </div>
  );
}
