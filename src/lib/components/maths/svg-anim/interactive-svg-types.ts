import { createContext } from "svelte";

export type InteractiveElement = {
    moveElement(x: number, y: number): void;
    getElements(): SVGElement[];
};

export type InteractiveSvgContext = {
    addInteractiveElement: (element: InteractiveElement) => void;
    removeInteractiveElement: (element: InteractiveElement) => void;
};

export const [getInteractiveSvgContext, setInteractiveSvgContext] =
    createContext<InteractiveSvgContext>();
