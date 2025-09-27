import type { EntryGenerator } from "./$types";
import Books from "$lib/interests/books.json";

export const entries: EntryGenerator = () => {
  return Books.books.filter(x => x.link).map((x) => {
    return {
      book_link: x.link,
    };
  });
};
