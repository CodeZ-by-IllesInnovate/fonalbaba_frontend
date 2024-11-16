// app/bemutatkozas/page.js
"use client";

import { useState, useEffect } from "react";

export default function Bemutatkozas() {
  const [bemutatkozasData, setBemutatkozasData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBemutatkozasData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/bemutatkozas`
        );
        const data = await res.json();
        setBemutatkozasData(data.data);
      } catch (error) {
        console.error("Hiba a bemutatkozó adat lekérése során:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBemutatkozasData();
  }, []);

  if (loading) {
    return <div>Betöltés...</div>;
  }

  if (!bemutatkozasData) {
    return <div>Nem található adat.</div>;
  }

  return (
    <section className="mt-20 font-mono min-h-[700px]">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">{bemutatkozasData.title}</h1>
        <p className="mb-4 text-gray-700">{bemutatkozasData.intro}</p>
        <div className="mb-4 text-gray-700">
          <div dangerouslySetInnerHTML={{ __html: bemutatkozasData.body }} />
        </div>
        <p className="mt-6">További elérhetőségeink:</p>
        <ul className="list-disc pl-6">
          <li>
            Email:{" "}
            <a
              href={`mailto:${bemutatkozasData.email}`}
              className="text-blue-500"
            >
              {bemutatkozasData.email}
            </a>
          </li>
          <li>
            Facebook:{" "}
            <a
              href={bemutatkozasData.facebookLink}
              className="text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fonalbaba Facebook oldal
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
