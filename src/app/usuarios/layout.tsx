import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const routes = [
    { name: "Servicios", path: "/usuarios/services" },
    { name: "Préstamos", path: "/usuarios/loans" },
    { name: "Mis Reservas", path: "/usuarios/reservations" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header routes={routes} />
      <main className="flex-grow">
        {children}{" "}
        {/* The current page will be rendered here (e.g., students/page.tsx). */}
      </main>
      <Footer />
    </div>
  );
}