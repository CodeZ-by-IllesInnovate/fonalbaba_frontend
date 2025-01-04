import React from "react";

const Footer = () => {
  return (
    <footer className="backdrop-blur-lg border-t border-accent/80 bg-nav_bg font-sans tracking-wide mt-32">
      <div className="container mx-auto py-12 px-6 lg:px-12 space-y-12">
        {/* Logo és szlogen */}
        <div className="flex flex-col items-center space-y-4">
          <a href="#">
            <img
              src={`${process.env.NEXT_PUBLIC_UPLOADS_URL}/bg_remove_logo_1830fa5c96.png`}
              alt="Fonalbaba Logo"
              className="w-36"
            />
          </a>
          <p className="text-sm text-[#5A5A5A] text-center font-light">
            Inspiráció a kézimunka szerelmeseinek
          </p>
        </div>

        {/* Navigációs linkek */}
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { href: "/", text: "Főoldal" },
            { href: "/mintak", text: "Minták" },
            { href: "/bemutatkozas", text: "Bemutatkozás" },
            { href: "/kapcsolat", text: "Kapcsolat" },
          ].map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="text-[#5A5A5A] hover:text-[#D4A373] text-base font-medium tracking-wide transition duration-200 ease-in-out hover:underline"
            >
              {link.text}
            </a>
          ))}
        </div>

        {/* Social média ikonok */}
        <div className="flex justify-center space-x-6">
          {[
            {
              href: "https://www.facebook.com/profile.php?id=61553840530009",
              icon: "/facebook.svg",
              alt: "Facebook",
            },
          ].map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="p-2 rounded-full bg-[#E8DCC5] hover:bg-[#D4A373] transition duration-200">
                <img
                  src="/facebook.svg"
                  alt={social.alt}
                  className="w-6 h-6 group-hover:scale-110 transition-transform"
                />
              </div>
            </a>
          ))}
        </div>

        {/* Elválasztó vonal */}
        <hr className="border-[#E8DCC5]" />

        {/* Szerzői jog */}
        <div className="text-center text-[#5A5A5A] text-sm">
          <p>© 2024 Fonalbaba. Minden jog fenntartva.</p>
          <p className="mt-2">
            Készítette:{" "}
            <a
              href="https://illesinnovate.hu"
              className="text-[#D4A373] hover:underline font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Illés Innovate
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
