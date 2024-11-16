import React from "react";

const Footer = () => {
  return (
    <footer className="backdrop-blur-lg border-t border-accent/80 bg-nav_bg font-sans tracking-wide mt-32">
      <div className="py-12 px-6 lg:px-12">
        {/* Logo és navigáció */}
        <div className="flex flex-wrap items-center sm:justify-between max-sm:flex-col gap-6">
          <div>
            <a href="#">
              <img
                src={`${process.env.NEXT_PUBLIC_UPLOADS_URL}/bg_remove_logo_1830fa5c96.png`}
                alt="Fonalbaba Logo"
                className="w-32"
              />
            </a>
          </div>

          {/* Navigációs linkek */}
          <ul className="flex items-center justify-center flex-wrap gap-y-2 md:justify-end space-x-6">
            <li>
              <a
                href="/"
                className="text-[#5A5A5A] hover:text-[#D4A373] hover:underline text-base transition"
              >
                Főoldal
              </a>
            </li>
            <li>
              <a
                href="/mintak"
                className="text-[#5A5A5A] hover:text-[#D4A373] hover:underline text-base transition"
              >
                Minták
              </a>
            </li>
            <li>
              <a
                href="/bemutatkozas"
                className="text-[#5A5A5A] hover:text-[#D4A373] hover:underline text-base transition"
              >
                Bemutatkozás
              </a>
            </li>
            <li>
              <a
                href="/kapcsolat"
                className="text-[#5A5A5A] hover:text-[#D4A373] hover:underline text-base transition"
              >
                Kapcsolat
              </a>
            </li>
          </ul>
        </div>

        {/* Elválasztó vonal */}
        <hr className="my-6 border-[#E8DCC5]" />

        {/* Szerzői jog */}
        <p className="text-center text-[#5A5A5A] text-base">
          © 2024 Fonalbaba. Minden jog fenntartva.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
