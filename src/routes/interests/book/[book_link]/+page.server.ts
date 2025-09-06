import type { EntryGenerator } from "./$types";
import Books from "$lib/interests/books.json";

export const entries: EntryGenerator = () => {
  return Books.books.map((x) => {
    return {
      book_link: x.link,
    };
  });
};
