import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getSiteSettings } from "@/lib/siteSettings";
import LoginForm from "@/components/admin/LoginForm";

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) {
    redirect("/admin");
  }

  const settings = await getSiteSettings();

  return (
    <div className="flex min-h-screen items-center justify-center bg-brown-50 px-6">
      <div className="w-full max-w-sm rounded-xl border border-brown-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex justify-center">
          {settings.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={settings.logoUrl}
              alt="Özkar Grup Rent a Car"
              className="h-24 w-auto object-contain"
            />
          ) : (
            <span className="text-2xl font-bold text-brown-700">
              Özkar Grup <span className="text-brown-400">Rent a Car</span>
            </span>
          )}
        </div>
        <h1 className="mb-6 text-center text-xl font-bold text-brown-700">Admin Girişi</h1>
        <LoginForm />
      </div>
    </div>
  );
}

