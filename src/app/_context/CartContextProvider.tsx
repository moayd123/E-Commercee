"use client"

import React, { createContext, ReactNode, useState, useEffect  }   from 'react'
import { getUserCart } from '../_actions/cart.actions'
import { CartItemType, CartResType } from '@/types/cart.type'


 export const cartContext = createContext( { } )

export default function CartContextProvider( {children , userCart } : {children : ReactNode , userCart : CartResType } ) {

//   async function getDataFromAPI() {
//   const userCart = await   getUserCart()

// console.log("user cart " , userCart);
// setnumberOfCartItems(userCart.numOfCartItems)
//   }
 
//   useEffect( ()=> {
//     getDataFromAPI()
//   } , [] )

    const [numberOfCartItems, setnumberOfCartItems] = useState(userCart?.numOfCartItems)

    // const [cartData, setCartData] = useState(userCart.data)
const [totalPriceOfCart, settotalPriceOfCart ] = useState(userCart?.data?.totalCartPrice)
// const [totalPriceOfCart, settotalPriceOfCart]  = useState(userCart.data.totalCartPrice)

const [cartProducts, setcartProducts] = useState< CartItemType [] >(userCart?.data?.products )


  return (
    <cartContext.Provider value={ {  numberOfCartItems , setnumberOfCartItems , totalPriceOfCart , settotalPriceOfCart , cartProducts , setcartProducts} } >

    {children}

        </cartContext.Provider>
  )
}
// export default function CartContextProvider({ children, userCart }: { children: ReactNode, userCart: CartResType }) {

// 
//   const [numberOfCartItems, setnumberOfCartItems] = useState(userCart?.numOfCartItems || 0);

//  
//   const [totalPriceOfCart, settotalPriceOfCart] = useState(userCart?.data?.totalCartPrice );

//   
//   const [cartProducts, setcartProducts] = useState<CartItemType[]>(userCart?.data?.products || []);

//   return (
//     <cartContext.Provider value={{ numberOfCartItems, setnumberOfCartItems, totalPriceOfCart, settotalPriceOfCart, cartProducts, setcartProducts }}>
//       {children}
//     </cartContext.Provider>
//   );
// }