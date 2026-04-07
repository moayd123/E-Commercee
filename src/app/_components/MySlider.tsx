// "use client"
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination } from 'swiper/modules';
// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// interface MySliderPropsType {
//     listOfImages : string[],
//     spaceBetween? : number,
//     slidesPerView? : number,
// }

// export default function MySlider({listOfImages ,spaceBetween= 100 , slidesPerView =3 } : MySliderPropsType  ) {
//   return (
//     <Swiper
//       modules={[Navigation, Pagination]}
//       spaceBetween={spaceBetween}
//       slidesPerView={slidesPerView}
//       loop
//       navigation
//        pagination={{ clickable: true , bulletActiveClass : "bg-white! opacity-100! w-5! rounded-2xl!" , renderBullet : function (index, className) {
//       return '<span class="' + className + '">' + (index + 1) + '</span>'; }}}
//     //   onSlideChange={() => console.log('slide change')}
//     //   onSwiper={(swiper) => console.log(swiper)}
//     >
     
//      {listOfImages.map( image =>  <SwiperSlide> <img src={image} className='w-full h-120 object-cover' alt="ay haga" /> </SwiperSlide>)}
      
//     </Swiper>
//   );
// };




"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import { Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"


interface MySliderPropsType {
  listOfImages: string[]
}

export default function MySlider({ listOfImages }: MySliderPropsType) {
  const features = [
    { title: "Free Shipping", desc: "On orders over 500 EGP", icon: <Truck size={24} className="text-blue-600" />, bg: "bg-blue-50" },
    { title: "Secure Payment", desc: "100% secure transactions", icon: <ShieldCheck size={24} className="text-green-600" />, bg: "bg-green-50" },
    { title: "Easy Returns", desc: "14-day return policy", icon: <RotateCcw size={24} className="text-orange-600" />, bg: "bg-orange-50" },
    { title: "24/7 Support", desc: "Dedicated support team", icon: <Headphones size={24} className="text-purple-600" />, bg: "bg-purple-50" },
  ]

  return (
    <>
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          loop
          navigation
          style={{
            "--swiper-navigation-color": "#16a34a",
            "--swiper-navigation-size": "10px",
          } as React.CSSProperties}
          pagination={{ clickable: true, bulletActiveClass: "bg-white! opacity-100! w-5! rounded-2xl!" }}
          className="h-[450px]"
        >
          {listOfImages.map((image, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-[450px]">
                <img
                  src={image}
                  className="w-full h-full object-cover"
                  alt="slide"
                />
                <div className="absolute inset-0 bg-green-600/70"></div>
                <div className="absolute left-20 top-1/2 -translate-y-1/2 text-white max-w-lg">
                  <h2 className="text-4xl font-bold leading-snug">
                    Fresh Products Delivered <br /> to your Door
                  </h2>
                  <p className="mt-3 text-lg">
                    Get 20% off your first order
                  </p>
                  <div className="flex gap-4 mt-6">
                    <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                      Shop Now
                    </button>
                    <button className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition">
                      View Deals
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

     
      <div className="bg-gray-100 py-12"> 
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((item, index) => (
              <div key={index} className="flex items-center p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all">
                <div className={`w-12 h-12 ${item.bg} rounded-full flex items-center justify-center mr-4 shrink-0`}>
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm leading-tight">{item.title}</h4>
                  <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

