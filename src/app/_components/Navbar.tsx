"use client"

import React, { useContext, useState, useEffect } from "react"
import Link from "next/link"
import logo from "@/images/FreshCartlogo.png"
import { CiHeart, CiLogin, CiSearch, CiUser } from "react-icons/ci"
import { IoClose } from "react-icons/io5"
import { FiPhoneCall } from "react-icons/fi"
import { TfiEmail } from "react-icons/tfi"
import { MdOutlineHeadsetMic } from "react-icons/md"
import { HiMenuAlt3 } from "react-icons/hi"
import { FaShoppingCart } from "react-icons/fa"

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu"
import { cartContext } from "../_context/CartContextProvider"
import { wishlistContext } from '../_context/WishlistContextProvider';

export default function Navbar() {
  const { numberOfCartItems } = useContext(cartContext)
  const { wishlistCount } = useContext(wishlistContext)
  
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false) 

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className="w-full font-sans">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 py-2 px-4 lg:px-20 text-[13px] text-gray-600">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <div className="flex gap-4 items-center font-medium">
            <span className="flex items-center gap-1 text-[#0aad0a]">🚚 Free Shipping on Orders 500 EGP</span>
            <span className="hidden sm:inline border-l border-gray-300 pl-4">🎁 New Arrivals Daily</span>
          </div>

          <div className="flex items-center gap-5">
            <div className="hidden lg:flex items-center gap-4 border-r border-gray-200 pr-4">
              <span className="hover:text-[#0aad0a] cursor-pointer">
                <FiPhoneCall className="inline mr-1" /> +1 (800) 123-4567
              </span>
              <span className="hover:text-[#0aad0a] cursor-pointer">
                <TfiEmail className="inline mr-1" /> support@freshcart.com
              </span>
            </div>
            <div className="flex gap-3">
              <Link href="/login" className="flex items-center gap-1 hover:text-[#0aad0a]"><CiLogin /> Sign In</Link>
              <Link href="/signup" className="flex items-center gap-1 hover:text-[#0aad0a]"><CiUser /> Sign Up</Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Navbar Main */}
      <nav className={`fixed left-0 right-0 z-[100] bg-white border-b border-gray-200 transition-all duration-300 ${
        scrolled ? "top-0 shadow-md py-2" : "top-[38px] py-4" 
      }`}>
        <div className="px-4 lg:px-20">
          <div className="flex justify-between items-center gap-6">
            
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <img src={logo.src} alt="FreshCart" className="w-[130px] lg:w-[165px]" />
            </Link>

            {/* Search  */}
            <div className="hidden md:flex flex-1 max-w-md relative">
              <input 
                type="text" 
                className="w-full border border-gray-200 py-2 px-4 rounded-lg focus:border-[#0aad0a] outline-none text-sm" 
                placeholder="Search products..." 
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#0aad0a] text-white p-1.5 rounded-md">
                <CiSearch />
              </button>
            </div>

            {/* Desktop Menu */}
            <div className="hidden xl:block">
              <NavigationMenu>
                <NavigationMenuList className="gap-6">
                  <NavigationMenuItem><Link href="/" className="font-semibold hover:text-[#0aad0a]">Home</Link></NavigationMenuItem>
                  <NavigationMenuItem><Link href="/shop" className="font-semibold hover:text-[#0aad0a]">Shop</Link></NavigationMenuItem>
                  <NavigationMenuItem><Link href="/Categories" className="font-semibold hover:text-[#0aad0a]">Categories</Link></NavigationMenuItem>
                  <NavigationMenuItem><Link href="/brands" className="font-semibold hover:text-[#0aad0a]">Brands</Link></NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Support Box */}
            <Link href="/contact" className="hidden xl:flex items-center gap-3 border-l border-r px-5 hover:text-[#0aad0a] group">
              <div className="text-3xl text-[#0aad0a]"><MdOutlineHeadsetMic /></div>
              <div className="flex flex-col leading-tight">
                <span className="text-[10px] text-gray-400 font-bold uppercase">Support</span>
                <span className="text-[13px] font-bold text-gray-800">24/7 Help</span>
              </div>
            </Link>

            {/* Right Icons */}
            <div className="flex items-center gap-4 lg:gap-6">
              <Link href="/WishlistPage" className="relative text-2xl hover:text-[#0aad0a]">
                <CiHeart />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{wishlistCount}</span>
              </Link>

              <Link href="/shop" className="relative text-2xl hover:text-[#0aad0a]">
                <FaShoppingCart />
                <span className="absolute -top-2 -right-2 bg-[#0aad0a] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{numberOfCartItems}</span>
              </Link>

              {/* Burger Menu Button  */}
              <button onClick={() => setIsOpen(true)} className="xl:hidden text-3xl text-gray-700">
                <HiMenuAlt3 />
              </button>
            </div>
          </div>
        </div>

        {/* 3. Mobile Sidebar */}
        <div className={`fixed inset-0 bg-black/50 z-[200] transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setIsOpen(false)}>
          <div 
            className={`fixed right-0 top-0 h-full w-[300px] bg-white shadow-2xl transition-transform duration-300 p-6 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-10">
              <img src={logo.src} alt="FreshCart" className="w-32" />
              <button onClick={() => setIsOpen(false)} className="text-2xl"><IoClose /></button>
            </div>

            {/* Mobile Search */}
            <div className="relative mb-8">
              <input type="text" className="w-full border p-2 rounded-lg text-sm" placeholder="Search..." />
              <CiSearch className="absolute right-3 top-3 text-gray-400" />
            </div>

            {/* Mobile Links */}
            <div className="flex flex-col gap-6 text-lg font-semibold text-gray-800">
              <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
              <Link href="/shop" onClick={() => setIsOpen(false)}>Shop</Link>
              <Link href="/Categories" onClick={() => setIsOpen(false)}>Categories</Link>
              <Link href="/brands" onClick={() => setIsOpen(false)}>Brands</Link>
              <hr />
              {/*  mobile menu */}
              <div className="flex items-center gap-3 text-[#0aad0a]">
                <MdOutlineHeadsetMic size={24} />
                <span className="text-sm">24/7 Support: +1 (800) 123</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer*/}
      <div className="h-[100px] lg:h-[120px]"></div>
    </header>
  )
}