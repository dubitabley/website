
export const ScrollingObjectType = {
    DataBlock: "data-block"
} as const;
export type ScrollingObjectType = typeof ScrollingObjectType[keyof typeof ScrollingObjectType];

export type DataBlock = {
    objectType: typeof ScrollingObjectType.DataBlock
}

export type GenericScrollingObject = DataBlock;
