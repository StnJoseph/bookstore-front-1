"use client";
import { useEffect, useState } from "react";

export function useFetch<T = unknown>(url: string | URL) {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true; // evita setState tras desmontar
    setIsPending(true);

    fetch(url.toString(), { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json() as Promise<T>;
      })
      .then((json) => {
        if (!mounted) return;
        setData(json);
        setError(null);
      })
      .catch((e) => {
        if (!mounted) return;
        setError(String(e));
      })
      .finally(() => {
        if (!mounted) return;
        setIsPending(false);
      });

    return () => {
      mounted = false;
    };
  }, [url]);

  return { data, isPending, error };
}
