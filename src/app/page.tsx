import { strict } from 'assert';
import React, { lazy, Suspense } from 'react'
import { FaRegEye, FaRegHeart, FaStar } from 'react-icons/fa';
import ProductCard from './_components/ProductCard';
import { ProductType } from '@/types/Product.type';
import { getAllProducts } from '@/services/Products';
import image1 from "@/images/19b048dcec278f9d9c89514b670e0d9f8909f6dc.png"
import image2 from "@/images/19b048dcec278f9d9c89514b670e0d9f8909f6dc.png"
import image3 from "@/images/19b048dcec278f9d9c89514b670e0d9f8909f6dc.png"
import MySlider from './_components/MySlider';
import { Circles } from 'react-loader-spinner';
import { Mail, Smartphone, Truck, RotateCcw, ShieldCheck } from 'lucide-react'; // أيقونات جديدة
import { Button } from '@/components/ui/button';
import { getMyToken } from '@/utils/getMyToken';

const ShopByCategoryAsLazyComp = lazy(() => import("./_components/ShopByCategory"))
const images = [image1.src, image2.src, image3.src]

export default async function Home() {
  const products = await getAllProducts()
getMyToken()
  return (
    <>
      <MySlider listOfImages={images} slidesPerView={1} />

      <Suspense fallback={
        <div className='bg-gray-200 h-screen flex items-center justify-center'>
          <Circles height="80" width="80" color="#e9231c" visible={true} />
        </div>
      }>
        <ShopByCategoryAsLazyComp />
      </Suspense>

      <br />
      <h2 className='text-2xl font-bold flex items-center gap-2 text-gray-800 ml-30'>
        <span className='w-1.5 h-8 bg-[#16a34a] rounded-full inline-block'></span>
        Featured <span className='text-[#16a34a]'>Products</span>
      </h2>
      <br />

      {/* Grid المنتجات */}
      <div className='container w-10/12 mx-auto bg-slate-50 p-5 grid gap-5 md:grid-cols-4 xl:grid-cols-5 rounded-3xl'>
        {products?.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>

      {/* --- بداية سيكشن الـ Newsletter & App Promo (من الصورة) --- */}
      <section className="w-10/12 mx-auto my-20">
        <div className="bg-[#f0f9f4] rounded-[40px] p-8 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
          
          {/* محتوى الـ Newsletter */}
          <div className="flex-1 space-y-6 z-10">
            <div className="flex items-center gap-3">
              <div className="bg-[#0aad0a] p-3 rounded-2xl shadow-lg shadow-emerald-200">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none">Newsletter</span>
                <span className="text-xs text-gray-400 font-bold">50,000+ subscribers</span>
              </div>
            </div>

            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
              Get the Freshest Updates <span className="text-[#0aad0a]">Delivered Free</span>
            </h2>
            
            <p className="text-gray-500 font-medium text-sm">
              Weekly recipes, seasonal offers & exclusive member perks.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <input 
                type="email" 
                placeholder="you@example.com" 
                className="flex-1 bg-white border-none h-14 px-6 rounded-2xl shadow-sm focus:ring-2 focus:ring-emerald-500 outline-none text-gray-700"
              />
              <Button className="bg-[#0aad0a] hover:bg-emerald-700 h-14 px-8 rounded-2xl text-white font-bold transition-all active:scale-95">
                Subscribe →
              </Button>
            </div>
          </div>

          {/* بوكس الأبلكيشن الأسود */}
          <div className="w-full lg:w-[380px] bg-[#1a222e] rounded-[32px] p-8 text-white shadow-2xl z-10">
            <div className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full mb-6 uppercase">
              <span className="flex items-center gap-1"><Smartphone size={12}/> Mobile App</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Shop Faster on Our App</h3>
            <p className="text-gray-400 text-[13px] mb-6">Get app-exclusive deals & 15% off your first order.</p>

            <div className="space-y-3">
              <button className="w-full bg-[#2a3441] hover:bg-[#343e4d] flex items-center gap-4 p-3 rounded-xl transition-all border border-white/5">
                <div className="text-left">
                  <p className="text-[9px] text-gray-400 font-bold uppercase">Download on</p>
                  <p className="text-base font-bold">App Store</p>
                </div>
              </button>
              <button className="w-full bg-[#2a3441] hover:bg-[#343e4d] flex items-center gap-4 p-3 rounded-xl transition-all border border-white/5">
                <div className="text-left">
                  <p className="text-[9px] text-gray-400 font-bold uppercase">Get it on</p>
                  <p className="text-base font-bold">Google Play</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* أيقونات الثقة - Footer Features */}
      
      </section>
      {/* --- نهاية السيكشن --- */}
    </>
  )
}