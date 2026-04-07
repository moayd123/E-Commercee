"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Folder, LayoutGrid, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SubCategoryPage() {
  const { id } = useParams(); 
  const router = useRouter();
  const [subs, setSubs] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [loading, setLoading] = useState(true);

  async function getCategoryData() {
    try {
      setLoading(true);
      // Subcategories
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
      const data = await res.json();
      setSubs(data.data);

      
      const catRes = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
      const catData = await catRes.json();
      setCategoryName(catData.data.name);
      setCategoryImage(catData.data.image);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) getCategoryData();
  }, [id]);

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* 🟢 Header Section  */}
      <div className="bg-gradient-to-r from-[#19c656] to-[#2bd97e] pt-12 pb-24 px-6 lg:px-16 text-white">
        <div className="max-w-7xl mx-auto">
          
          {/* ✅ Breadcrumbs: Home / Categories / Music */}
          <nav className="flex items-center gap-2 text-xs mb-6 opacity-90 font-medium">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/Categories" className="hover:underline">Categories</Link>
            <span>/</span>
            <span className="font-bold">{categoryName || "..."}</span>
          </nav>

          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-white p-1 rounded-2xl shadow-lg border border-white/20 overflow-hidden flex items-center justify-center">
              {categoryImage ? (
                <img src={categoryImage} alt={categoryName} className="w-full h-full object-cover rounded-xl" />
              ) : (
                <LayoutGrid size={30} className="text-[#19c656]" />
              )}
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tight">{categoryName || "Subcategories"}</h1>
              <p className="opacity-90 mt-1">Choose a subcategory to browse products</p>
            </div>
          </div>
        </div>
      </div>

      {/* ⚪ Content Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 -mt-10 pb-20">
        
        {/* ✅ Back to Categories */}
        <button 
          onClick={() => router.push('/Categories')}
          className="flex items-center gap-2 text-slate-500 hover:text-[#19c656] mb-8 transition-colors text-sm font-bold bg-white px-5 py-2.5 rounded-full shadow-sm w-fit group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Categories
        </button>

        {/* ✅ Subcategories in Music */}
        {!loading && (
          <h2 className="text-xl font-black text-slate-800 mb-8">
            <span className="text-[#19c656]">{subs.length}</span> Subcategories in {categoryName}
          </h2>
        )}

        {/* Grid Content */}
        {loading ? (
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-24 bg-white animate-pulse rounded-2xl" />
              ))}
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subs.map((sub: any) => (
              <Link 
                href={`/allproducts?subcategory=${sub._id}`}
                key={sub._id} 
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
              >
                <div className="p-3 bg-slate-50 rounded-xl text-[#19c656] group-hover:bg-[#19c656] group-hover:text-white transition-colors">
                  <Folder size={24} />
                </div>
                <h3 className="font-bold text-slate-700 group-hover:text-[#19c656] transition-colors">{sub.name}</h3>
              </Link>
            ))}
          </div>
        )}

        {!loading && subs.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border-2 border-dashed border-slate-100">
            <p className="text-slate-400 font-bold text-xl">No subcategories found.</p>
          </div>
        )}
      </div>
    </div>
  );
}