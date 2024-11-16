"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Welcome = () => {
  useEffect(() => {
    AOS.init({
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
    });
  }, []);

  const [welcomeData, setWelcomeData] = useState(null);

  useEffect(() => {
    const fetchWelcomeData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/welcome?populate=*`
        );
        const data = await response.json();
        console.log("welcome data", data.data);
        setWelcomeData(data.data);
      } catch (err) {
        // console.error(err);
      }
    };
    fetchWelcomeData();
  }, []);

  return (
    <section className=" relative mt-20 border-b border-accent min-h-[800px] py-12 w-full  font-mono">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 pr-4" data-aos="fade-right">
          {welcomeData && (
            <h1 className="text-3xl font-bold text-yellow-600">
              {welcomeData.header}
            </h1>
          )}
          {welcomeData && (
            <h2 className="text-2xl text-yellow-500 mt-2">
              {welcomeData.greetingPrefix}{" "}
              <span className="text-yellow-700 font-semibold">
                {welcomeData.highlightedText}
              </span>{" "}
              {welcomeData.greetingSuffix}
            </h2>
          )}
          {welcomeData && (
            <p className="mt-4 text-lg text-gray-700">
              {welcomeData.paragraph_1}
            </p>
          )}
          <div className="mt-6 text-left">
            {welcomeData && (
              <p className="mb-4 text-gray-700">{welcomeData.paragraph_2}</p>
            )}
            {welcomeData && (
              <p className="text-lg font-semibold text-yellow-600">
                {welcomeData.question_1}
              </p>
            )}
            {welcomeData && (
              <p className="mb-4 text-gray-700">{welcomeData.paragraph_3}</p>
            )}
            {welcomeData && (
              <p className="text-lg font-semibold text-yellow-600">
                {" "}
                {welcomeData.question_2}
              </p>
            )}

            <ul className="list-disc list-inside text-gray-700">
              <li>
                <strong>Részletes leírások:</strong>{" "}
                {welcomeData && (
                  <p className="text-gray-700">{welcomeData.paragraph_4}</p>
                )}
              </li>
              <li>
                <strong>Szuper ötletek:</strong>
                {welcomeData && (
                  <p className="text-gray-700">{welcomeData.paragraph_5}</p>
                )}
              </li>
              <li>
                <strong>Segítség a kezdőknek:</strong>
                {welcomeData && (
                  <p className="text-gray-700">{welcomeData.paragraph_6}</p>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div
          className="w-full md:w-1/2 mt-4 md:mt-0 flex justify-center"
          data-aos="fade-left"
        >
          <img
            src={`${process.env.NEXT_PUBLIC_UPLOADS_URL}/welcome_image_b024785e85_e9b7ad2ec5.png`}
            alt="Fonalbaba 2024"
            className="max-w-[300px] h-auto rounded-lg shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default Welcome;
