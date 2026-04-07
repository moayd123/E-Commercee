"use client";

import React, { useContext } from "react";
// import { wishlistContext } from "@/context/wishlistContext"; 
import { Trash2, ShoppingCart, Heart } from "lucide-react";
import Link from "next/link";
import { wishlistContext } from "../_context/WishlistContextProvider";

export default function WishlistPage() {
  // Context
  const { wishlistProducts, wishlistCount, removeFromWishlist } = useContext(wishlistContext);

  
  const handleDelete = async (id: string) => {
    await removeFromWishlist(id);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-12 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-green-600 transition">Home</Link> / Wishlist
        </nav>

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <div className="bg-red-50 p-2 rounded-full shadow-sm">
              <Heart className="text-red-500 fill-red-500" size={22} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
          </div>
          <p className="text-gray-500 text-sm ml-12 font-medium">
            {wishlistCount} items saved in your list
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100 overflow-hidden">
          
          {/* Table Header (Desktop Only) */}
          <div className="hidden md:flex bg-gray-50/50 border-b border-gray-100 p-5 text-gray-400 font-semibold text-xs uppercase tracking-wider">
            <div className="w-1/2">Product Details</div>
            <div className="w-1/6 text-center">Unit Price</div>
            <div className="w-1/6 text-center">Stock Status</div>
            <div className="w-1/6 text-right pr-6">Actions</div>
          </div>

          {/* Products List */}
          <div className="divide-y divide-gray-50">
            {wishlistProducts && wishlistProducts.length > 0 ? (
              wishlistProducts.map((product: any) => (
                <div 
                  key={product._id} 
                  className="flex flex-col md:flex-row items-center p-6 hover:bg-gray-50/30 transition-colors duration-200"
                >
                  {/* 1. Product Info */}
                  <div className="flex items-center gap-5 w-full md:w-1/2 mb-4 md:mb-0">
                    <div className="w-24 h-24 flex-shrink-0 border border-gray-100 rounded-xl overflow-hidden bg-white p-2 group">
                      <img 
                        src={product.imageCover} 
                        alt={product.title} 
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" 
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg leading-snug line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-sm text-green-600 font-medium mt-1">
                        {product.category?.name || "General"}
                      </p>
                    </div>
                  </div>

                  {/* 2. Price */}
                  <div className="w-full md:w-1/6 text-center mb-4 md:mb-0">
                    <span className="text-lg font-bold text-gray-900">
                      {product.price.toLocaleString()} <span className="text-xs font-normal">EGP</span>
                    </span>
                  </div>

                  {/* 3. Status */}
                  <div className="w-full md:w-1/6 text-center mb-4 md:mb-0">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-100">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                      In Stock
                    </span>
                  </div>

                  {/* 4. Actions */}
                  <div className="w-full md:w-1/6 flex items-center justify-end gap-3">
                    <button 
                      className="flex-1 md:flex-none bg-[#0aad0a] text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#089108] active:scale-95 transition-all shadow-md shadow-green-100"
                    >
                      <ShoppingCart size={16} /> Add to Cart
                    </button>
                    <button 
                      onClick={() => handleDelete(product._id)}
                      className="p-2.5 border border-gray-200 rounded-xl text-gray-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all duration-200"
                      title="Remove from wishlist"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center">
                <div className="mb-4 flex justify-center text-gray-200">
                   <Heart size={80} strokeWidth={1} />
                </div>
                <h2 className="text-xl font-semibold text-gray-700">Your wishlist is empty</h2>
                <p className="text-gray-400 mt-2">Looks like you haven't added anything yet.</p>
                <Link href="/" className="mt-6 inline-block bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition">
                  Explore Products
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Footer Action */}
        <div className="mt-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 transition font-semibold text-sm"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}