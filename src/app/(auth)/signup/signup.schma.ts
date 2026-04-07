import * as zod from "zod"

export const signupSchema = zod.object( {
  name : zod.string("enter your name"),
  email : zod.email("enter vailed email"),
  password : zod.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/ , "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character" ),
   rePassword : zod.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/ , "Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character" ),
   phone : zod.string("enter your phone")
}).refine( function (params) {
  return params.password === params.rePassword
} , {
error : "password and repassword not matched",
path : [ "rePassword" ]
 })



 export type singUpDataType = zod.infer<  typeof signupSchema >