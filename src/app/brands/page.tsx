"use client"
import React, { useEffect, useState } from 'react'
import { Tag } from 'lucide-react'
import Link from 'next/link'

interface Brand {
  _id: string;
  name: string;
  image: string;
  slug: string;
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)

  async function getBrands() {
    try {
      setLoading(true)
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/brands")
      const data = await res.json()
      setBrands(data.data)
    } catch (error) {
      console.error("Error fetching brands:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getBrands()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Purple Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-500 pt-16 pb-24 px-4 md:px-10 mb-[-60px]">
        <div className="max-w-7xl mx-auto">
          <nav className="text-purple-100 text-xs mb-4">
            Home / <span className="font-bold text-white">Brands</span>
          </nav>
          
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg">
              <Tag className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white tracking-tight">Top Brands</h1>
              <p className="text-purple-100 mt-1 opacity-90">Shop from your favorite brands</p>
            </div>
          </div>
        </div>
      </div>
<br />
<br/>
      {/* Brands Grid Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 mt-10">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-48 bg-slate-200 animate-pulse rounded-[1.5rem]"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {brands.map((brand) => (
              <Link 
                href={`/ProductsPage?brand=${brand._id}`} // التوجيه لصفحة المنتجات مع الـ ID
                key={brand._id} 
                className="group bg-white border border-slate-100 p-4 rounded-[1.5rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-between cursor-pointer"
              >
                <div className="w-full aspect-square relative flex items-center justify-center bg-slate-50/50 rounded-xl overflow-hidden mb-4">
                  <img 
                    src={brand.image} 
                    alt={brand.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-sm font-semibold text-slate-700 text-center group-hover:text-purple-600 transition-colors">
                  {brand.name}
                </h3>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}