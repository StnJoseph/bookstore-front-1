"use client";

import { useState } from "react";
import { useUserServices } from "@/hooks/useUserServices";
import { Service } from "@/services/userService";
import Modal from "@/components/Modal"; // We import the Modal component.

export default function ServicesPage() {
  // We use our custom hook. All the complex logic is hidden!
  const { services, isLoading, error } = useUserServices();

  // New state for modal visibility and selected service.
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

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
          <li
            key={service.id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleServiceClick(service)} // Hacemos el item clicable
          >
            <h2 className="text-xl font-semibold">{service.name}</h2>
            <p className="text-gray-600 mt-2">{service.description}</p>
          </li>
        ))}
      </ul>

      {/* We render the Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedService?.name ?? "Detalle del Servicio"}
      >
        {/* Modal content */}
        <p>{selectedService?.description}</p>
        <p className="mt-4 text-sm text-gray-500">
          ID del Servicio: {selectedService?.id}
        </p>
      </Modal>
    </div>
  );
}