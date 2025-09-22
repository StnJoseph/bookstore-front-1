"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  es: {
    translation: {
      "about.title": "El Autor",
      "about.subtitleAvailable": "Autores disponibles",
      "about.addAuthorButton": "Adicionar autor",
      "about.editButton": "Editar",
      "about.deleteButton": "Eliminar",

      "about.subtitleCreate": "Crear autor",
      "about.name": "Nombre",
      "about.birthDay": "Fecha de nacimiento",
      "about.image": "Imagen (URL)",
      "about.description": "Descripción",
      "about.creating": "Creando...",
      "about.createAuthorButton": "Crear autor",

      "about.subtitleEdit": "Editar autor",
      "about.saving": "Guardando...",
      "about.saveChanges": "Guardar cambios",
      
      "about.loading": "Cargando…",
      "about.error": "Ocurrió un error",
      "about.footer": "© 2025 El Autor. Todos los derechos reservados."
    }
  },
  en: {
    translation: {
      "about.title": "The Author",
      "about.subtitleAvailable": "Available authors",
      "about.addAuthorButton": "Add author",
      "about.editButton": "Edit",
      "about.deleteButton": "Delete",

      "about.subtitleCreate": "Create author",
      "about.name": "Name",
      "about.birthDay": "Birth date",
      "about.image": "Image (URL)",
      "about.description": "Description",
      "about.creating": "Creating...",
      "about.createAuthorButton": "Create author",

      "about.subtitleEdit": "Edit author",
      "about.saving": "Saving...",
      "about.saveChanges": "Save changes",

      "about.loading": "Loading…",
      "about.error": "Something went wrong",
      "about.footer": "© 2025 The Author. All rights reserved."
    }
  }
};

// Para evitar doble inicialización en HMR
let initialized = false;

export function ensureI18n() {
  if (initialized || i18n.isInitialized) return i18n;

  i18n
    // .use(LanguageDetector) Falla si oprimo el boton de cambiar
    .use(initReactI18next)
    .init({
      resources,
      lng: "es", // Con esto soluiono el problema de arriba. Por defecto inicio con es
      fallbackLng: "es",
      supportedLngs: ["es", "en"],
      nonExplicitSupportedLngs: true,
      detection: {
        order: ["querystring", "localStorage", "cookie", "navigator"],
        caches: ["localStorage", "cookie"]
      },
      interpolation: { escapeValue: false },
      debug: false
    });

  initialized = true;
  return i18n;
}

export default i18n;
