import { createContext } from "svelte";

export type DraftContext = {
    enabled: () => boolean;
};

export const [getDraftContext, setDraftContext] = createContext<DraftContext>();
