import { Button } from '@/components/ui/button';
import { getProductById } from '@/services/Products';
import React from 'react';
import { FaStar, FaPlus, FaMinus, FaRegHeart } from 'react-icons/fa';
import { ShoppingCart, Zap, Share2 } from 'lucide-react';
import ProductGallery from '@/app/_components/ProductGallery';
import Features from '@/app/_components/Features'; // استيراد المكون الجديد

export default async function ProductPage({ params }) {
    const { id } = await params;
    const product = await getProductById(id);

    return (
        <div className="min-h-screen bg-white py-12">
            <div className="w-11/12 lg:w-10/12 mx-auto">
                
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
                    
                  
                    <ProductGallery
                        images={product?.images || []} 
                        mainImage={product?.imageCover} 
                    />

                   
                    <div className="flex flex-col gap-6">
                        <div className="flex gap-2">
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase">
                                {product?.category?.name}
                            </span>
                            <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full uppercase">
                                {product?.brand?.name}
                            </span>
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                            {product?.title}
                        </h1>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} size={14} className={i < Math.floor(product?.ratingsAverage) ? 'fill-current' : 'text-gray-200'} />
                                ))}
                            </div>
                            <span className="text-sm font-semibold text-gray-500">
                                {product?.ratingsAverage} <span className="text-gray-400 font-normal">({product?.ratingsQuantity} reviews)</span>
                            </span>
                        </div>

                        <div className="border-b border-gray-100 pb-6">
                            <div className="flex items-baseline gap-3">
                                <span className="text-4xl font-black text-gray-900">{product?.price} EGP</span>
                                {product?.priceAfterDiscount && (
                                    <span className="text-xl text-gray-400 line-through">{product?.price + 200} EGP</span>
                                )}
                            </div>
                            <span className="inline-block mt-4 bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                                ● In Stock
                            </span>
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed">
                            {product?.description}
                        </p>

                      
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-6">
                                <span className="text-sm font-bold text-gray-700">Quantity</span>
                                <div className="flex items-center border border-gray-200 rounded-lg">
                                    <button className="p-3 hover:bg-gray-50"><FaMinus size={12}/></button>
                                    <span className="px-6 font-bold border-x border-gray-200">1</span>
                                    <button className="p-3 hover:bg-gray-50"><FaPlus size={12}/></button>
                                </div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-2xl flex justify-between items-center border border-gray-100">
                                <span className="text-gray-600 font-medium">Total Price:</span>
                                <span className="text-2xl font-black text-[#16a34a]">{product?.price} EGP</span>
                            </div>
                        </div>

                    
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Button className="bg-[#16a34a] hover:bg-emerald-700 h-14 text-lg font-bold rounded-xl flex items-center gap-2">
                                <ShoppingCart size={20}/> Add to Cart
                            </Button>
                            <Button variant="secondary" className="bg-slate-900 hover:bg-slate-800 text-white h-14 text-lg font-bold rounded-xl flex items-center gap-2">
                                <Zap size={20}/> Buy Now
                            </Button>
                        </div>

                        
                        <div className="flex items-center gap-6 pt-4 border-t border-gray-50">
                            <button className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-emerald-600 transition-colors">
                                <FaRegHeart size={18}/> Wishlist
                            </button>
                            <button className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-emerald-600 transition-colors">
                                <Share2 size={18}/> Share
                            </button>
                        </div>
                    </div>
                </div>

                
                
                
            </div>
        </div>
    );
}