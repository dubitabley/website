import { createContext, type Snippet } from "svelte";

export const [getFootnoteContext, setFootnoteContext] =
    createContext<FootnoteContextClosure>();

export type FootnoteContextClosure = Array<() => Snippet>;
