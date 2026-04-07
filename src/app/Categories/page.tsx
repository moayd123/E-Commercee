"use client"
import React, { useEffect, useState } from 'react'
import { LayoutGrid } from 'lucide-react' 
import Link from 'next/link'

interface Category {
  _id: string;
  name: string;
  image: string;
  slug: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  async function getCategories() {
    try {
      setLoading(true)
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories")
      const data = await res.json()
      setCategories(data.data)
    } catch (error) {
      console.error("Error fetching categories:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Green Header Section */}
      <div className="bg-gradient-to-r from-[#19c656] to-[#2bd97e] pt-16 pb-24 px-4 md:px-10 mb-[-60px]">
        <div className="max-w-7xl mx-auto">
          <nav className="text-white/80 text-xs mb-4">
            Home / <span className="font-bold text-white">Categories</span>
          </nav>
          
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg border border-white/10">
              <LayoutGrid className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tight">All Categories</h1>
              <p className="text-white/90 mt-1 font-medium">Browse our wide range of product categories</p>
            </div>
          </div>
        </div>
      </div>
<br />
<br />
      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 mt-10">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-64 bg-slate-200 animate-pulse rounded-2xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
              <Link
                href={`/subcategories/${category._id}`}
                key={category._id}
                className="group bg-white border border-slate-100 p-2 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center cursor-pointer overflow-hidden"
              >
                {/* Category Image Box */}
                <div className="w-full aspect-[4/5] relative rounded-xl overflow-hidden mb-4 bg-slate-50">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                </div>

                {/* Category Name */}
                <div className="pb-4 text-center">
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-[#19c656] transition-colors">
                    {category.name}
                  </h3>
                  <span className="text-[10px] text-[#19c656] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    View Subcategories →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}