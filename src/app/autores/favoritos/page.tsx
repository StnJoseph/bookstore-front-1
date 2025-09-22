import Favorites from "@/components/Favorites";

export default function MostrarFavoriteAutorPage() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Tus autores favoritos son:</h1>
      <Favorites/>
    </main>
  );
}