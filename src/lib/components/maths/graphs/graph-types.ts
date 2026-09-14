import { createContext } from "svelte";

export type GraphContext = {
    addObject: (object: GraphObject) => void;
};

export const [getGraphContext, setGraphContext] = createContext<GraphContext>();

export type Dims = {
    left: number;
    right: number;
    top: number;
    bottom: number;
};

export type GraphInfo = {
    size: number;
    dims: Dims;
};

export interface GraphObject {
    draw(ctx: CanvasRenderingContext2D, graphInfo: GraphInfo): void;
}
