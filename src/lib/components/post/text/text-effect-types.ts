import { createContext, type Snippet } from "svelte";

export type TextEffectContext = {
    sections: Snippet[];
    effectType: () => EffectType;
};

export const EffectType = {
    None: 0,
    FadeIn: 1,
} as const;
export type EffectType = (typeof EffectType)[keyof typeof EffectType];

export const [getTextEffectContext, setTextEffectContext] =
    createContext<TextEffectContext>();
