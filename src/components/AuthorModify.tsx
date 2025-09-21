"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuthors } from "@/hooks/useAuthorServices";
import type { AuthorUpdate } from "@/services/authorService";

export default function AuthorModify() {
  const router = useRouter();
  const params = useParams<{ id: string }>(); // /autores/[id]/editar
  const id = Number(params.id);

  const { authors, getById, update, reload, loading, error } = useAuthors();
  const author = useMemo(() => getById(id), [getById, id]);

  // Si el autor no está aún en memoria, intenta recargar
  useEffect(() => {
    if (!author && !loading) void reload();
  }, [author, loading, reload]);

  // Estado local del formulario (parcial: AuthorUpdate)
  const [form, setForm] = useState<AuthorUpdate>({
    name: "",
    birthDate: "",
    image: "",
    description: "",
    // books y prizes se omiten para el ejemplo (puedes añadirlos si los editas)
  });

  // Cuando llegue el autor, precarga el form
  useEffect(() => {
    if (author) {
      setForm({
        name: author.name,
        birthDate: author.birthDate,
        image: author.image,
        description: author.description,
      });
    }
  }, [author]);

  const [submitting, setSubmitting] = useState(false);
  const [formError, setError] = useState<string | null>(null);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author) return;
    setSubmitting(true);
    setError(null);
    try {
      // Valida lo mínimo
      if (!form.name?.trim()) throw new Error("El nombre es obligatorio");
      if (!form.birthDate) throw new Error("La fecha de nacimiento es obligatoria");

      await update(id, form);
      router.push("/autores"); // vuelve a la lista
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && !author) return <div className="p-6">Cargando autor…</div>;
  if (error && !author) return <div className="p-6 text-red-600">{error}</div>;
  if (!author) return <div className="p-6">No se encontró el autor.</div>;

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-4">
      {formError && <div className="text-red-600">{formError}</div>}

      <div className="grid gap-2">
        <label className="text-sm font-medium">Nombre</label>
        <input
          name="name"
          value={form.name ?? ""}
          onChange={onChange}
          className="border rounded px-3 py-2"
          required
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium">Fecha de nacimiento</label>
        <input
          type="date"
          name="birthDate"
          value={form.birthDate ?? ""}
          onChange={onChange}
          className="border rounded px-3 py-2"
          required
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium">Imagen (URL)</label>
        <input
          name="image"
          value={form.image ?? ""}
          onChange={onChange}
          className="border rounded px-3 py-2"
          placeholder="https://..."
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium">Descripción</label>
        <textarea
          name="description"
          value={form.description ?? ""}
          onChange={onChange}
          rows={4}
          className="border rounded px-3 py-2"
          placeholder="Bio del autor…"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-black text-white rounded px-4 py-2 disabled:opacity-60"
      >
        {submitting ? "Guardando…" : "Guardar cambios"}
      </button>
    </form>
  );
}
