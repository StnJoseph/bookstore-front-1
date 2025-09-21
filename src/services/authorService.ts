export type Organization = {
  id: number;
  name: string;
  tipo: string;
};

export type Prize = {
  id: number;
  premiationDate: string;
  name: string;
  description: string;
  organization: Organization;
};

export type Editorial = {
  id: number;
  name: string;
};

export type Book = {
  id: number;
  name: string;
  isbn: string;
  image: string;
  publishingDate: string;
  description: string;
  editorial: Editorial;
};

export type Author = {
  id: number;
  birthDate: string;
  name: string;
  description: string;
  image: string;
  books: Book[];
  prizes: Prize[];
};

export type AuthorCreate = Omit<Author, "id">;
export type AuthorUpdate = Partial<Omit<Author, "id">>;


const AUTHORS_URL = "http://127.0.0.1:8080/api/authors";

async function assertOk(res: Response): Promise<void> {
  if (!res.ok) {
    let detail = "";
    try {
      detail = await res.text();
    } catch {
      /* ignore */
    }
    const trimmed = detail.slice(0, 300);
    throw new Error(`HTTP ${res.status} ${res.statusText}${trimmed ? ` – ${trimmed}` : ""}`);
  }
}

// ===== CRUD =====
export async function getAuthors(): Promise<Author[]> {
  const res = await fetch(AUTHORS_URL, { headers: { Accept: "application/json" }, cache: "no-store" });
  await assertOk(res);
  const json: unknown = await res.json();
  return json as Author[]; // la API devuelve un array directo
}

export async function getAuthor(id: number | string): Promise<Author> {
  const res = await fetch(`${AUTHORS_URL}/${id}`, { headers: { Accept: "application/json" }, cache: "no-store" });
  await assertOk(res);
  const json: unknown = await res.json();
  return json as Author;
}

export async function createAuthor(payload: AuthorCreate): Promise<Author> {
  const res = await fetch(AUTHORS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  await assertOk(res);
  const json: unknown = await res.json();
  return json as Author;
}

export async function updateAuthor(id: number | string, payload: AuthorUpdate): Promise<Author> {
  const res = await fetch(`${AUTHORS_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  await assertOk(res);
  const json: unknown = await res.json();
  return json as Author;
}

export async function deleteAuthor(id: number | string): Promise<void> {
  const res = await fetch(`${AUTHORS_URL}/${id}`, { method: "DELETE" });
  await assertOk(res);
}
