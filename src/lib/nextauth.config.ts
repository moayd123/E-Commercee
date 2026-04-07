import {NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { email } from "zod"
import async from './../app/_components/ShopByCategory';

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

callbacks : {

jwt(params) {
  


if( params.user ) {

  params.token.realTokenBackEnd = params.user.realTokenBackEnd 

}

console.log("params from jwt " , params);

return params.token

},

session(params) {
  console.log("params from session" , params);
// params.session.user.realTokenBackEnd  = params.token.realTokenBackEnd 
  return params.session
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

