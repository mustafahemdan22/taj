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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categoryAssets.products.map((product, index) => (
            <div 
              key={`${slug}-product-${index}`}
              className="group cursor-pointer relative rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                
                {/* Dynamic Optional Badge */}
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10 transition-transform transform group-hover:scale-110">
                    {product.badge}
                  </div>
                )}

                {/* Smooth Hover Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-colors duration-300 flex items-end">
                  <div className="w-full p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
                    <button className="w-full bg-white text-zinc-900 font-semibold py-3 rounded-lg shadow-lg hover:bg-zinc-100 transition-colors">
                      Quick View
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic Product Metadata */}
              <div className="p-5 flex flex-col justify-between h-[120px]">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                    {product.title}
                  </h3>
                  {product.subtitle && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                      {product.subtitle}
                    </p>
                  )}
                </div>
                {product.price && (
                  <div className="text-zinc-900 dark:text-white font-bold text-lg mt-2">
                    {product.price}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Empty State Fallback */}
          {categoryAssets.products.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No product images found for this category yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
