"use client";

import AuthorCreate from "@/components/AuthorCreate";
import { useTranslation } from "react-i18next";

export default function CrearAutorPage() {
  const { t } = useTranslation(); 

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">{t("about.subtitleCreate")}</h1>
      <AuthorCreate />
    </main>
  );
}
