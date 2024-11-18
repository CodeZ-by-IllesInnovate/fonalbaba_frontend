"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

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
        <h2 className="text-3xl font-bold mb-8 tracking-wide text-yellow-600 text-center">
          Minták
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Az elemek ABC sorrendbe rendezése */}
          {patterns
            .sort((a, b) => a.title.localeCompare(b.title)) // Rendezés a title alapján
            .map((pattern) => (
              <div
                key={pattern.id}
                className="relative flex flex-col bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Képek megjelenítése, ha van elérhető kép */}
                {pattern.images.length > 0 && (
                  <div className="relative h-64 w-full bg-gray-100 flex items-center justify-center">
                    <img
                      src={`${process.env.NEXT_PUBLIC_URL}${pattern.images[0]}`}
                      alt={pattern.title}
                      className="object-contain w-full h-full"
                    />
                  </div>
                )}
                <div className="flex flex-col justify-between flex-grow p-6">
                  <div>
                    <h5 className="text-xl font-semibold text-gray-800">
                      {pattern.title}
                    </h5>
                    <ReactMarkdown className="text-sm text-gray-600 leading-relaxed">
                      {pattern.leiras}
                    </ReactMarkdown>
                  </div>
                  <div className="mt-4">
                    <Link
                      href={`/mintak/${pattern.slug}`}
                      className="block px-6 py-2 text-sm font-medium text-white bg-yellow-600 rounded-full transition-all hover:bg-yellow-700 focus:ring focus:ring-yellow-300 text-center"
                    >
                      Részletek
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default MintakPage;
