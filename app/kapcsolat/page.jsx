"use client";
import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://fonalbaba.hu/contact.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setResponseMessage(
          "Üzenet elküldve! Hamarosan felvesszük veled a kapcsolatot."
        );
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setResponseMessage(
          "Hiba történt az üzenet elküldése közben. Kérlek, próbáld újra!"
        );
      }
    } catch (error) {
      setResponseMessage(
        "Nem sikerült elküldeni az üzenetet. Kérlek, próbáld újra!"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-12">
      <div className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-[#FFFBEA] to-[#FFFDF5] shadow-xl rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Kapcsolatfelvétel
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Ha bármilyen kérdésed van, töltsd ki az alábbi űrlapot.
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Név
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Név"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="text-sm font-medium text-gray-700"
            >
              Tárgy
            </label>
            <input
              id="subject"
              type="text"
              name="subject"
              placeholder="Tárgy"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="text-sm font-medium text-gray-700"
            >
              Üzenet
            </label>
            <textarea
              id="message"
              name="message"
              rows="6"
              placeholder="Üzenet"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className={`w-full py-3 text-white font-bold rounded-md transition duration-200 ${
              isSubmitting
                ? "bg-[#D4A373] opacity-70"
                : "bg-[#D4A373] hover:bg-[#C19261]"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Küldés..." : "Küldés"}
          </button>
        </form>
        {responseMessage && (
          <p className="text-center text-gray-700 mt-6">{responseMessage}</p>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
