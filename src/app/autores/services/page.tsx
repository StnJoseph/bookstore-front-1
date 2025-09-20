// src/app/students/services/page.tsx
"use client";

import { useAuthorServices } from "@/hooks/useAuthorServices";

export default function ServicesPage() {
  // We use our custom hook. All the complex logic is hidden!
  const { services, isLoading, error } = useAuthorServices();

  // State-based conditional rendering.
  if (isLoading) {
    return <div className="text-center p-8">Cargando servicios...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Servicios Disponibles</h1>
      <ul className="space-y-4">
        {services.map((service) => (
          <li key={service.id} className="p-4 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">{service.name}</h2>
            <p className="text-gray-600">{service.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}