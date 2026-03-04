import { redirect } from "next/navigation";
import { isAdminUser } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Production-safe: during build without Clerk env, don't crash prerender.
  if (!process.env.CLERK_SECRET_KEY) {
    redirect("/");
  }

  const isAdmin = await isAdminUser();
  if (!isAdmin) redirect("/");

  return (
    <div className="min-h-screen bg-[#D1D5DC] dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </div>
    </div>
  );
}

