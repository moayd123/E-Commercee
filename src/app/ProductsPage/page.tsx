


"use client";
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Package, ShoppingCart, Star } from 'lucide-react';


export default function AllProductsPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center">Loading Products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const brandId = searchParams.get('brand');
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getProducts() {
    try {
      setLoading(true);
      
      const url = brandId 
        ? `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`
        : `https://ecommerce.routemisr.com/api/v1/products`;
        
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, [brandId]);

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Hero Section (نفس الـ UI اللي إنت عاوزه) */}
      <section className="bg-gradient-to-r from-[#19c656] to-[#2bd97e] py-14">
        <div className="container mx-auto px-6 lg:px-16">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-white/90 text-sm mb-6 font-medium">
            <Link href="/" className="hover:text-white transition-all hover:underline underline-offset-4">
              Home
            </Link>
            <span className="opacity-60">/</span>
            <span className="text-white font-bold">Shop</span>
          </nav>

          {/* Content */}
          <div className="flex items-center gap-5">
            <div className="bg-white/15 p-4 rounded-2xl backdrop-blur-md border border-white/10 shadow-lg">
              <Package className="w-10 h-10 text-white" strokeWidth={2} />
            </div>

            <div className="text-white">
              <h1 className="text-4xl font-black tracking-tight mb-1">
                {brandId ? "Brand Collection" : "All Products"}
              </h1>
              <p className="text-white/80 font-medium">
                {brandId ? "Showing results for your selected brand" : "Explore our complete product collection"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/*Products Grid */}
      <main className="container mx-auto px-6 lg:px-16 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 animate-pulse rounded-2xl"></div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product: any) => (
              <div key={product._id} className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative">
                
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <img 
                    src={product.imageCover} 
                    alt={product.title} 
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Product Details */}
                <div className="p-5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-green-600 mb-1 block">
                    {product.category.name}
                  </span>
                  <h3 className="font-bold text-gray-800 line-clamp-1 mb-2">
                    {product.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <p className="text-sm text-gray-400 line-through">{(product.price * 1.2).toFixed(0)} EGP</p>
                      <p className="text-lg font-black text-green-600">{product.price} EGP</p>
                    </div>
                    
                    <button className="bg-gray-900 text-white p-3 rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-gray-200">
                      <ShoppingCart size={20} />
                    </button>
                  </div>

                  <div className="flex items-center gap-1 mt-3">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-bold text-gray-600">{product.ratingsAverage}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
            <p className="text-gray-400 text-lg">No products found for this brand.</p>
            <Link href="/brands" className="text-green-600 font-bold underline mt-4 inline-block">Go back to brands</Link>
          </div>
        )}
      </main>
    </div>
  );
}