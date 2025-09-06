import type { PageServerLoad } from "./$types.js";
import Books from "$lib/interests/books.json";
import { error } from "@sveltejs/kit";

export const load = (({ params }) => {
  const book = Books.books.find((x) => x.link == params.book_link);
  if (book) {
    return {
      bookInfo: book,
    };
  }

  error(404);
}) satisfies PageServerLoad;
