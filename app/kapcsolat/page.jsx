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
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Kapcsolatfelvétel
        </h1>
        <p className="text-gray-600 mb-8">
          Ha bármilyen kérdésed van, töltsd ki az alábbi űrlapot.
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Név"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 text-gray-800 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 text-gray-800 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Tárgy"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-2 text-gray-800 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            name="message"
            rows="6"
            placeholder="Üzenet"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 text-gray-800 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-600 transition duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Küldés..." : "Küldés"}
          </button>
        </form>
        {responseMessage && (
          <p className="text-center text-gray-800 mt-4">{responseMessage}</p>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
