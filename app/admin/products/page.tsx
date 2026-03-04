"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import toast from "react-hot-toast";
import { Id } from "@/convex/_generated/dataModel";

export const dynamic = "force-dynamic";

export default function AdminProductsPage() {
  const categories = useQuery(api.functions.categories.listCategories, {});
  const products = useQuery(api.functions.products.getProducts, {});

  const createProduct = useMutation(api.functions.products.createProduct);
  const deleteProduct = useMutation(api.functions.products.deleteProduct);

  const [category, setCategory] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [name, setName] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("Taj Scarf");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [unit, setUnit] = useState("Piece");
  const [images0, setImages0] = useState("");

  const onCreate = async () => {
    try {
      await createProduct({
        name: name.trim(),
        nameEn: nameEn.trim(),
        price: Number(price),
        images: [images0.trim()],
        category: category.trim(),
        description: description.trim(),
        descriptionEn: descriptionEn.trim(),
        brand: brand.trim(),
        stock: Number(stock),
        unit: unit.trim(),
        rating: 4,
        reviews: 0,
      });
      toast.success("Product created");
      setName("");
      setNameEn("");
      setDescription("");
      setDescriptionEn("");
      setImages0("");
      setPrice(0);
      setStock(0);
    } catch (e: any) {
      toast.error(e?.message || "Failed to create product");
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">
          Products
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Create products storing only Cloudinary public_id in `images[]`.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 shadow-lg space-y-4">
        <div className="text-xl font-bold text-gray-900 dark:text-white">
          Add Product
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          >
            <option value="">Select category</option>
            {(categories || []).map((c: any) => (
              <option key={c._id} value={c.slug}>
                {c.slug}
              </option>
            ))}
          </select>

          <input
            value={images0}
            onChange={(e) => setImages0(e.target.value)}
            placeholder='images[0] public_id (e.g. "taj-scarf/categories/viscose/products/1")'
            className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />

          <input
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            placeholder="nameEn"
            className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="name (Arabic)"
            className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />

          <input
            value={descriptionEn}
            onChange={(e) => setDescriptionEn(e.target.value)}
            placeholder="descriptionEn"
            className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description (Arabic)"
            className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />

          <input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="brand"
            className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
          <input
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            placeholder="unit"
            className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="price"
            className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            placeholder="stock"
            className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
        </div>

        <button
          onClick={onCreate}
          disabled={
            !category.trim() ||
            !name.trim() ||
            !nameEn.trim() ||
            !images0.trim() ||
            !description.trim() ||
            !descriptionEn.trim()
          }
          className="px-6 py-3 rounded-xl bg-zinc-900 text-white font-semibold disabled:opacity-50"
        >
          Create
        </button>
      </div>

      <div className="space-y-3">
        <div className="text-xl font-bold text-gray-900 dark:text-white">
          Existing (read-only)
        </div>
        {products === undefined ? (
          <div className="text-gray-600 dark:text-gray-400">Loading…</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {products.map((p: any) => (
              <div
                key={p._id}
                className="p-4 rounded-2xl bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700"
              >
                <div className="font-bold text-gray-900 dark:text-white">
                  {p.nameEn}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {p.category}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 break-all mt-2">
                  {p.images?.[0]}
                </div>
                <button
                  onClick={async () => {
                    try {
                      await deleteProduct({ productId: p._id as Id<"products"> });
                      toast.success("Product deleted");
                    } catch (e: any) {
                      toast.error(e?.message || "Failed to delete product");
                    }
                  }}
                  className="mt-3 px-4 py-2 rounded-xl border border-red-300 text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
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

