import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";


export async function getMyToken() {
  
const myCookies = await cookies()
 const tokenFromCookies = myCookies.get("next-auth.session-token")?.value

 console.log("tokenFromCookies" , tokenFromCookies);

  const myTokenAfterDecoded = await decode( { token :tokenFromCookies , secret : process.env.NEXTAUTH_SECRET! } )
console.log("myTokenAfterDecoded" , myTokenAfterDecoded);
console.log("realTokenFromBackEnd " , myTokenAfterDecoded.realTokenBackEnd );
return myTokenAfterDecoded.realTokenBackEnd
}