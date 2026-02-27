"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiUpload, FiCheckCircle, FiX, FiInfo } from "react-icons/fi";
import toast from "react-hot-toast";
import Image from "next/image";

export default function UploadPage() {
  const products = useQuery(api.functions.products.getProducts);
  const updateProductImage = useMutation(api.functions.products.updateProductImage);
  
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setSelectedFiles(prev => [...prev, ...files]);
    
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  }, []);

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => {
      const newPreviews = [...prev];
      URL.revokeObjectURL(newPreviews[index]);
      return newPreviews.filter((_, i) => i !== index);
    });
  };

  const handleUpload = async () => {
    if (!selectedProductId) {
      toast.error("Please select a product first");
      return;
    }
    if (selectedFiles.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading("Uploading images to Cloudinary...");

    try {
      // 1. Upload to Cloudinary via our API route
      const formData = new FormData();
      for (const file of selectedFiles) {
        formData.append("images", file);
      }

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload to Cloudinary failed");
      }

      const { urls } = await response.json();

      if (!urls || urls.length === 0) {
        throw new Error("No URLs returned from Cloudinary");
      }

      // 2. Save Cloudinary URLs to Convex
      await updateProductImage({
        productId: selectedProductId as any,
        image: urls[0], // Primary image = first uploaded
        images: urls,    // All images
      });

      toast.success("Images uploaded to Cloudinary and saved!", { id: toastId });
      setSelectedFiles([]);
      setPreviews([]);
      setSelectedProductId("");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload failed. Please try again.", { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700"
        >
          <div className="text-center mb-10">
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
              Product Images <span className="text-zinc-500">Uploader</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Upload high-quality images to Cloudinary. They will be automatically optimized for the best quality and performance.
            </p>
          </div>

          <div className="space-y-8">
            {/* Product Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                1. Select Product
              </label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                disabled={isUploading}
                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 dark:border-gray-700 bg-[#EEEFF1] dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-4 focus:ring-zinc-500/20 focus:border-zinc-500 transition-all outline-none appearance-none cursor-pointer"
              >
                <option value="">-- Choose a product --</option>
                {products?.map((p: any) => (
                  <option key={p._id} value={p._id}>
                    {p.name} ({p.brand})
                  </option>
                ))}
              </select>
            </div>

            {/* File Dropzone */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                2. Choose Images
              </label>
              <div className="relative group">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isUploading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="border-4 border-dashed border-gray-100 dark:border-gray-800 rounded-3xl p-12 text-center group-hover:border-zinc-500/50 transition-colors duration-300 bg-[#EEEFF1]/50 dark:bg-gray-900/50">
                  <div className="bg-white dark:bg-gray-800 w-16 h-16 rounded-2xl shadow-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <FiUpload className="w-8 h-8 text-zinc-600" />
                  </div>
                  <p className="text-gray-900 dark:text-white font-bold text-lg mb-1">Click to browse or drag & drop</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">PNG, JPG, WEBP up to 10MB each</p>
                </div>
              </div>
            </div>

            {/* Preview Grid */}
            <AnimatePresence>
              {previews.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-3"
                >
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Selected Files ({previews.length})
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                    {previews.map((preview, index) => (
                      <motion.div
                        key={preview}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative aspect-square rounded-2xl overflow-hidden group shadow-lg border border-gray-100 dark:border-gray-700"
                      >
                        <Image src={preview} alt="preview" fill className="object-cover" />
                        <button
                          onClick={() => removeFile(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="pt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleUpload}
                disabled={isUploading || !selectedProductId || selectedFiles.length === 0}
                className={`w-full py-5 rounded-2xl font-black text-xl shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 ${
                  isUploading || !selectedProductId || selectedFiles.length === 0
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed shadow-none"
                    : "bg-zinc-800 text-white hover:bg-black"
                }`}
              >
                {isUploading ? (
                  <>
                    <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Uploading to Cloudinary...</span>
                  </>
                ) : (
                  <>
                    <FiCheckCircle className="w-6 h-6" />
                    <span>Upload to Cloudinary</span>
                  </>
                )}
              </motion.button>
              
              <div className="mt-6 flex items-start gap-3 p-4 bg-zinc-50 dark:bg-gray-900 border border-zinc-100 dark:border-gray-800 rounded-2xl">
                <FiInfo className="w-5 h-5 text-zinc-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Images are uploaded to Cloudinary CDN with automatic format and quality optimization. The first image becomes the product&apos;s primary display image.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
