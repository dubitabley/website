import { createContext, type Snippet } from "svelte";

export const [getFootnoteContext, setFootnoteContext] =
    createContext<FootnoteContext>();

type FootnoteContext = Snippet[];
