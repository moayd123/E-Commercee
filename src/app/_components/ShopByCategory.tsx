import Link from 'next/link'
import React from 'react'
import { CategoryType } from '@/types/Product.type';
import { getAllCategories } from '@/services/Categories';
import { ChevronRight, ArrowRight } from 'lucide-react';

export default async function ShopByCategory() {
 
  const Categories: CategoryType[] = await getAllCategories()

  return (
    <div className='w-11/12 mx-auto py-10'>
      
      {/*  Header Section */}
      <div className='flex justify-between items-center mb-8'>
        <h2 className='text-2xl font-bold flex items-center gap-2 text-gray-800'> 
          <span className='w-1.5 h-8 bg-[#16a34a] rounded-full inline-block'></span>
          Shop By <span className='text-[#16a34a]'>Category</span> 
        </h2>
        <Link 
          href={"/Categories"} 
          className='text-[#16a34a] font-semibold hover:underline flex items-center gap-1 transition-all'
        > 
          View All Categories <ChevronRight size={18} />
        </Link>
      </div>

      {/*  Categories Grid undefined */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 mb-16'>
        {Categories && Categories.length > 0 ? (
          Categories.map(item => (
            <Link 
              href={`/Categories/${item._id}`} 
              key={item._id} 
              className='group bg-white border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md hover:border-[#16a34a] transition-all duration-300 flex flex-col items-center justify-center'
            > 
              <div className='w-24 h-24 mb-4 overflow-hidden rounded-full bg-gray-50 flex items-center justify-center p-2'>
                 <img 
                   className='w-full h-full object-contain group-hover:scale-110 transition-transform duration-300' 
                   src={item.image} 
                   alt={item.name} 
                 />
              </div>
              <h3 className='text-center text-sm font-semibold text-gray-700 group-hover:text-[#16a34a] transition-colors'> 
                {item.name} 
              </h3>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400">No categories found.</p>
        )}
      </div>

      {/*  Promo Banners Section  */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Banner 1 - Green Gradient */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0aad0a] to-[#008a00] p-10 text-white shadow-lg group">
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
          <div className="relative z-10">
            <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold mb-6 inline-block">🔥 Deal of the Day</span>
            <h2 className="text-3xl font-extrabold mb-2">Fresh Organic Fruits</h2>
            <p className="text-white/80 mb-6 text-sm max-w-[250px]">Get up to 40% off on selected organic fruits</p>
            <div className="flex items-center gap-4 mb-8">
               <span className="text-3xl font-black italic tracking-tighter">40% OFF</span>
               <span className="text-[10px] opacity-70 leading-tight uppercase font-bold">Use code:<br/><span className="text-white text-xs">ORGANIC40</span></span>
            </div>
            <button className="flex items-center gap-2 bg-white text-[#008a00] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all shadow-md group">
              Shop Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Banner 2 - Orange/Red Gradient */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#ff9a00] to-[#ff4d4d] p-10 text-white shadow-lg group">
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
          <div className="relative z-10">
            <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold mb-6 inline-block">✨ New Arrivals</span>
            <h2 className="text-3xl font-extrabold mb-2">Exotic Vegetables</h2>
            <p className="text-white/80 mb-6 text-sm max-w-[250px]">Discover our latest collection of premium vegetables</p>
            <div className="flex items-center gap-4 mb-8">
               <span className="text-3xl font-black italic tracking-tighter">25% OFF</span>
               <span className="text-[10px] opacity-70 leading-tight uppercase font-bold">Use code:<br/><span className="text-white text-xs">FRESH25</span></span>
            </div>
            <button className="flex items-center gap-2 bg-white text-[#ff4d4d] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all shadow-md group">
              Explore Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>

    </div>
  )
}