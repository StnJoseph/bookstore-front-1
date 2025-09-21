"use client";

import { useCallback, useEffect, useState } from "react";
import { getAuthors, createAuthor, updateAuthor, deleteAuthor, type Author, type AuthorCreate, type AuthorUpdate} from "@/services/authorService";

export function useAuthors(initialFetch = true) {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState<string | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAuthors();
      setAuthors(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al cargar autores");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialFetch) void reload();
  }, [initialFetch, reload]);

  const create = useCallback(async (payload: AuthorCreate) => {
    const created = await createAuthor(payload);
    setAuthors(prev => [created, ...prev]);
    return created;
  }, []);

  const update = useCallback(async (id: number | string, payload: AuthorUpdate) => {
    const updated = await updateAuthor(id, payload);
    setAuthors(prev => prev.map(a => (a.id === Number(id) ? updated : a)));
    return updated;
  }, []);

  const remove = useCallback(async (id: number | string) => {
    await deleteAuthor(id);
    setAuthors(prev => prev.filter(a => a.id !== Number(id)));
  }, []);

  const getById = useCallback(
    (id: number | string) => authors.find(a => a.id === Number(id)) ?? null,
    [authors]
  );

  return { authors, loading, error, reload, create, update, remove, getById };
}
