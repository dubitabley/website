import type { Snippet } from "svelte";

export const ScrollingObjectType = {
    DataBlock: "data-block"
} as const;
export type ScrollingObjectType = typeof ScrollingObjectType[keyof typeof ScrollingObjectType];

export type DataBlock = {
    objectType: typeof ScrollingObjectType.DataBlock,
    lines?: number,
}

export type SnippetWithParams<T> = [Snippet<[T]>, T];

export type GenericScrollingObject = DataBlock;
