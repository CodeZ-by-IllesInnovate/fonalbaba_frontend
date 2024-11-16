"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const MintakPage = () => {
  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatterns = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/mintaks?populate=*`
        );
        const data = await res.json();
        const formattedPatterns = data.data.map((pattern) => ({
          id: pattern.id,
          title: pattern.title,
          slug: pattern.slug,
          leiras: pattern.leiras,
          images: pattern.image ? pattern.image.map((img) => img.url) : [],
        }));
        setPatterns(formattedPatterns);
        setLoading(false);
      } catch (error) {
        console.error("Hiba a minták lekérése során:", error);
        setLoading(false);
      }
    };

    fetchPatterns();
  }, []);

  if (loading) {
    return <div>Betöltés...</div>;
  }

  return (
    <section className="mt-20 font-mono">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-6 my-8 tracking-wide text-yellow-600">
          Minták
        </h2>
        <div className="flex flex-wrap-3 gap-6">
          {patterns.map((pattern) => (
            <div
              key={pattern.id}
              className="relative flex flex-col text-yellow-600 bg-white shadow-lg rounded-xl w-80 text-center"
            >
              {/* Képek megjelenítése, ha van elérhető kép */}
              {pattern.images.length > 0 && (
                <div className="relative h-[25rem] mx-4 my-4 overflow-hidden shadow-lg rounded-xl">
                  <img
                    src={`${process.env.NEXT_PUBLIC_URL}${pattern.images[0]}`}
                    alt={pattern.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <div className="p-2">
                <h5 className="mb-2 text-xl font-semibold leading-snug text-gray-900">
                  {pattern.title}
                </h5>
                <p className="text-base font-light leading-relaxed text-gray-700">
                  {pattern.leiras}
                </p>
              </div>
              <div className="p-6 pt-0">
                <Link
                  href={`/mintak/${pattern.slug}`}
                  className="block text-center px-6 py-3 text-xs font-bold text-textColor uppercase bg-gradient-to-r from-primary to-secondary rounded-lg shadow-md transition-all hover:shadow-lg focus:opacity-85 active:opacity-85"
                >
                  Részletek
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MintakPage;
