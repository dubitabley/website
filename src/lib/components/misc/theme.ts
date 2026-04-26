// javascirpt method for extracting the theme from css
// keep in sync with global.css
export type Colours = {
    primaryColour: string;
    backgroundColour: string;
};

export function getCurrentTheme(): Colours {
    // get style of root
    const style = window.getComputedStyle(document.documentElement);
    const primaryColour = style.getPropertyValue("--primary-color");
    const backgroundColour = style.getPropertyValue("--background-color");

    return {
        primaryColour,
        backgroundColour,
    };
}
