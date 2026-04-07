import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0b1219] text-[#9ba4ad] pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
        
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white inline-flex items-center px-4 py-2 rounded-lg shadow-sm">
             
               <div className="text-[#0aad0a] mr-2">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
               </div>
               <span className="text-[#1a222e] text-2xl font-bold tracking-tight">FreshCart</span>
            </div>
            
            <p className="text-[15px] leading-relaxed pr-8">
              FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices with a seamless shopping experience.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3 transition-colors hover:text-[#0aad0a] cursor-pointer">
                <Phone size={18} className="text-[#0aad0a]"/> 
                <span className="text-sm">+1 (800) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 transition-colors hover:text-[#0aad0a] cursor-pointer">
                <Mail size={18} className="text-[#0aad0a]"/> 
                <span className="text-sm">support@freshcart.com</span>
              </div>
              <div className="flex items-center gap-3 transition-colors hover:text-[#0aad0a] cursor-pointer">
                <MapPin size={18} className="text-[#0aad0a]"/> 
                <span className="text-sm">123 Commerce Street, New York, NY 10001</span>
              </div>
            </div>
          </div>

          {/* 2. Shop Links  */}
          <div className="lg:col-span-2">
            <h4 className="text-white text-lg font-bold mb-7">Shop</h4>
            <ul className="space-y-4 text-[14px]">
              {['All Products', 'Categories', 'Brands', 'Electronics', "Men's Fashion", "Women's Fashion"].map((item) => (
                <li key={item} className="hover:text-[#0aad0a] cursor-pointer transition-all duration-300 transform hover:translate-x-1">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Account Links*/}
          <div className="lg:col-span-2">
            <h4 className="text-white text-lg font-bold mb-7">Account</h4>
            <ul className="space-y-4 text-[14px]">
              <li className="hover:text-[#0aad0a] cursor-pointer transition-all">My Account</li>
              <li className="text-[#0aad0a] cursor-pointer font-medium">Order History</li>
              <li className="hover:text-[#0aad0a] cursor-pointer transition-all">Wishlist</li>
              <li className="hover:text-[#0aad0a] cursor-pointer transition-all">Shopping Cart</li>
              <li className="hover:text-[#0aad0a] cursor-pointer transition-all">Sign In</li>
              <li className="hover:text-[#0aad0a] cursor-pointer transition-all">Create Account</li>
            </ul>
          </div>

          {/* 4. Support Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white text-lg font-bold mb-7">Support</h4>
            <ul className="space-y-4 text-[14px]">
              {['Contact Us', 'Help Center', 'Shipping Info', 'Returns & Refunds', 'Track Order'].map((item) => (
                <li key={item} className="hover:text-[#0aad0a] cursor-pointer transition-all">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 5. Legal Links  */}
          <div className="lg:col-span-2">
            <h4 className="text-white text-lg font-bold mb-7">Legal</h4>
            <ul className="space-y-4 text-[14px]">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <li key={item} className="hover:text-[#0aad0a] cursor-pointer transition-all">
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>

       
        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-sm opacity-50">
          <p>© 2026 FreshCart E-Commerce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}