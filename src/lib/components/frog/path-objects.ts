export type AnyPath = CirclePath | RectanglePath;

export const PathType = {
    Circle: 1,
    Rectangle: 2,
} as const;
type PathType = (typeof PathType)[keyof typeof PathType];

export class CirclePath {
    pathType: typeof PathType.Circle = PathType.Circle;

    x: number;
    y: number;
    radius: number;

    constructor(x: number, y: number, radius: number) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
}

export class RectanglePath {
    pathType: typeof PathType.Rectangle = PathType.Rectangle;

    x: number;
    y: number;
    width: number;
    height: number;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}
