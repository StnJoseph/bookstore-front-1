"use client";

import { useAuthors } from "@/hooks/useAuthorServices";

export default function Favorites() {
  const { authors, loading, error } = useAuthors();

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
        </li>
      )}
    </ul>
  </div>
  );
}
