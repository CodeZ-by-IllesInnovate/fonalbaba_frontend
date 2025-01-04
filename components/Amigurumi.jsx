"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
export default function Amigurumi() {
  useEffect(() => {
    AOS.init({
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
    });
  }, []);

  const [amigurumiData, setAmigurumiData] = useState(null);

  useEffect(() => {
    const fetchAmigurumiData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/amigurumi?populate=*`
        );
        const data = await response.json();
        setAmigurumiData(data.data);
      } catch (err) {
        // console.error("Hiba történt az adatok lekérésekor:", err);
      }
    };
    fetchAmigurumiData();
  }, []);

  if (!amigurumiData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-yellow-500"></div>
        <p className="ml-4 text-lg font-medium text-gray-600">
          Adatok betöltése...
        </p>
      </div>
    );
  }

  return (
    <section className="relative mt-20 border-b border-accent min-h-[800px] py-12 w-full font-mono overflow-x-hidden">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 pr-4" data-aos="fade-up-right">
          <h1 className="text-3xl font-bold text-yellow-600">
            {amigurumiData.Title}
          </h1>
          <p className="mt-4 text-lg text-gray-700">{amigurumiData.Text}</p>
        </div>
        <div className="w-full md:w-1/2 pr-4" data-aos="fade-left">
          {amigurumiData.Photo && (
            <img
              src={`${process.env.NEXT_PUBLIC_URL}${amigurumiData.Photo.url}`}
              alt={amigurumiData.Photo.alternativeText || "Bizsu és Borisz"}
              className="rounded-lg max-h-5/6 h-4/5 w-full object-cover shadow-md"
            />
          )}
        </div>
      </div>
    </section>
  );
}
