import {NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"



export const nextAuthConfig: NextAuthOptions = {

  providers : [

    Credentials( {

name : "frash cart",

      credentials : {

        email : { placeholder : "enter your name" } ,
        password : {}
      } ,

    async authorize(credentials) {

          const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin" , {
  body : JSON.stringify(credentials) ,
  method : "POST" ,
  headers : {
"Content-Type" : "application/json"
  }
})

const finalRes  = await res.json()

console.log( "finalRes" , finalRes );

if(finalRes.message == "success") {

return {

  name : finalRes.user.name,
  email : finalRes.user.email,
  realTokenBackEnd : finalRes.token

}

}

        return null
      },


    } )
  ],
callbacks: {
  async jwt({ token, user }) {
    // لو فيه مستخدم لسه مسجل دخول، ضيف التوكن بتاعه للـ JWT token
    if (user) {
      token.realTokenBackEnd = user.realTokenBackEnd;
    }
    return token;
  },

  async session({ session, token }) {
    // انقل التوكن من الـ JWT للـ Session عشان تقدر تستخدمه في الكليانت
    if (session.user) {
      // @ts-ignore (لو مطلع خطأ TypeScript)
      session.user.realTokenBackEnd = token.realTokenBackEnd;
    }
    return session;
  },
},

session : {
  maxAge : 60 * 60 * 24 * 7
},


pages : {
  signIn : "/login"
},
}












//   providers: [
//     Credentials({
//       name: "fresh card",

//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" }
//       },

//       async authorize(credentials) {
//         if (!credentials) return null

//         try {
//           const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//               email: credentials.email,
//               password: credentials.password
//             })
//           })

//           const finalRes = await res.json()
//           console.log(finalRes)

//           if (finalRes.message === "success") {
//             return {
//               id: finalRes.user._id, // مهم جدًا
//               name: finalRes.user.name,
//               email: finalRes.user.email,
//               token: finalRes.token
//             }
//           }

//           return null
//         } catch (error) {
//           console.log("Auth Error:", error)
//           return null
//         }
//       }
//     })
//   ],


// callbacks : {
//   jwt(params) {
    
   

//     console.log("params" , params);

//     return params.token
//   },

// },


// pages : {
//   signIn : "/login"
// },

// secret : process.env.BETTER_AUTH_SECRET

