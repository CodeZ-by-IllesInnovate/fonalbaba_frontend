"use client";
import React, { useEffect, useState } from "react";

export default function Amigurumi() {
  const [amigurumiData, setAmigurumiData] = useState(null);
  useEffect(() => {
    const fetchAmigurumiData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/amigurumi?populate=*`
        ); // Használj megfelelő API URL-t
        const data = await response.json();
        console.log("amigurumi data", data.data);
        setAmigurumiData(data.data);
      } catch (err) {
        // console.error(err);
      }
    };
    fetchAmigurumiData();
  }, []);
  return (
    <div className="mt-20 w-full font-mono ">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 pr-4">
          <h1 className="text-3xl font-bold text-yellow-600">
            Nyissa ki kreativitását a Könnyes Követhető Amigurumi mintáinkkal
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Engedje szabadjára kreativitását az egyedi amigurumi mintáimmal,
            melyek részletes leírásokkal és fázisfotókkal segítenek a horgolt
            figurák, babák és állatkák megalkotásában. Minden mintám gondosan
            kidolgozott, hogy Ön is könnyedén követhesse a lépéseket és saját,
            különleges alkotásokat készíthessen.
          </p>
        </div>
        <div className="w-full md:w-1/2 pr-4">
          {amigurumiData && (
            <img
              src={`${process.env.NEXT_PUBLIC_URL}${amigurumiData.Photo.url}`}
              alt="Bizsu és Borisz"
              className="rounded-lg max-h-5/6 h-4/5 w-full object-cover shadow-md"
            />
          )}
        </div>
      </div>
    </div>
  );
}
