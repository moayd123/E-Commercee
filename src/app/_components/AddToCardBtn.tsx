
"use client"
import { FaPlus } from 'react-icons/fa'
import { addProdutToCart } from '../_actions/cart.actions'
import { toast } from 'sonner'
import { cartContext } from '../_context/CartContextProvider'
import React, { useContext } from 'react'

export default function AddToCardBtn( {productId} : {productId : string} ) {

  const {setnumberOfCartItems , settotalPriceOfCart , setcartProducts } = useContext(cartContext)

async function hadeladdToCart() {
    
   const res = await  addProdutToCart(productId)

   console.log(res);

   if(res.status == "success") {
    
    toast.success(res.message  , { position : "top-center"})
    setnumberOfCartItems( res.numOfCartItems )
    setcartProducts( res.data.products )
    settotalPriceOfCart( res.data.totalCartPrice)

   }
}

  return (
    <button  onClick={ hadeladdToCart } className='bg-[#16a34a] hover:bg-emerald-700 text-white rounded-lg h-8 w-8 flex items-center justify-center transition-all active:scale-95 shadow-sm'>
             <FaPlus size={12} />
           </button>
  )
}
