'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import Link from 'next/link';
import { shippingAddressType } from '@/types/order.type';
import { createCashOrderr } from '../_actions/orders.acions';

// 1.Zod
const checkoutSchema = z.object({
  city: z.string().min(3, "City name is too short").max(50),
  details: z.string().min(5, "Please provide more address details"),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
});

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isLoading, setIsLoading] = useState(false);
  const [cartDetails, setCartDetails] = useState(null);

  // 2. Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      details: "",
      phone: "",
      city: "",
      type: "cash"
    },
  });

  // Summary
  async function getCartItems() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v2/cart`, {
        headers: { token: localStorage.getItem('userToken') }
      });
      setCartDetails(data.data);
    } catch (err) {
      console.error("Cart fetch error", err);
    }
  }

  useEffect(() => {
    getCartItems();
  }, []);

  
  
// const onSubmit = async (value) => {
//     
//     if (!cartDetails?._id) {
//       alert("Your cart is empty or not loaded yet.");
//       return;
//     }

//     setIsLoading(true);
//     const token = localStorage.getItem('userToken');
//     const baseUrl = "https://ecommerce.routemisr.com/api/v2/orders"; 

//     
//     const endpoint = paymentMethod === 'cash' 
//       ? `${baseUrl}/${cartDetails._id}`
//       : `${baseUrl}/checkout-session/${cartDetails._id}?url=${window.location.origin}`;

//     try {
//       const { data } = await axios.post(endpoint, 
//         { shippingAddress: value },
//         { headers: { token } }
//       );

//       if (data.status === 'success') {
//         if (paymentMethod === 'online') {
//           
//           window.location.href = data.session.url;
//         } else {
//           
//           window.location.href = '/allorders';
//         }
//       }
//     } catch (err) {
//       console.error("Checkout Error:", err.response?.data || err.message);
//       alert(err.response?.data?.message || "Error processing order.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

 const onSubmit = async (value) => {

    
    const finalData = {
      ...value,
      type: paymentMethod 
    };

  
    console.log(value);

   
    if (!cartDetails?._id) {
      alert("Your cart is empty  loaded.");
      return;
// const userData : shippingAddressType = {
//   shippingAddress : {
//     city : value.cite,
// details : value.details,
// phone : value.phone,
// postalCode : value.postalCode
//   }
}

// // createCashOrderr()

//     }


//     async function handleCkout(value) {
//       console.log(value);
//       const userData : shippingAddressType = {
//   shippingAddress : {
//     city : value.cite,
// details : value.details,
// phone : value.phone,
// postalCode : value.postalCode
//   }
// }

// createCashOrderr()


    // }

    setIsLoading(true);
    const token = localStorage.getItem('userToken');
    const baseUrl = "https://ecommerce.routemisr.com/api/v2/orders";

   
    const endpoint = paymentMethod === 'cash' 
      ? `${baseUrl}/${cartDetails._id}`
      : `${baseUrl}/checkout-session/${cartDetails._id}?url=${window.location.origin}`;

    try {
      const { data } = await axios.post(endpoint, 
        { shippingAddress: value }, 
        { headers: { token } }
      );

      if (data.status === 'success') {
        if (paymentMethod === 'online') {
          window.location.href = data.session.url;
        } else {
          window.location.href = '/allorders';
        }
      }
    } catch (err) {
      console.error("Checkout Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Error processing order.");
    } finally {
      setIsLoading(false);
    }
};
  return (
    <div className="bg-[#f8f9fa] min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="bg-green-600 text-white p-1 rounded italic text-sm">FC</span> Complete Your Order
            </h1>
            <p className="text-gray-500 text-sm">Review your items and complete your purchase</p>
          </div>
          <Link href="/shop" className="text-green-700 font-medium hover:underline flex items-center">
            ← Back to Cart
          </Link>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Address Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-[#198754] p-4 text-white font-bold flex items-center gap-2">
                🏠 Shipping Address
              </div>
              <div className="p-6 space-y-4">
                <div className="bg-blue-50 text-blue-700 p-3 rounded-lg text-sm border border-blue-100 italic">
                  ℹ Delivery Information: Please ensure your address is accurate for smooth delivery.
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">City *</label>
                    <input 
                      {...register('city')}
                      placeholder="e.g. Cairo, Alexandria, Giza"
                      className={`w-full p-2.5 border rounded-lg outline-none transition ${errors.city ? 'border-red-500 ring-1 ring-red-200' : 'focus:border-green-500'}`}
                    />
                    {errors.city && <span className="text-red-500 text-xs mt-1">{errors.city.message}</span>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1">Street Address *</label>
                    <textarea 
                      {...register('details')}
                      placeholder="Street name, building, floor..."
                      className={`w-full p-2.5 border rounded-lg outline-none ${errors.details ? 'border-red-500' : 'focus:border-green-500'}`}
                      rows="2"
                    />
                    {errors.details && <span className="text-red-500 text-xs mt-1">{errors.details.message}</span>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1">Phone Number *</label>
                    <input 
                      {...register('phone')}
                      placeholder="01xxxxxxxxx"
                      className={`w-full p-2.5 border rounded-lg outline-none ${errors.phone ? 'border-red-500' : 'focus:border-green-500'}`}
                    />
                    {errors.phone && <span className="text-red-500 text-xs mt-1">{errors.phone.message}</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-[#198754] p-4 text-white font-bold">💳 Payment Method</div>
              <div className="p-6 space-y-3">
                <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition ${paymentMethod === 'cash' ? 'border-green-600 bg-green-50 shadow-sm' : 'hover:bg-gray-50'}`}>
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 flex items-center justify-center rounded-full text-green-700">💵</div>
                      <div>
                        <p className="font-bold text-gray-800 text-sm">Cash on Delivery</p>
                        <p className="text-xs text-gray-500">Pay when your order arrives</p>
                      </div>
                   </div>
                   <input type="radio" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} className="w-5 h-5 accent-green-700" />
                </label>

                <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition ${paymentMethod === 'online' ? 'border-green-600 bg-green-50 shadow-sm' : 'hover:bg-gray-50'}`}>
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 flex items-center justify-center rounded-full text-blue-700">💳</div>
                      <div>
                        <p className="font-bold text-gray-800 text-sm">Pay Online</p>
                        <p className="text-xs text-gray-500">Secure payment via Stripe (Visa/MasterCard)</p>
                      </div>
                   </div>
                   <input type="radio" checked={paymentMethod === 'online'} onChange={() => setPaymentMethod('online')} className="w-5 h-5 accent-green-700" />
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 sticky top-6 overflow-hidden">
              <div className="bg-[#198754] p-4 text-white font-bold">🔒 Order Summary</div>
              <div className="p-5">
                <div className="mb-4 text-sm font-semibold text-gray-500">{cartDetails?.products.length || 0} Items</div>
                
                <div className="max-h-52 overflow-y-auto pr-2 mb-4 space-y-4">
                  {cartDetails?.products.map((item) => (
                    <div key={item._id} className="flex gap-3">
                      <img src={item.product.imageCover} className="w-14 h-14 rounded-lg object-cover border" alt="" />
                      <div className="flex-1">
                        <h4 className="text-xs font-bold line-clamp-1">{item.product.title}</h4>
                        <p className="text-[10px] text-gray-400">{item.count} × {item.price} EGP</p>
                      </div>
                      <span className="text-xs font-black">{item.count * item.price}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-bold">{cartDetails?.totalCartPrice || 0} EGP</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className="text-green-600 font-bold italic">FREE</span>
                  </div>
                  <div className="flex justify-between text-xl font-black border-t pt-4 mt-2">
                    <span>Total</span>
                    <span>{cartDetails?.totalCartPrice || 0} EGP</span>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#198754] text-white py-4 rounded-xl mt-6 font-bold shadow-lg hover:bg-[#157347] active:scale-95 transition disabled:bg-gray-400"
                >
                  {isLoading ? "Processing..." : "Place Order"}
                </button>

                <div className="flex justify-between mt-4 text-[10px] text-gray-400 font-medium">
                  <span>🛡 Secure</span>
                  <span>🚚 Fast Delivery</span>
                  <span>📦 Easy Returns</span>
                </div>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}