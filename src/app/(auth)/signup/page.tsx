"use client"
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { signupSchema, singUpDataType } from './signup.schma'

// UI Components
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Checkbox } from "@/components/ui/checkbox" // تأكد من وجوده أو استبدله بـ input type checkbox
import { Star, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react' // Icons مكتبة lucide-react

export default function SignupPage() {
  const router = useRouter()

  const form = useForm<singUpDataType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    resolver: zodResolver(signupSchema)
  })

  async function handlSignUp(values: singUpDataType) {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
      body: JSON.stringify(values),
      method: "POST",
      headers: { "Content-Type": "application/json" }
    })

    const finalRes = await res.json()
    if (res.ok) {
      toast.success("Account created successfully", { position: "top-center", richColors: true })
      router.push("/login")
    } else {
      toast.error(finalRes.message || "Error in sign up", { position: "top-center", richColors: true })
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Info & Testimonial */}
        <div className="space-y-8 hidden lg:block">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Welcome to <span className="text-green-600">FreshCart</span>
            </h1>
            <p className="text-slate-600 text-lg">
              Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.
            </p>
          </div>

          <div className="space-y-6">
            <FeatureItem 
              icon={<Star className="text-green-600" />} 
              title="Premium Quality" 
              desc="Premium quality products sourced from trusted suppliers." 
            />
            <FeatureItem 
              icon={<Truck className="text-green-600" />} 
              title="Fast Delivery" 
              desc="Same-day delivery available in most areas." 
            />
            <FeatureItem 
              icon={<ShieldCheck className="text-green-600" />} 
              title="Secure Shopping" 
              desc="Your data and payments are completely secure." 
            />
          </div>

          {/* Testimonial Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 max-w-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden">
                 <img src="https://i.pravatar.cc/150?u=sarah" alt="user" />
              </div>
              <div>
                <p className="font-bold text-slate-800">Sarah Johnson</p>
                <div className="flex text-yellow-400 w-4 h-4">
                  {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" />)}
                </div>
              </div>
            </div>
            <p className="text-slate-600 italic">
              "FreshCart has transformed my shopping experience. The quality of the products is outstanding, and the delivery is always on time. Highly recommend!"
            </p>
          </div>
        </div>

        {/* Right Side: Signup Form */}
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Create Your Account</h2>
            <p className="text-slate-500">Start your fresh journey with us today</p>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Button variant="outline" className="flex gap-2 font-medium">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="google" /> Google
            </Button>
            <Button variant="outline" className="flex gap-2 font-medium">
              <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-4 h-4" alt="facebook" /> Facebook
            </Button>
          </div>

          <div className="relative mb-8 text-center">
            <hr className="border-slate-100" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-slate-400 text-sm">or</span>
          </div>

          <form onSubmit={form.handleSubmit(handlSignUp)} className="space-y-5">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="space-y-1">
                  <FieldLabel className="text-slate-700 font-semibold">Name*</FieldLabel>
                  <Input {...field} placeholder="Ali" className="bg-slate-50/50" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="space-y-1">
                  <FieldLabel className="text-slate-700 font-semibold">Email*</FieldLabel>
                  <Input {...field} type="email" placeholder="ali@example.com" className="bg-slate-50/50" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="space-y-1">
                  <FieldLabel className="text-slate-700 font-semibold">Password*</FieldLabel>
                  <Input {...field} type="password" placeholder="create a strong password" className="bg-slate-50/50" />
                  <p className="text-[10px] text-slate-400 mt-1">Must be at least 8 characters with numbers and symbols</p>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="rePassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="space-y-1">
                  <FieldLabel className="text-slate-700 font-semibold">Confirm Password*</FieldLabel>
                  <Input {...field} type="password" placeholder="confirm your password" className="bg-slate-50/50" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="space-y-1">
                  <FieldLabel className="text-slate-700 font-semibold">Phone Number*</FieldLabel>
                  <Input {...field} type="tel" placeholder="+1 234 567 8900" className="bg-slate-50/50" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <div className="flex items-center space-x-2 py-2">
              <Checkbox id="terms" required />
              <label htmlFor="terms" className="text-sm text-slate-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                I agree to the <span className="text-green-600 underline cursor-pointer">Terms of Service</span> and <span className="text-green-600 underline cursor-pointer">Privacy Policy</span> *
              </label>
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-6 rounded-xl text-lg font-bold transition-all duration-300">
              Create My Account
            </Button>
          </form>

          <p className="text-center mt-6 text-slate-600">
            Already have an account? <span onClick={() => router.push('/login')} className="text-green-600 font-bold cursor-pointer hover:underline">Sign In</span>
          </p>
        </div>
      </div>
    </div>
  )
}

// Helper Component for Features
function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-slate-800">{title}</h4>
        <p className="text-slate-500 text-sm">{desc}</p>
      </div>
    </div>
  )
}