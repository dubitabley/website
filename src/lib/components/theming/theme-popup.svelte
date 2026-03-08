<script lang="ts">
    import {
        DARK_THEME,
        getRandomColour,
        getThemeValues,
        shallowClone,
        ThemeType,
        type CustomTheme,
        type Theme,
    } from "./theme-misc";
    import ColourPicker from "./colour-picker.svelte";

    // for decoration
    const randomColour1 = getRandomColour();
    const randomColour2 = getRandomColour();

    type ThemePopupProps = {
        theme: Theme;
    };

    let { theme = $bindable() }: ThemePopupProps = $props();

    let customTheme: CustomTheme = $state({
        themeType: ThemeType.Custom,
        customValues: DARK_THEME, // placeholder
    });

    // for resetting
    let oldTheme: Theme = $state({ themeType: ThemeType.System });

    function onToggle(event: ToggleEvent) {
        if (event.newState === "open") {
            oldTheme = theme;

            const themeValues = shallowClone(getThemeValues(oldTheme));

            customTheme = {
                themeType: ThemeType.Custom,
                customValues: themeValues,
            };
        } else {
            // on close, reset the theme
        }
    }

    function saveTheme() {}

    function closePopover() {}

    function resetTheme() {
        const themeValues = shallowClone(getThemeValues(oldTheme));

        customTheme = {
            themeType: ThemeType.Custom,
            customValues: themeValues,
        };
    }

    $effect(() => {
        theme = customTheme;
    });
</script>

<dialog id="theme-popover" popover onbeforetoggle={onToggle}>
    <div class="header-wrapper">
        <hgroup
            class="header"
            style="--colour-1:{randomColour1};--colour-2:{randomColour2};"
        >
            <h1>Theme Picker</h1>
            <p>Choose a custom theme!</p>
        </hgroup>
    </div>
    <div>Choose primary colour:</div>
    <ColourPicker bind:colour={customTheme.customValues.primaryColour} />
    <div>Choose primary colour 2:</div>
    <ColourPicker bind:colour={customTheme.customValues.primaryColour2} />
    <div>Choose background colour:</div>
    <ColourPicker bind:colour={customTheme.customValues.backgroundColour} />
    <div>Choose background colour 2:</div>
    <ColourPicker bind:colour={customTheme.customValues.backgroundColour2} />
    <div>Choose background colour 3:</div>
    <ColourPicker bind:colour={customTheme.customValues.backgroundColour3} />
    <div>Choose primary lightness:</div>
    <input
        type="number"
        min="0"
        max="100"
        step="1"
        bind:value={customTheme.customValues.primaryLightness}
    />
    <div>Choose secondary lightness:</div>
    <input
        type="number"
        min="0"
        max="100"
        step="1"
        bind:value={customTheme.customValues.secondaryLightness}
    />

    <div>
        <button>Save and close</button>
        <button onclick={resetTheme}>Reset</button>
    </div>
</dialog>

<style>
    #theme-popover {
        width: 600px;
        height: 800px;
        padding-left: 100px;
        padding-right: 100px;
        color: var(--primary-color);
        background-color: var(--background-color);

        &::backdrop {
            backdrop-filter: blur(3px);
        }
    }

    .header-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .header {
        padding-left: 20px;
        padding-right: 20px;
        text-align: center;

        border-width: 20px;
        border-style: solid;
        border-top-width: 5px;
        border-bottom-width: 5px;
        border-image: linear-gradient(var(--colour-1), var(--colour-2)) 30;
    }
</style>
