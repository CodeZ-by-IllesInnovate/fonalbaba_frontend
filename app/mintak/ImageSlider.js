"use client";

import Slider from "react-slick";

export default function ImageSlider({ images }) {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <Slider {...sliderSettings}>
      {images.map((imageUrl, index) => (
        <div key={index}>
          <img
            src={imageUrl}
            alt={`Image ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </Slider>
  );
}
