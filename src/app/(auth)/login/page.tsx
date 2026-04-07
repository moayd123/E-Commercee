"use client"
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from 'next/navigation'
import { signIn } from "next-auth/react"


import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { loginDataType, loginSchema } from './login.schma'


import { Mail, Lock, Eye, Truck, ShieldCheck, Headphones, Star } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()

  const form = useForm<loginDataType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema)
  })

  async function haldellogin(values: loginDataType) {
    console.log("values", values);
   
    signIn("credentials", { ...values, redirect: true, callbackUrl: "/" })
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 md:p-10">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Branding & Image */}
        <div className="hidden lg:flex flex-col items-center text-center space-y-8">
          <div className="relative w-full max-w-md aspect-video bg-slate-100 rounded-3xl overflow-hidden shadow-inner">
             {/* Shopping Cart */}
             <img 
               src="https://storage.googleapis.com/uxpilot-auth.appspot.com/2e5810ff3e-e750761ebcd4ae5907db.png" 
               alt="FreshCart" 
               className="w-full h-full object-cover"
             />
          </div>
          
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-slate-800">
              FreshCart - Your One-Stop Shop for Fresh Products
            </h1>
            <p className="text-slate-500 max-w-sm mx-auto">
              Join thousands of happy customers who trust FreshCart for their daily grocery needs
            </p>
          </div>

          <div className="flex gap-6 text-sm font-medium text-slate-600">
             <div className="flex items-center gap-2">
               <Truck size={18} className="text-green-600" /> Free Delivery
             </div>
             <div className="flex items-center gap-2">
               <ShieldCheck size={18} className="text-green-600" /> Secure Payment
             </div>
             <div className="flex items-center gap-2">
               <Headphones size={18} className="text-green-600" /> 24/7 Support
             </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-slate-200 border border-slate-50">
          <div className="text-center mb-8">
             <h2 className="text-3xl font-bold text-green-600 mb-2">FreshCart</h2>
             <h3 className="text-xl font-bold text-slate-800">Welcome Back!</h3>
             <p className="text-slate-400 text-sm mt-1">Sign in to continue your fresh shopping experience</p>
          </div>

          {/* Social Buttons */}
          <div className="space-y-3 mb-8">
            <Button variant="outline" className="w-full py-6 rounded-xl border-slate-200 flex gap-3 font-semibold text-slate-700 hover:bg-slate-50">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="google" /> Continue with Google
            </Button>
            <Button variant="outline" className="w-full py-6 rounded-xl border-slate-200 flex gap-3 font-semibold text-slate-700 hover:bg-slate-50">
              <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-5 h-5" alt="facebook" /> Continue with Facebook
            </Button>
          </div>

          <div className="relative mb-8 text-center">
            <hr className="border-slate-100" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-slate-400 text-xs tracking-widest uppercase">
              or continue with email
            </span>
          </div>

          <form onSubmit={form.handleSubmit(haldellogin)} className="space-y-6">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="space-y-2">
                  <FieldLabel className="text-sm font-bold text-slate-700">Email Address</FieldLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <Input {...field} placeholder="Enter your email" className="pl-10 py-6 bg-slate-50/30 border-slate-200 rounded-xl focus:ring-green-500" />
                  </div>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="space-y-2">
                  <div className="flex justify-between items-center">
                    <FieldLabel className="text-sm font-bold text-slate-700">Password</FieldLabel>
                    <button type="button" className="text-xs font-bold text-green-600 hover:underline">Forgot Password?</button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <Input {...field} type="password" placeholder="Enter your password" className="pl-10 pr-10 py-6 bg-slate-50/30 border-slate-200 rounded-xl focus:ring-green-500" />
                    <Eye className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer" size={18} />
                  </div>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <div className="flex items-center gap-2">
              <input type="checkbox" id="keep" className="w-4 h-4 rounded border-slate-300 text-green-600" />
              <label htmlFor="keep" className="text-sm text-slate-500">Keep me signed in</label>
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-7 rounded-xl text-lg font-bold shadow-lg shadow-green-200 transition-all">
              Sign In
            </Button>
          </form>

          <div className="mt-8 text-center space-y-4">
            <p className="text-slate-500 text-sm">
              New to FreshCart? <span onClick={() => router.push('/signup')} className="text-green-600 font-bold cursor-pointer hover:underline">Create an account</span>
            </p>
            
            <div className="flex justify-center items-center gap-4 pt-4 text-[10px] text-slate-400 border-t border-slate-50">
              <span className="flex items-center gap-1"><Lock size={10} /> SSL Secured</span>
              <span className="flex items-center gap-1">👥 50K+ Users</span>
              <span className="flex items-center gap-1"><Star size={10} fill="currentColor" className="text-yellow-400" /> 4.9 Rating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}