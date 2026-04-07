
"use client";
import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { cartContext } from '../_context/CartContextProvider';
import { CartItemType } from '@/types/cart.type';
import { deleteItemFromCart, UpdateProcutCart, clearUserCart } from '../_actions/cart.actions'; 
import { toast } from 'sonner';

export default function CartPage() {
  const { cartProducts, totalPriceOfCart, numberOfCartItems, setnumberOfCartItems, settotalPriceOfCart, setcartProducts } = useContext(cartContext);

  
  async function handelDeleteItem(id: string) {
    const res = await deleteItemFromCart(id);
    setcartProducts(res.data.products);
    setnumberOfCartItems(res.numOfCartItems);
    settotalPriceOfCart(res.data.totalCartPrice);
    toast.success("Item removed from cart", { position: "top-center" });
  }

  
  async function handelUpdate(id: string, count: number) {
    if (count < 1) return; 
    const res = await UpdateProcutCart(id, count);

    if (res.status == "success") {
      setcartProducts(res.data.products);
      setnumberOfCartItems(res.numOfCartItems);
      settotalPriceOfCart(res.data.totalCartPrice);
      toast.success("Quantity updated", { position: "top-center" });
    } else {
      toast.error("Error updating quantity");
    }
  }

  
  async function handleClearCart() {
    const res = await clearUserCart();
    if (res.status === "success" || res.message === "success") {
      setcartProducts([]);
      setnumberOfCartItems(0);
      settotalPriceOfCart(0);
      toast.success("Cart cleared successfully", { position: "top-center" });
    } else {
      toast.error("Failed to clear cart");
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8 font-sans text-gray-800">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-600">Home</Link> / <span className="text-black font-medium">Shopping Cart</span>
      </nav>

      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-green-600 p-2 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          </div>
          <h1 className="text-2xl font-bold">Shopping Cart</h1>
        </div>
        <p className="text-green-600 font-semibold mb-6">
          You have <span className="text-green-700">{numberOfCartItems} items</span> in your cart
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            
           
            {cartProducts.length === 0 ? (
              <div className="bg-white p-12 rounded-xl border border-dashed border-gray-300 text-center">
                <p className="text-gray-500 mb-4">Your cart is currently empty.</p>
                <Link href="/" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">Start Shopping</Link>
              </div>
            ) : (
              <>
                {cartProducts.map((item: CartItemType) => (
                  <div key={item.product.id} className="bg-white border border-gray-100 rounded-xl p-4 flex flex-wrap md:flex-nowrap items-center shadow-sm relative">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.product.imageCover} alt={item.product.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="md:ml-6 mt-4 md:mt-0 flex-grow">
                      <h3 className="font-bold text-lg">{item.product.title}</h3>
                      <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">{item.product.category.name}</span>
                      <p className="text-green-600 font-bold mt-2">{item.price} EGP</p>

                      <div className="flex items-center gap-3 mt-3">
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-gray-400 hover:bg-gray-50 disabled:opacity-30" 
                                onClick={() => handelUpdate(item.product.id, item.count - 1)}
                                disabled={item.count <= 1}>-</button>
                        <span className="font-medium">{item.count}</span>
                        <button className="w-8 h-8 flex items-center justify-center bg-green-600 text-white rounded hover:bg-green-700" 
                                onClick={() => handelUpdate(item.product.id, item.count + 1)}>+</button>
                      </div>
                    </div>

                    <div className="absolute bottom-4 right-4 text-right md:static md:ml-auto">
                      <p className="text-xs text-gray-400">Total</p>
                      <p className="font-bold text-blue-900">{item.price * item.count} EGP</p>
                    </div>

                    <button className="absolute top-4 right-4 md:static md:ml-4 p-2 text-red-400 border border-red-50 rounded-lg hover:bg-red-50 transition-colors"
                            onClick={() => handelDeleteItem(item.product.id)}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                ))}

                <div className="flex justify-between items-center mt-6">
                  <Link href="/" className="text-green-600 font-medium flex items-center gap-2 hover:underline">
                    ← Continue Shopping
                  </Link>

                  <button 
                    onClick={handleClearCart}
                    className="text-gray-400 text-sm flex items-center gap-1 hover:text-red-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    Clear all items
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-fit border border-gray-100">
            <div className="bg-[#0f172a] text-white p-4 font-bold text-lg">Order Summary</div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({numberOfCartItems} items)</span>
                <span className="font-semibold text-gray-800"> {totalPriceOfCart} EGP</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 text-sm italic">Calculated at checkout</span>
              </div>
              <hr className="border-gray-100" />
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Estimated Total</span>
                <span className="font-bold text-xl text-green-600">{totalPriceOfCart} EGP</span>
              </div>
 <Link href="/Checkout"><button className="w-full bg-[#1db954] hover:bg-[#1aa34a] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 mt-4 transition-transform active:scale-95 cursor-pointer">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                Login to Checkout 
              </button>
              </Link>
              <p className="text-center text-xs text-gray-400 mt-2">
                Don't have an account? <Link href="/signup" className="hover:text-green-600"><span className="text-green-600 cursor-pointer hover:underline">Sign up</span> </Link>
              </p>

              <div className="mt-6 space-y-2 pt-4 border-t border-gray-50">
                <p className="text-[10px] text-gray-500 flex items-center gap-2">✓ Your cart items will be saved</p>
                <p className="text-[10px] text-gray-500 flex items-center gap-2">✓ Track your orders easily</p>
                <p className="text-[10px] text-gray-500 flex items-center gap-2">✓ Access exclusive member deals</p>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}