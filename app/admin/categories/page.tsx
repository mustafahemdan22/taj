"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import toast from "react-hot-toast";

export const dynamic = "force-dynamic";

export default function AdminCategoriesPage() {
  const categories = useQuery(api.functions.categories.listCategories, {});
  const createCategory = useMutation(api.functions.categories.createCategory);
  const deleteCategoryBySlug = useMutation(
    api.functions.categories.deleteCategoryBySlug
  );

  const [slug, setSlug] = useState("");
  const [name, setName] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [heroImagePublicId, setHeroImagePublicId] = useState("");

  const normalizedSlug = useMemo(() => slug.trim().toLowerCase(), [slug]);

  const onCreate = async () => {
    try {
      await createCategory({
        slug: normalizedSlug,
        name: name.trim(),
        nameEn: nameEn.trim(),
        heroImagePublicId: heroImagePublicId.trim(),
      });
      toast.success("Category created");
      setSlug("");
      setName("");
      setNameEn("");
      setHeroImagePublicId("");
    } catch (e: any) {
      toast.error(e?.message || "Failed to create category");
    }
  };

  const onDelete = async (slugToDelete: string) => {
    try {
      await deleteCategoryBySlug({ slug: slugToDelete });
      toast.success("Category deleted");
    } catch (e: any) {
      toast.error(e?.message || "Failed to delete category");
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">
          Categories
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Stored in Convex; hero image is Cloudinary public_id.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 shadow-lg space-y-4">
        <div className="text-xl font-bold text-gray-900 dark:text-white">
          Add Category
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder='slug (e.g. "viscose")'
            className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
          <input
            value={heroImagePublicId}
            onChange={(e) => setHeroImagePublicId(e.target.value)}
            placeholder='heroImagePublicId (e.g. "taj-scarf/categories/viscose/header")'
            className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="name (Arabic)"
            className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
          <input
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            placeholder="nameEn (English)"
            className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
        </div>

        <button
          onClick={onCreate}
          disabled={
            !normalizedSlug || !name.trim() || !nameEn.trim() || !heroImagePublicId.trim()
          }
          className="px-6 py-3 rounded-xl bg-zinc-900 text-white font-semibold disabled:opacity-50"
        >
          Create
        </button>
      </div>

      <div className="space-y-3">
        <div className="text-xl font-bold text-gray-900 dark:text-white">
          Existing
        </div>

        {categories === undefined ? (
          <div className="text-gray-600 dark:text-gray-400">Loading…</div>
        ) : categories.length === 0 ? (
          <div className="text-gray-600 dark:text-gray-400">
            No categories yet.
          </div>
        ) : (
          <div className="space-y-2">
            {categories.map((c: any) => (
              <div
                key={c._id}
                className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700"
              >
                <div className="min-w-0">
                  <div className="font-bold text-gray-900 dark:text-white">
                    {c.slug} — {c.nameEn}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 truncate">
                    {c.heroImagePublicId}
                  </div>
                </div>
                <button
                  onClick={() => onDelete(c.slug)}
                  className="px-4 py-2 rounded-xl border border-red-300 text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

