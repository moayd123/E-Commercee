"use client";

import React, { useState } from 'react';

export default function ProductGallery({ images, mainImage }: { images: string[], mainImage: string }) {

  const [activeImage, setActiveImage] = useState(mainImage);

  return (
    <div className="flex flex-col gap-4">
      
      <div className="border border-gray-100 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center p-8 min-h-[450px]">
        <img 
          className="max-w-full max-h-[400px] object-contain transition-all duration-500" 
          src={activeImage} 
          alt="Selected Product" 
        />
      </div>

     
      <div className="grid grid-cols-4 gap-3">
        {[mainImage, ...images].slice(0, 4).map((img, index) => (
          <div 
            key={index} 
            onClick={() => setActiveImage(img)}
            className={`border-2 rounded-xl overflow-hidden cursor-pointer transition-all h-24 flex items-center justify-center bg-white ${
              activeImage === img ? 'border-emerald-500 shadow-md' : 'border-gray-100 hover:border-emerald-200'
            }`}
          >
            <img src={img} alt={`thumb-${index}`} className="w-full h-full object-contain p-2" />
          </div>
        ))}
      </div>
    </div>
  );
}