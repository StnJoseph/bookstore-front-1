"use client";

import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation(); 

  return (
    <footer className="bg-black text-white text-center p-4 mt-auto">
      <p>{t("about.footer")}</p>
    </footer>
  );
};

export default Footer;