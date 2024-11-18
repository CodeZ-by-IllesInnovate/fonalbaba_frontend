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

  // Input mezők értékeinek kezelése
  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form beküldésének kezelése
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage("Üzenet sikeresen elküldve!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setResponseMessage(
          data.error || "Hiba történt az üzenet elküldésekor."
        );
      }
    } catch (error) {
      setResponseMessage("Nem sikerült elküldeni az üzenetet. Próbáld újra.");
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
          {["name", "email", "subject"].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="text-sm font-medium text-gray-700"
              >
                {field === "name"
                  ? "Név"
                  : field === "email"
                  ? "E-mail"
                  : "Tárgy"}
              </label>
              <input
                id={field}
                type={field === "email" ? "email" : "text"}
                name={field}
                placeholder={
                  field === "name"
                    ? "Név"
                    : field === "email"
                    ? "E-mail"
                    : "Tárgy"
                }
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 text-gray-800 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                required
              />
            </div>
          ))}
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
