"use client";
import React, { useState, useCallback } from "react";
import Image from "next/image";
import UserDropdown from "@/shared/components/layout/header/user-dropdown";
import { auth } from "@/shared/services/auth.service";

interface NavItem { id: string; label: string; }

interface NavbarProps {
  profileName?: string | null;
}

export default function Navbar({ profileName }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = auth.getUser();

  const navItems: NavItem[] = [
    { id: "hero", label: "Beranda" },
    { id: "about", label: "Tentang" },
    { id: "skills", label: "Keahlian" },
    { id: "projects", label: "Proyek" },
    { id: "education", label: "Pendidikan" },
    { id: "experience", label: "Pengalaman" },
    { id: "certifications", label: "Sertifikasi" },
    { id: "contact", label: "Kontak" },
  ];

  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);

        document
            .getElementById(id)
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
    }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a]/95 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-2">
            <Image
                width={120}
                height={28}
                className="h-7 w-auto"
                src="/images/logo/ficode-logo.svg"
                alt="Logo"
            />
            </button>
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollTo(item.id)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition"
                >
                    {item.label}
                </button>
            ))}
            {user && (
            <div className="ml-2">
              <UserDropdown />
            </div>
            )}
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-gray-300">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-1">
            {navItems.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition">
                {item.label}
              </button>
            ))}

            {user && (
            <div className="border-t border-white/10 mt-3 pt-3">
                 <UserDropdown />
            </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}