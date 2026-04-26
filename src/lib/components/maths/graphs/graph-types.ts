import { createContext } from "svelte";

export type GraphContext = {
    addObject: (object: GraphObject) => void;
};

export const [getGraphContext, setGraphContext] = createContext<GraphContext>();

export interface GraphObject {
    draw(ctx: CanvasRenderingContext2D, size: number): void;
}
