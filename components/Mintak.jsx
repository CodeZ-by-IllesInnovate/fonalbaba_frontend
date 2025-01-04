"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default function Mintak() {
  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatterns = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/mintaks?sort=createdAt:desc&pagination[limit]=3&populate=*`
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
        // console.error("Hiba a minták lekérése során:", error);
        setLoading(false);
      }
    };

    fetchPatterns();
  }, []);

  if (loading) {
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
    <section className="mt-20 font-mono">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 tracking-wide text-center text-yellow-600">
          Legújabb minták
        </h2>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          data-aos="flip-up"
        >
          {patterns.map((pattern, index) => (
            <div
              key={pattern.id}
              className="relative flex flex-col bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
              data-aos="flip-up"
              data-aos-delay={index * 100} // Késleltetés index alapján
            >
              {/* Képek megjelenítése */}
              {pattern.images.length > 0 && (
                <div className="relative h-64 w-full bg-gray-100 flex items-center justify-center">
                  <img
                    src={`${process.env.NEXT_PUBLIC_URL}${pattern.images[0]}`}
                    alt={pattern.title}
                    className="object-contain w-full h-full"
                  />
                </div>
              )}
              <div className="flex flex-col p-6 flex-grow">
                <h5 className="mb-3 text-2xl font-semibold text-gray-800">
                  {pattern.title}
                </h5>
                <Link
                  href={`/mintak/${pattern.slug}`}
                  className="mt-4 inline-block text-center px-6 py-2 text-sm font-medium text-white bg-yellow-600 rounded-full shadow-md transition-all hover:bg-yellow-700 focus:ring focus:ring-yellow-300"
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
}
