import { ColourScheme, type ThemeValues } from "./theme-misc";

export const SimpleTheme = {
    Purple: "purple",
    Blue: "blue",
    Orange: "orange",
} as const;

export type SimpleTheme = (typeof SimpleTheme)[keyof typeof SimpleTheme];

export function getThemeFromSimple(theme: SimpleTheme): ThemeValues {
    switch (theme) {
        case SimpleTheme.Purple:
            return PURPLE_THEME;
        case SimpleTheme.Blue:
            return BLUE_THEME;
        case SimpleTheme.Orange:
            return ORANGE_THEME;
    }
}

const PURPLE_THEME: ThemeValues = {
    primaryColour: "#afc8dd",
    primaryColour2: "#afddbc",

    primaryLightness: 10,
    secondaryLightness: 80,

    backgroundColour: "#28083f",
    backgroundColour2: "#1b012d",

    colourScheme: ColourScheme.Dark,
};

const BLUE_THEME: ThemeValues = {
    primaryColour: "#03183f",
    primaryColour2: "#abdda6",

    primaryLightness: 90,
    secondaryLightness: 20,

    backgroundColour: "#82d9e5",
    backgroundColour2: "#7184e2",

    colourScheme: ColourScheme.Light,
};

const ORANGE_THEME: ThemeValues = {
    primaryColour: "#d88117",
    primaryColour2: "#e09f14",

    primaryLightness: 10,
    secondaryLightness: 80,

    backgroundColour: "#080f08",
    backgroundColour2: "#0e161c",

    colourScheme: ColourScheme.Dark,
};
