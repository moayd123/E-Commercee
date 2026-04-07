import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Mail } from 'lucide-react';

export default function Features() {
  const featuresList = [
    { icon: <Truck />, title: 'Free Shipping', desc: 'On orders over 500 EGP' },
    { icon: <RotateCcw />, title: 'Easy Returns', desc: '14-day return policy' },
    { icon: <ShieldCheck />, title: 'Secure Payment', desc: '100% secure checkout' },
    { icon: <Mail />, title: '24/7 Support', desc: 'Contact us anytime' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 px-4">
      {featuresList.map((item, i) => (
        <div key={i} className="flex items-center gap-4 group cursor-default">
          {/* Icon Container */}
          <div className="bg-[#f0f9f4] p-4 rounded-2xl text-emerald-600 group-hover:bg-[#0aad0a] group-hover:text-white transition-all duration-300 shadow-sm">
            {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
          </div>
          
          {/* Text Content */}
          <div>
            <h4 className="font-bold text-gray-800 text-sm group-hover:text-[#0aad0a] transition-colors">
              {item.title}
            </h4>
            <p className="text-xs text-gray-400 font-medium">
              {item.desc}
            </p>
          </div>
        </div>
      ))}
   
    <br></br> </div>
  );
}