"use client";
import React, { useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  BoltIcon,
  CheckCircleIcon,
  DocsIcon,
  FolderIcon,
  GridIcon,
  HorizontaLDots,
  TimeIcon,
  UserCircleIcon,
} from "../icons/index";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path: string;
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: <UserCircleIcon />,
    name: "Profil / Biodata",
    path: "/portfolio/profile",
  },
  {
    icon: <BoltIcon />,
    name: "Keahlian / Skill",
    path: "/portfolio/skills",
  },
  {
    icon: <TimeIcon />,
    name: "Pengalaman Kerja",
    path: "/portfolio/experience",
  },
  {
    icon: <DocsIcon />,
    name: "Pendidikan",
    path: "/portfolio/education",
  },
  {
    icon: <FolderIcon />,
    name: "Proyek",
    path: "/portfolio/projects",
  },
  {
    icon: <CheckCircleIcon />,
    name: "Sertifikasi",
    path: "/portfolio/certifications",
  },
  {
    icon: <GridIcon />,
    name: "Lihat Landing Page",
    path: "/cv",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const renderMenuItems = (navItems: NavItem[]) => (
    <ul className="flex flex-col gap-4">
      {navItems.map((nav) => (
        <li key={nav.name}>
          <Link
            href={nav.path}
            className={`menu-item group ${
              isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
            }`}
          >
            <span
              className={`${
                isActive(nav.path)
                  ? "menu-item-icon-active"
                  : "menu-item-icon-inactive"
              }`}
            >
              {nav.icon}
            </span>
            {(isExpanded || isHovered || isMobileOpen) && (
              <span className={`menu-item-text`}>{nav.name}</span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );

  // const isActive = (path: string) => path === pathname;
  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex  ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image
                className="dark:hidden"
                src="/images/logo/ficode-logo.svg"
                alt="Logo"
                width={150}
                height={40}
              />
              <Image
                className="hidden dark:block"
                src="/images/logo/ficode-logo.svg"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <Image
              src="/images/logo/favicon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>
              {renderMenuItems(navItems)}
            </div>

            <div className="">
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
              </h2>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
