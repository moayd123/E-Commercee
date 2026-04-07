import { CategoryType } from "@/types/Product.type";
import { promises } from "dns";

export async function getAllCategories() : Promise< CategoryType[] > {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories")
    const finalRes = await res.json()
console.log(finalRes.data);

    return finalRes.data
}