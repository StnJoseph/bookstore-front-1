import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AuthorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const routes = [
    { name: "Adicionar autor", path: "/autores/crear" },
    // { name: "Editar", path: "/autores/${id}/editar" },
    // { name: "Gestionar Servicios", path: "/autores/gestionar servicios" },
    
  ];
  return (
    <div className="flex flex-col min-h-screen">
      <Header routes={routes} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}