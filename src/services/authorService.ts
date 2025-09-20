export interface Service {
  id: number;
  birthDate: string;
  name: string;
  description: string;
  image: string;
}

export const fetchAuthorServices = (): Promise<Service[]> => {
  const services: Service[] = [
    {
      id:1000, 
      birthDate:"1965-07-31",
      name:"J.K. Rowling",
      description:"Joanne Rowling, who writes under the pseudonyms J. K. Rowling and Robert Galbraith, is an English writer, film producer and screenwriter, best known as the author of the Harry Potter series of books.",
      image:"https://static1.mujerhoy.com/www/multimedia/202007/20/media/cortadas/jk-rowling-polemica-transfobia-k0TB-U110849049600hyD-624x936@MujerHoy.jpg"
    },
    {
      id:1001,
      birthDate:"1947-09-21",
      name:"Stephen King",
      description:"Stephen Edwin King, better known as Stephen King and occasionally by his pen name Richard Bachman, is an American writer of horror novels, supernatural fiction, mystery, science fiction and fantasy literature.",
      image:"https://imagessl.casadellibro.com/img/autores/292.jpg"
    }
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
