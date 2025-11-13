import { createContext, type Snippet } from "svelte";

export const GameState = {
    Start: 0,
    Transition: 1
} as const;
export type GameState = typeof GameState[keyof typeof GameState];

export type GameStateInfo = {
    gameState: GameState,
}

export type FrogPageContext = {
    setGameState(gameState: GameState): void;
    setFrogSnippet(snippet: Snippet | null): void;
}

export const [getFrogPageContext, setFrogPageContext] = createContext<FrogPageContext>();
