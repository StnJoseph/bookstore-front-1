// src/components/AuthorForm.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AuthorCreate } from "@/services/authorService";
import { useAuthors } from "@/hooks/useAuthorServices";

export default function AuthorCreate() {
  const router = useRouter();
  const { create } = useAuthors(false); // no hace fetch inicial
  const [form, setForm] = useState<AuthorCreate>({
    name: "",
    birthDate: "",
    description: "",
    image: "",
    books: [],   // tu API los acepta como arrays
    prizes: [],
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      // validaciones mínimas
      if (!form.name.trim()) throw new Error("El nombre es obligatorio");
      if (!form.birthDate) throw new Error("La fecha de nacimiento es obligatoria");

      await create(form);
      router.push("/autores"); // vuelve a la lista
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-4">
      {error && <div className="text-red-600">{error}</div>}

      <div className="grid gap-2">
        <label className="text-sm font-medium">Nombre</label>
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="J.K. Rowling"
          className="border rounded px-3 py-2"
          required
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium">Fecha de nacimiento</label>
        <input
          type="date"
          name="birthDate"
          value={form.birthDate}
          onChange={onChange}
          className="border rounded px-3 py-2"
          required
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium">Imagen (URL)</label>
        <input
          name="image"
          value={form.image}
          onChange={onChange}
          placeholder="https://..."
          className="border rounded px-3 py-2"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium">Descripción</label>
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          placeholder="Bio del autor…"
          rows={4}
          className="border rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-black text-white rounded px-4 py-2 disabled:opacity-60"
      >
        {submitting ? "Creando…" : "Crear autor"}
      </button>
    </form>
  );
}
