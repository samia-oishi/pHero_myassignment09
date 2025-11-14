import React from "react";
import sl1 from "../assets/HeaderImg/sl1.jpg";
import sl2 from "../assets/HeaderImg/sl2.jpg";
import sl3 from "../assets/HeaderImg/sl3.jpg";
import sl4 from "../assets/HeaderImg/sl4.jpg";
import sl5 from "../assets/HeaderImg/sl5.jpg";
import sl6 from "../assets/HeaderImg/sl6.jpg";
import sl7 from "../assets/HeaderImg/sl7.jpg";
import sl8 from "../assets/HeaderImg/sl8.jpg";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";

export const Hero = () => {
  return (
    <div className=" bg-linear-to-br from-[#A4614E] via-gray-500 to-[#744437] mx-30 my-5 h-[80vh] rounded-xl text-white flex justify-center gap-20 items-center px-8">
      {/* left: text */}
      <div className="max-w-md mr-8">
        <h1 className="text-7xl font-medium mb-5 text-center">
          Welcome to <span className="text-orange-100">PetCare</span>
        </h1>
        <p className="text-lg text-center">
          Keep your pets cozy, clean, and cared for this winter with PetCare’s
          trusted and professional services.
        </p>
      </div>

      {/* right: swiper */}
      <div className="w-70 h-90">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper w-full h-full"
        >
          <SwiperSlide className="flex items-center justify-center rounded-lg overflow-hidden">
            <img
              src={sl1}
              alt="slide 1"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>

          <SwiperSlide className="flex items-center justify-center rounded-lg overflow-hidden">
            <img
              src={sl2}
              alt="slide 2"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>

          <SwiperSlide className="flex items-center justify-center rounded-lg overflow-hidden">
            <img
              src={sl3}
              alt="slide 3"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>

          <SwiperSlide className="flex items-center justify-center rounded-lg overflow-hidden">
            <img
              src={sl4}
              alt="slide 4"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>

          <SwiperSlide className="flex items-center justify-center rounded-lg overflow-hidden">
            <img
              src={sl5}
              alt="slide 5"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>

          <SwiperSlide className="flex items-center justify-center rounded-lg overflow-hidden">
            <img
              src={sl6}
              alt="slide 6"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>

          <SwiperSlide className="flex items-center justify-center rounded-lg overflow-hidden">
            <img
              src={sl7}
              alt="slide 7"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>

          <SwiperSlide className="flex items-center justify-center rounded-lg overflow-hidden">
            <img
              src={sl8}
              alt="slide 8"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};
