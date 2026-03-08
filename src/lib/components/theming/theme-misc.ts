import { getRandomInt } from "../frog/util/random";

export function getRandomColour(): string {
    const red = getRandomColourString();
    const green = getRandomColourString();
    const blue = getRandomColourString();
    return `#${red}${green}${blue}`;
}

function getRandomColourString(): string {
    const colour = getRandomInt(0, 16 * 16).toString(16);
    return colour.length == 1 ? `0${colour}` : colour;
}

export function getSystemTheme(): ThemeValues {
    switch (window.matchMedia("(prefers-color-scheme)").media) {
        case "dark":
            return DARK_THEME;
        case "light":
        case "not all":
        default:
            return LIGHT_THEME;
    }
}

const THEME_STORAGE_KEY: string = "theme";
const CUSTOM_THEME_STORAGE_KEY: string = "custom_theme";

export const ThemeType = {
    System: "system",
    Light: "light",
    Dark: "dark",
    Custom: "custom",
} as const;

export type ThemeType = (typeof ThemeType)[keyof typeof ThemeType];

export type SystemTheme = {
    themeType: typeof ThemeType.System;
};

export type LightTheme = {
    themeType: typeof ThemeType.Light;
};

export type DarkTheme = {
    themeType: typeof ThemeType.Dark;
};

export type CustomTheme = {
    themeType: typeof ThemeType.Custom;
    customValues: ThemeValues;
};

export type Theme = SystemTheme | LightTheme | DarkTheme | CustomTheme;

export function setTheme(theme: Theme) {
    const rootElement = document.documentElement;

    switch (theme.themeType) {
        case ThemeType.System:
            // delete the value and reset to system default
            delete rootElement.dataset.theme;
            clearCustomTheme();
            break;
        case ThemeType.Custom:
            rootElement.dataset.theme = theme.themeType;
            setCustomTheme(theme.customValues);
            // save custom values to local storage
            saveCustomValuesToLocalStorage(theme.customValues);
            break;
        default:
            rootElement.dataset.theme = theme.themeType;
            clearCustomTheme();
            break;
    }

    // save to localstorage
    localStorage.setItem(THEME_STORAGE_KEY, theme.themeType);
}

function setCustomTheme(customTheme: ThemeValues) {
    const root = document.documentElement;

    root.style.setProperty("--background-color", customTheme.backgroundColour);
    root.style.setProperty(
        "--background-color-2",
        customTheme.backgroundColour2,
    );
    root.style.setProperty(
        "--background-color-3",
        customTheme.backgroundColour3,
    );
    root.style.setProperty("--primary-color", customTheme.primaryColour);
    root.style.setProperty("--primary-color-2", customTheme.primaryColour2);
    root.style.setProperty(
        "--primary-lightness",
        `${customTheme.primaryLightness}%`,
    );
    root.style.setProperty(
        "--secondary-lightness",
        `${customTheme.secondaryLightness}%`,
    );
}

function clearCustomTheme() {
    const root = document.documentElement;

    root.style.removeProperty("--background-color");
    root.style.removeProperty("--background-color-2");
    root.style.removeProperty("--background-color-3");
    root.style.removeProperty("--primary-color");
    root.style.removeProperty("--primary-color-2");
    root.style.removeProperty("--primary-lightness");
    root.style.removeProperty("--secondary-lightness");
}

export function getThemeFromLocalStorage(): Theme | null {
    const themeType = <ThemeType | null>localStorage.getItem(THEME_STORAGE_KEY);
    if (themeType == null) {
        return null;
    }

    if (themeType == ThemeType.Custom) {
        const customValues = getCustomValuesFromLocalStorage();
        if (customValues == null) {
            return null;
        }
        return {
            themeType,
            customValues,
        };
    }
    return {
        themeType,
    };
}

function saveCustomValuesToLocalStorage(customTheme: ThemeValues) {
    localStorage.setItem(CUSTOM_THEME_STORAGE_KEY, JSON.stringify(customTheme));
}

function getCustomValuesFromLocalStorage(): ThemeValues | null {
    const values = localStorage.getItem(CUSTOM_THEME_STORAGE_KEY);
    if (values == null) {
        return null;
    }

    return JSON.parse(values);
}

export function getThemeValues(theme: Theme): ThemeValues {
    switch (theme.themeType) {
        case ThemeType.Dark:
            return DARK_THEME;
        case ThemeType.Light:
            return LIGHT_THEME;
        case ThemeType.System:
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                return DARK_THEME;
            } else {
                return LIGHT_THEME;
            }
        case ThemeType.Custom:
            return theme.customValues;
    }
}

export function shallowClone(themeValues: ThemeValues): ThemeValues {
    return Object.assign({}, themeValues);
}

export type ThemeValues = {
    primaryColour: string;
    primaryColour2: string;

    // percentages of the lightnesses
    primaryLightness: number;
    secondaryLightness: number;

    backgroundColour: string;
    backgroundColour2: string;
    backgroundColour3: string;
};

/* values need to be kept in sync with global.css */
export const DARK_THEME: ThemeValues = {
    primaryColour: "rgb(230, 230, 230)",
    primaryColour2: "rgb(197, 197, 197)",

    backgroundColour: "rgb(36, 36, 36)",
    backgroundColour2: "rgb(10, 10, 10)",
    backgroundColour3: "rgb(80, 80, 80)",

    primaryLightness: 10,
    secondaryLightness: 80,
};

export const LIGHT_THEME: ThemeValues = {
    primaryColour: "rgb(31, 31, 31)",
    primaryColour2: "rgb(51, 51, 51)",

    backgroundColour: "rgb(207, 207, 207)",
    backgroundColour2: "rgb(245, 245, 245)",
    backgroundColour3: "rgb(172, 172, 172)",

    primaryLightness: 90,
    secondaryLightness: 20,
};
