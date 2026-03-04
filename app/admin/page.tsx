import Link from "next/link";

export const dynamic = "force-dynamic";

export default function AdminHomePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage categories and products.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/categories"
          className="p-6 rounded-2xl bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition"
        >
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            Categories
          </div>
          <div className="text-gray-600 dark:text-gray-400 mt-1">
            Add / delete categories
          </div>
        </Link>
        <Link
          href="/admin/products"
          className="p-6 rounded-2xl bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition"
        >
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            Products
          </div>
          <div className="text-gray-600 dark:text-gray-400 mt-1">
            Add / delete products
          </div>
        </Link>
      </div>
    </div>
  );
}

