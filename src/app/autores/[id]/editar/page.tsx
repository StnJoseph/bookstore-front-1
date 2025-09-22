"use client";

import AuthorModify from "@/components/AuthorModify";
import { useTranslation } from "react-i18next";

export default function EditarAutorPage() {
  const { t } = useTranslation(); 

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">{t("about.subtitleEdit")}</h1>
      <AuthorModify />
    </main>
  );
}
