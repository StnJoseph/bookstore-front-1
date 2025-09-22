"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";

interface Route {
  name: string;
  path: string;
}

const Header = ({ routes }: { routes: Route[] }) => {
  const { t, i18n } = useTranslation();
  const current = i18n.resolvedLanguage || i18n.language || "es";
  const next = current.startsWith("es") ? "en" : "es";

  const toggleLang = () => i18n.changeLanguage(next);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = current;
    }
  }, [current]);

  return (
    <header className="bg-yellow-300 text-black p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/logo.jpg"
            alt="Logo de SeneTime"
            width={40}
            height={40}
          />
          <span className="text-2xl font-semibold">{t("about.title")}</span>
        </Link>
        <nav className="flex items-center gap-3">
          {routes.map((route) => {
            const label = route.name.startsWith("t:")
              ? t(route.name.slice(2))
              : route.name;
            return (
              <Link key={route.path} href={route.path} className="px-3 hover:text-gray-700">
                {label}
              </Link>
            );
          })}

          <button
            onClick={toggleLang}
            className="ml-2 rounded border border-black/30 px-3 py-1 hover:bg-black/5"
            aria-label={`Switch language to ${next.toUpperCase()}`}
          >
            {current.startsWith("es") ? "EN" : "ES"}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
