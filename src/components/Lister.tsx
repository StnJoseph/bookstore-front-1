"use client";

import Link from "next/link";
import { useAuthors } from "@/hooks/useAuthorServices";

export default function Lister() {
  const { authors, loading, error, remove } = useAuthors();

  const onDelete = async (id:number, name:string) => {
    if (!confirm(`¿Eliminar a ${name}?`)) return;
    await remove(id);
  };

  if (loading) {
      return <div>Loading…</div>;
  }
      
  if (error) {
      return <div className="text-red-500">{error}</div>;
  }
      
  return (
  <div className="container mx-auto p-8">
    <ul className="space-y-4">
      {authors.map(author => 
        <li key={author.id} className="p-4 border rounded-lg shadow-sm">
          <h1 className="text-xl font-semibold">{author.name}</h1>
          <h2 className="text-xl font-semibold">{author.birthDate}</h2>
          <p className="text-gray-600">{author.description}</p>
          <div className="mt-4 flex gap-3">
            <Link
              href={`/autores/${author.id}/editar`}
              className="inline-block rounded bg-black px-3 py-1 text-white hover:opacity-90" aria-label={`Editar ${author.name}`}>
              Editar
            </Link>
            <button
              type="button"
              className="rounded border px-3 py-1 hover:bg-gray-50" onClick={() => onDelete(author.id, author.name)}>
              Eliminar
            </button>
          </div>
        </li>
      )}
    </ul>
  </div>
  );
}