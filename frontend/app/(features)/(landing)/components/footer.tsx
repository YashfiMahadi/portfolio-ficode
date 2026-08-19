"use client";
import React from "react";

interface FooterProps {
  profileName?: string;
}

export default function Footer({ profileName }: FooterProps) {
  const navItems = [
    { id: "hero", label: "Beranda" },
    { id: "about", label: "Tentang" },
    { id: "skills", label: "Keahlian" },
    { id: "projects", label: "Proyek" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0f172a] border-t border-white/5 py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {profileName || "Portfolio"}
          </p>
          <div className="flex gap-4 text-sm">
            {navItems.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className="text-gray-500 hover:text-white transition">
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}