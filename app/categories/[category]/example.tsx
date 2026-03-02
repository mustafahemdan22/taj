import Image from "next/image";
import { getCategoryAssets } from "@/utils/categoryImages";
import { getCategoryName } from "@/convex/translations";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryExamplePage({ params }: CategoryPageProps) {
  const slug = params.category;
  
  // 1. Fetch the strong-typed imagery (Header + Product Items)
  const categoryAssets = getCategoryAssets(slug);
  const categoryName = getCategoryName(slug, "en");

  return (
    <div className="min-h-screen bg-[#D1D5DC] dark:bg-gray-900 pb-20">
      {/* 
        2. Display Header Image 
      */}
      <div className="relative w-full h-[40vh] min-h-[300px] mb-12 shadow-xl">
        <Image
          src={categoryAssets.header}
          alt={`${categoryName} Category Hero`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight capitalize drop-shadow-lg">
            {categoryName}
          </h1>
        </div>
      </div>

      {/* 
        3. Dynamic Product Grid
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Available Designs
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Explore our curated {categoryName} collection
          </p>
        </div>
        <div className="py-20 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            This is an example page. Products are loaded dynamically from Convex.
          </p>
        </div>
      </div>
    </div>
  );
}
