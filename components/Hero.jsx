"use client";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

const Hero = () => {
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/heroes?populate=*`
        );
        const data = await response.json();
        setHeroData(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHeroData();
  }, []);

  if (!heroData) {
    // Skeleton betöltési állapot
    return (
      <div className="relative h-screen text-white ">
        <div className="absolute inset-0">
          <Skeleton height="100%" className="w-full h-full" />
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-6 drop-shadow-lg">
            <Skeleton width="60%" />
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 max-w-3xl mb-8 leading-relaxed">
            <Skeleton count={2} />
          </p>
          <div className="w-40">
            <Skeleton height="50px" className="rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen text-white bg-gradient-to-b from-black via-gray-900 to-gray-800">
      <div className="absolute inset-0">
        <img
          src={`${process.env.NEXT_PUBLIC_URL}/uploads/IMG_20240919_171359_edit_92083765496851_e196eaf9bd_a5bc3b96ac.jpg`}
          alt="Background"
          className="object-cover object-center w-full h-full"
        />

        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
        <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-6 drop-shadow-lg">
          {heroData.title || "Köszöntelek az oldalamon!"}
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 max-w-3xl mb-8 leading-relaxed">
          {heroData.description ||
            "Fedezd fel az amigurumi világát, ahol álmaid minden öltéssel életre kelnek!"}
        </p>
        <a
          href="#"
          className="bg-primary text-textColor py-3 px-8 rounded-full text-lg font-semibold shadow-lg hover:shadow-2xl hover:bg-accent transition duration-300 transform hover:-translate-y-1"
        >
          {heroData.button || "Minták"}
        </a>
      </div>
    </div>
  );
};

export default Hero;
