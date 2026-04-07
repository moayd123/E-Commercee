// import { cookies } from "next/headers";
// // import { decode } from "next-auth/jwt";


// // export async function getMyToken() {
  
// // const myCookies = await cookies()
// //  const tokenFromCookies = myCookies.get("next-auth.session-token")?.value

// //  console.log("tokenFromCookies" , tokenFromCookies);

// //   const myTokenAfterDecoded = await decode( { token :tokenFromCookies , secret : process.env.NEXTAUTH_SECRET! } )
// // console.log("myTokenAfterDecoded" , myTokenAfterDecoded);
// // console.log("realTokenFromBackEnd " , myTokenAfterDecoded.realTokenBackEnd );
// // return myTokenAfterDecoded.realTokenBackEnd
// // }




import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export async function getMyToken() {
  const myCookies = await cookies();
  
  // 1. استخراج التوكن (تأكد من اسم الكوكيز في الـ Production بيبقى ساعات "__Secure-next-auth.session-token")
  const tokenFromCookies = 
    myCookies.get("next-auth.session-token")?.value || 
    myCookies.get("__Secure-next-auth.session-token")?.value;

  console.log("tokenFromCookies", tokenFromCookies);

  // 2. لو مفيش توكن أصلاً، ارجع null بدل ما تكمل وتضرب Error
  if (!tokenFromCookies) {
    console.log("No token found in cookies");
    return null;
  }

  try {
    const myTokenAfterDecoded = await decode({ 
      token: tokenFromCookies, 
      secret: process.env.NEXTAUTH_SECRET! 
    });

    // 3. حماية إضافية: لو الـ decode فشل أو رجع null
    if (!myTokenAfterDecoded) {
      return null;
    }

    console.log("realTokenFromBackEnd", myTokenAfterDecoded.realTokenBackEnd);
    return myTokenAfterDecoded.realTokenBackEnd;

  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}