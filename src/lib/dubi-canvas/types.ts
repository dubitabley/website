export type Vector2 = { x: number, y: number };
export type DrawFn = (ctx: CanvasRenderingContext2D) => void;
export type CanvasContext = {
    addDrawFunction: (fn: DrawFn) => void,
    removeDrawFunction: (fn: DrawFn) => void,
    addHudDrawFunction: (fn: DrawFn) => void,
    removeHudDrawFunction: (fn: DrawFn) => void,
}
export type ClickEvent = {
    position: Vector2
};
export type PhysicsContext = {
    position: Vector2
    velocity: Vector2
};
export type GameParams = {
    deltaTime: number
};
export type GameFn = (params: GameParams) => void;
export type GameContext = {
    addGameLoopFunction: (fn: GameFn) => void,
    removeGameLoopFunction: (fn: GameFn) => void,
};

export const Context = {
    Canvas: 0,
    Game: 1,
    Physics: 2
} as const;
export type ContextType = (typeof Context)[keyof typeof Context];

// TODO: move this somewhere else
export const BALL_RADIUS = 30;
export const CANVAS_WIDTH = 1200;
export const CANVAS_HEIGHT = 700;