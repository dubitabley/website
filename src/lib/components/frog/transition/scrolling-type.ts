import type { Snippet } from "svelte";

export const ScrollingObjectType = {
    DataBlock: "data-block",
    RainbowCuboid: "rainbow-cuboid",
    Pipe: "pipe",
} as const;
export type ScrollingObjectType =
    (typeof ScrollingObjectType)[keyof typeof ScrollingObjectType];

export type DataBlock = {
    objectType: typeof ScrollingObjectType.DataBlock;
    lines?: number;
};

export type RainbowCuboid = {
    objectType: typeof ScrollingObjectType.RainbowCuboid;
};

export type Pipe = {
    objectType: typeof ScrollingObjectType.Pipe;
};

export type SnippetWithParams<T> = [Snippet<[T]>, T];

export type GenericScrollingObject = DataBlock | RainbowCuboid | Pipe;
