"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const ImageSlider = ({ images }) => {
  return (
    <Swiper
      spaceBetween={30}
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      modules={[Pagination]}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            src={image}
            alt={`Image ${index + 1}`}
            className="w-full h-full object-cover rounded-lg"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
