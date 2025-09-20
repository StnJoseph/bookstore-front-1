export interface Service {
  id: number;
  name: string;
  description: string;
}

export const fetchUserServices = (): Promise<Service[]> => {
  const services: Service[] = [
    {
      id: 1,
      name: "Tutoría Académica",
      description: "Sesiones con profesores para resolver dudas.",
    },
    {
      id: 2,
      name: "Cita Médica Bienestar",
      description: "Atención primaria para estudiantes.",
    },
    {
      id: 3,
      name: "Asesoría de Proyectos",
      description: "Soporte en proyectos de investigación.",
    },
  ];
  // We simulate asynchrony and the possibility of error.
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 1500) + 500; // Delay between 0.5 y 2 seconds
    setTimeout(() => {
      if (Math.random() < 0.2) {
        // 20% probability of error
        reject(new Error("Error de red simulado al obtener servicios."));
      } else {
        resolve(services);
      }
    }, delay);
  });
};