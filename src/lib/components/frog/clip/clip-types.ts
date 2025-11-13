import { createContext, type Snippet } from "svelte";

export type ClipObject = [Snippet<[any]>, any]

export type ClipContext = {
    clipObjects: ClipObject[]
}

export const [getClipContext, setClipContext] = createContext<ClipContext>();
