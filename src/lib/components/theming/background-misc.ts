export const BackgroundType = {
    Default: "default",
    Flat: "flat",
} as const;
export type BackgroundType =
    (typeof BackgroundType)[keyof typeof BackgroundType];

export type Background = {
    type: BackgroundType;
};

const BACKGROUND_STORAGE_KEY: string = "background";

export function getAllBackgroundTypes(): BackgroundType[] {
    return [BackgroundType.Default, BackgroundType.Flat];
}

export function setBackground(background: BackgroundType) {
    const rootElement = document.documentElement;

    switch (background) {
        case BackgroundType.Flat:
            rootElement.dataset.background = background;
            break;
        case BackgroundType.Default:
            // delete value, set back to default
            delete rootElement.dataset.background;
            break;
    }

    // save to localstorage
    localStorage.setItem(BACKGROUND_STORAGE_KEY, background);
}

export function getBackgroundFromLocalStorage(): BackgroundType | null {
    const backgroundType = <BackgroundType | null>(
        localStorage.getItem(BACKGROUND_STORAGE_KEY)
    );

    return backgroundType;
}
