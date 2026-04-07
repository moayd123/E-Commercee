
"use server"
import { cookies } from "next/headers";
import { CartResType } from "@/types/cart.type";
import { getMyToken } from "@/utils/getMyToken";

  export async function addProdutToCart( id : string )  :Promise<CartResType> {

console.log("add to cart");
const token = await getMyToken()

const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart" , {
    method : "POST",
    body : JSON.stringify( { productId : id  } ),
    headers : {
        "Content-Type" : "application/json",
        token : token as string
    }
} )

const finalRes = await res.json()

console.log("finalRes form add to cart" , finalRes );

return finalRes

}

export async function getUserCart()  :Promise<CartResType> {

const token = await getMyToken()

    const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart" , {
        headers : {
            token : token as string
        }
    }) 
     
const finalRes = await res.json()
return finalRes
}

export async function deleteItemFromCart( productId: string )  :Promise<CartResType> {

const token = await getMyToken()

    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${productId}` , {
        headers : {
            token : token as string
        },
        method : "DELETE"
    }) 
     
const finalRes = await res.json()
return finalRes
}


  export async function UpdateProcutCart( id : string  , count : number )  :Promise<CartResType> {


const token = await getMyToken()

const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart/${id}` , {
    method : "PUT",
    body : JSON.stringify( { count   } ),
    headers : {
        "Content-Type" : "application/json",
        token : token as string
    }
} )


const finalRes = await res.json()

console.log("finalRes form add to cart" , finalRes );

return finalRes

}


export async function clearUserCart(): Promise<CartResType> {
    const token = await getMyToken();

    const res = await fetch("https://ecommerce.routemisr.com/api/v2/cart", {
        method: "DELETE",
        headers: {
            token: token as string
        }
    });

    const finalRes = await res.json();
    return finalRes;
}









export async function getWishlistAction() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("userToken")?.value;


  if (!token) {
    return { count: 0, data: [] };
  }

  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
      headers: { token },
      next: { revalidate: 0 } 
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in getWishlistAction:", error);
    return { count: 0, data: [] };
  }
}


// export async function addProductToWishlist(id: string) {
//     console.log("Adding product to wishlist...");
    
//     // جلب التوكن من السيرفر (سواء من الكوكيز أو الكاش)
//     const token = await getMyToken();

//     // الـ API الخاص بالـ Wishlist في Route
//     const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
//         method: "POST",
//         body: JSON.stringify({ productId: id }),
//         headers: {
//             "Content-Type": "application/json",
//             "token": token as string
//         },
//         cache: 'no-store' // لضمان جلب بيانات جديدة دائماً
//     });

//     const finalRes = await res.json();

//     console.log("Response from wishlist action:", finalRes);

//     return finalRes;
// }