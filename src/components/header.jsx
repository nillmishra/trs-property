"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import AuthModal from "./auth/auth-modal";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "@/redux/authSlice";
import toast from "react-hot-toast";
import ProfileDrawer from "./(profile)/profile-drawer";
import { usePathname, useRouter } from "next/navigation";
import HeaderDrawer from "./(profile)/header-drawer";
const links = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT US" },
  { href: "/property", label: "PROPERTIES" },
  { href: "/consultant-lounge", label: "CONSULTANT LOUNGE" },
  { href: "/builder-lounge", label: "BUILDER LOUNGE" },
  { href: "/contact", label: "CONTACT US" },
];

function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const resumeSubmit = () => {
      const submitBtn = document.querySelector("button[type='submit']");
      submitBtn?.click();
    };

    window.addEventListener("resume-form-submit", resumeSubmit);
    return () => window.removeEventListener("resume-form-submit", resumeSubmit);
  }, []);

  const handlerLogout = () => {
    dispatch(clearAuth());
    toast.success("Successfully logged out");
    router.push("/");
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full property-gradient backdrop-blur-sm">
        <div className="container mx-auto py-2 sm:py-3 flex items-center gap-3 sm:gap-5 justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-end flex-shrink-0">
            <Image
              src="/assets/logo/logo2.avif"
              alt="Logo"
              width={70}
              height={80}
             
            />
            <Image
              src="/assets/logo/logo1.avif"
              alt="Logo"
              width={150}
              height={150}
              
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`relative text-sm font-bold transition-all duration-300 group
                  ${pathname === href
                    ? "text-amber-400"
                    : "text-white opacity-90 hover:opacity-100 hover:text-amber-300"
                  }`}
              >
                {label}

                {/* Underline */}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-amber-400 transition-all duration-300
                    ${pathname === href
                      ? "w-full"                          // active → full underline
                      : "w-0 group-hover:w-full"          // hover → animate in
                    }`}
                />
              </Link>
            ))}

            {token ? (
              <ProfileDrawer onLogout={handlerLogout} user={user} />
            ) : (
              <button
                onClick={() => router.push("/post-property")}
                className="golden-button group relative overflow-hidden bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-gray-900 px-3 sm:px-5 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-semibold cursor-pointer transition-all duration-300 hover:shadow-[0_0_20px_rgba(251,191,36,0.5)] border border-amber-300/50 whitespace-nowrap"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  Post Property
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            )}
          </nav>
          {/* Mobile */}
          <div className="flex items-center gap-2 sm:gap-4 md:hidden">
            {token ? (
              <ProfileDrawer onLogout={handlerLogout} user={user} />
            ) : (
              <button
                onClick={() => setOpen(true)}
                className="golden-button group relative overflow-hidden bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-gray-900 px-3 sm:px-4 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm font-semibold whitespace-nowrap"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  LogIn
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            )}

            <HeaderDrawer
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              links={links}
            />
          </div>
        </div>
      </header>

      <AuthModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default Header;
