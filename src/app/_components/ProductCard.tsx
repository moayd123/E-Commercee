"use client"; 

import { ProductType } from '@/types/Product.type'
import Link from 'next/link'
import React, { useContext } from 'react'
import { FaRegEye, FaRegHeart, FaHeart, FaStar } from 'react-icons/fa' 
import { IoIosSync } from "react-icons/io";
import AddToCardBtn from './AddToCardBtn';
import { toast } from 'sonner';
import { wishlistContext } from '../_context/WishlistContextProvider';
import { addProductToWishlist } from '../_actions/cart.actions';

interface ProductCardPropsType {
  product: ProductType
}

export default function ProductCard({ product }: ProductCardPropsType) {

  
  const { addToWishlist, removeFromWishlist, wishlistProducts } = useContext(wishlistContext);

  
  const isFav = wishlistProducts?.some((item: any) => (item.id === product.id) || (item._id === product.id));


  const handleWishlist = async () => {
    if (isFav) {
      await removeFromWishlist(product.id);
      toast.error("Removed from Wishlist");
    } else {
      await addToWishlist(product.id);
      toast.success("Added to Wishlist ❤️");
    }
  };

  

  const discountPercentage = product.priceAfterDiscount 
    ? Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100) 
    : 0;

  return (
    <div className='group p-4 border border-gray-100 rounded-xl relative bg-white hover:border-emerald-500 hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col'>
      
      {/* Discount Badge */}
      {product.priceAfterDiscount && (
        <div className='absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm z-10'>
          -{discountPercentage}%
        </div>
      )}

      {/* Side Actions (Buttons) */}
      <div className='absolute top-4 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10'>
        
      
        <button 
          onClick={handleWishlist}
          className={`bg-white border shadow-sm h-8 w-8 rounded-full flex items-center justify-center transition-colors ${isFav ? 'text-red-500 border-red-100' : 'text-gray-600 hover:bg-emerald-500 hover:text-white'}`}
        >
          {isFav ? <FaHeart size={14} /> : <FaRegHeart size={14} />}
        </button>

        <button className='bg-white hover:bg-emerald-500 hover:text-white text-gray-600 border shadow-sm h-8 w-8 rounded-full flex items-center justify-center transition-colors'>
          <IoIosSync size={16} />
        </button>

        <Link href={`/product/${product.id}`} className='bg-white hover:bg-emerald-500 hover:text-white text-gray-600 border shadow-sm h-8 w-8 rounded-full flex items-center justify-center transition-colors'>
          <FaRegEye size={14} />
        </Link>
      </div>

      {/* Product Image */}
      <div className='overflow-hidden mb-3 h-48 flex items-center justify-center'>
        <img 
          src={product.imageCover} 
          alt={product.title} 
          className='max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500' 
        />
      </div>

      {/* Category Name */}
      <p className='text-emerald-600 text-[10px] md:text-xs mb-1 font-medium'>{product.category.name}</p>
      
      {/* Product Title */}
      <h3 className='text-sm font-bold text-gray-800 mb-2 h-10 line-clamp-2'>
        {product.title.split(" ", 3).join(" ")}
      </h3>

      {/* Rating Section */}
      <div className='flex items-center gap-1 mb-4'>
        <div className='flex items-center text-yellow-400'>
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} size={10} className={i < Math.floor(product.ratingsAverage) ? 'fill-current' : 'text-gray-200'} />
          ))}
        </div>
        <span className='text-gray-400 text-xs mt-0.5'>{product.ratingsAverage} ({product.ratingsQuantity || 0})</span>
      </div>

      {/* Price and Add Button */}
      <div className='flex justify-between items-center mt-auto pt-2'>
        <div className='flex flex-col'>
          {product.priceAfterDiscount ? (
            <>
              <span className='text-gray-900 text-sm font-bold'>{product.priceAfterDiscount} EGP</span>
              <span className='text-gray-400 text-[10px] line-through tracking-tighter'>{product.price} EGP</span>
            </>
          ) : (
            <span className='text-gray-900 text-sm font-bold'>{product.price} EGP</span>
          )}
        </div>

        <AddToCardBtn productId={product.id} />
      </div>
    </div>
  )
}