import { createContext } from "svelte"

export type FrogContext = {
    x: number,
    y: number,
    size: number,
    direction: number
}

export type FrogInfo = {
    x: number,
    y: number,
    size: number,
    direction: number
}

export const [getFrogContext, setFrogContext] = createContext<FrogContext>();
