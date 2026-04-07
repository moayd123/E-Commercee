// "use client";

// import React, { createContext, ReactNode, useState } from 'react';
// // افترضت إن عندك Types للـ Wishlist زي الكارت
// // لو مش عندك ممكن تستخدم any مؤقتاً أو تنشئ الملف الخاص بيهم
// import { WishlistItemType, WishlistResType } from '@/types/wishlist.type';

// export const wishlistContext = createContext<any>(null);

// export default function WishlistContextProvider({ 
//   children, 
//   userWishlist 
// }: { 
//   children: ReactNode, 
//   userWishlist: any // أو WishlistResType حسب الـ Type اللي عندك
// }) {

//   // 1. عدد منتجات الـ Wishlist
//   // ملحوظة: الـ API بتاع Route أحياناً بيرجع العدد في count أو data.length
//   const [wishlistCount, setWishlistCount] = useState(userWishlist?.count || 0);

//   // 2. قائمة المنتجات
//   const [wishlistProducts, setWishlistProducts] = useState<any[]>(userWishlist?.data || []);

//   return (
//     <wishlistContext.Provider value={{ 
//       wishlistCount, 
//       setWishlistCount, 
//       wishlistProducts, 
//       setwishlistProducts: setWishlistProducts 
//     }}>
//       {children}
//     </wishlistContext.Provider>
//   );
// }











// "use client";

// import React, { createContext, ReactNode, useState, useEffect } from 'react';
// import axios from 'axios';

// export const wishlistContext = createContext<any>(null);

// export default function WishlistContextProvider({ children }: { children: ReactNode }) {
//   const [wishlistCount, setWishlistCount] = useState(0);
//   const [wishlistProducts, setWishlistProducts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   // سحب التوكن من الـ LocalStorage (لازم تتأكد إنه موجود قبل أي Request)
//   const getHeaders = () => ({
//     token: localStorage.getItem('userToken') || ""
//   });

//   // 1️⃣ دالة جلب قائمة التمنيات (Get Wishlist)
//   async function getLoggedUserWishlist() {
//     try {
//       const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
//         headers: getHeaders()
//       });
//       if (data.status === "success") {
//         setWishlistProducts(data.data);
//         setWishlistCount(data.count);
//       }
//     } catch (error) {
//       console.error("Wishlist fetch error:", error);
//     }
//   }

//   // 2️⃣ دالة إضافة منتج (Add to Wishlist)
//   async function addToWishlist(productId: string) {
//     try {
//       const { data } = await axios.post(
//         `https://ecommerce.routemisr.com/api/v1/wishlist`,
//         { productId },
//         { headers: getHeaders() }
//       );
//       if (data.status === "success") {
//         // بعد الإضافة بنجيب البيانات تاني عشان نضمن التزامن مع الـ Server
//         await getLoggedUserWishlist();
//         return data; // بنرجعه عشان نستخدمه في الـ Toast مثلاً
//       }
//     } catch (error) {
//       console.error("Add to wishlist error:", error);
//     }
//   }

//   // 3️⃣ دالة حذف منتج (Remove from Wishlist)
//   async function removeFromWishlist(productId: string) {
//     try {
//       const { data } = await axios.delete(
//         `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
//         { headers: getHeaders() }
//       );
//       if (data.status === "success") {
//         // تحديث الـ UI فوراً بفلترة المنتج المحذوف
//         setWishlistProducts((prev) => prev.filter((item) => item._id !== productId));
//         setWishlistCount((prev) => prev - 1);
//         return data;
//       }
//     } catch (error) {
//       console.error("Remove from wishlist error:", error);
//     }
//   }

//   // أول ما الـ Provider يشتغل بنجيب البيانات من الـ API
//   useEffect(() => {
//     if (localStorage.getItem('userToken')) {
//       getLoggedUserWishlist();
//     }
//   }, []);

//   return (
//     <wishlistContext.Provider value={{ 
//       wishlistCount, 
//       wishlistProducts, 
//       addToWishlist, 
//       removeFromWishlist,
//       getLoggedUserWishlist 
//     }}>
//       {children}
//     </wishlistContext.Provider>
//   );
// }   





"use client";

import React, { createContext, ReactNode, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

export const wishlistContext = createContext<any>(null);

export default function WishlistContextProvider({ 
  children, 
  userWishlist 
}: { 
  children: ReactNode, 
  userWishlist: any 
}) {
  // 1. القيمة الأولية جاية من السيرفر (زي الكارت بالظبط)
  const [wishlistCount, setWishlistCount] = useState(userWishlist?.count || 0);
  const [wishlistProducts, setWishlistProducts] = useState<any[]>(userWishlist?.data || []);

  // دالة لجلب البيانات وتحديث الـ State (تُستدعى بعد الإضافة أو الحذف)
  async function refreshWishlist() {
    const token = localStorage.getItem('userToken');
    if (!token) return;
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: { token }
      });
      if (data.status === "success") {
        setWishlistProducts(data.data);
        setWishlistCount(data.count);
      }
    } catch (err) {
      console.error("Error refreshing wishlist", err);
    }
  }

  // 2. دالة الإضافة (تحدث الـ Navbar والقلب فوراً)
  async function addToWishlist(productId: string) {
  // 1. نجيب التوكن "جوه" الدالة بالظبط
  const token = localStorage.getItem('userToken');
  
  // 2. سطر مهم جداً للتأكد.. افتح الـ Console وشوف هل بيطبع التوكن ولا null؟
  console.log("Current Token in Client:", token);

  if (!token) {
    toast.error("You must be logged in first!");
    return;
  }

  try {
    const { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      { productId }, // الـ Body
      { 
        headers: { 
          token: token // التأكد إن الاسم 'token' مش 'Authorization'
        } 
      }
    );

    if (data.status === "success") {
      // ✅ تحديث الـ UI فوراً بدل ما نستنى الـ API التاني
      // بنضيف المنتج الجديد للـ Array عشان القلب ينور أحمر فوراً
      await refreshWishlist(); 
      toast.success(data.message);
      return data;
    }
  } catch (err: any) {
    console.error("API Error Details:", err.response?.data);
    if (err.response?.status === 401) {
      toast.error("Session expired, please login again");
    }
  }
}

  // 3. دالة الحذف
  async function removeFromWishlist(productId: string) {
    const token = localStorage.getItem('userToken');
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers: { token } }
      );
      if (data.status === "success") {
        await refreshWishlist(); // تحديث القائمة والعدد فوراً
        return data;
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <wishlistContext.Provider value={{ 
     wishlistCount,      
    wishlistProducts,   
    addToWishlist, 
    removeFromWishlist
    }}>
      {children}
    </wishlistContext.Provider>
  );
}