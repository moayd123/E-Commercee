import { shippingAddressType } from "@/types/order.type";
import { getMyToken } from "@/utils/getMyToken";
export async  function createCashOrder( cartId: string , shippingAddress : shippingAddressType ) {
const token = await getMyToken()
const res = await fetch(`https://ecommerce.routemisr.com/api/v2/orders/${cartId}` , {
    headers : {
        token : token as string ,
        "Content-Type"    :  "application/json"
    },

    method : "POST" ,
    body : JSON.stringify( shippingAddress )
})

const finalRes = await res.json()
return finalRes
}