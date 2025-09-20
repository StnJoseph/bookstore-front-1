"use client";
import { useFetch } from "@/hooks/useFetch";

const AUTHORS_URL = "http://127.0.0.1:8080/api/authors";

type Organization = {
    id: number;
    name: string;
    tipo: string;
}

type Prizes = {
    id: number;
    premiationDate: string;
    name: string;
    description: string;
    organization: Organization;
}

type Editorial = {
    id: number;
    name: string;
}

type Book = {
    id: number;
    name: string;
    isbn: number;
    image: string;
    publishingDate: string;
    description: string;
    editorial: Editorial;
}

type Author = { 
    id: number;
    birthDate: string;
    name: string;
    description: string;
    image: string;
    books: Book[];
    prizes: Prizes[];
}

export default function Lister() {
    const { data, isPending, error } = useFetch<Author[]>(AUTHORS_URL);

    if (isPending) {
        return <div>Loading…</div>;
    }
        
    if (error) {
        return <div className="text-red-500">{error}</div>;
    }
        
    return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Servicios Disponibles</h1>
      <ul className="space-y-4">
        {data?.map((author) => 
          <li key={author.id} className="p-4 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">{author.name}</h2>
            <p className="text-gray-600">{author.description}</p>
          </li>
        )}
      </ul>
    </div>
    );
}