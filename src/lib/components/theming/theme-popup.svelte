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
    import SimpleThemePicker from "./simple-theme-picker.svelte";
    import AdvancedThemePicker from "./advanced-theme-picker.svelte";

    // for decoration
    let randomColour1 = $state(getRandomColour());
    let randomColour2 = $state(getRandomColour());

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

    let simpleTheme = $state(true);

    let popoverElement: HTMLElement;

    function onToggle(event: ToggleEvent) {
        if (event.newState === "open") {
            oldTheme = theme;

            randomColour1 = getRandomColour();
            randomColour2 = getRandomColour();

            const themeValues = shallowClone(getThemeValues(oldTheme));

            customTheme = {
                themeType: ThemeType.Custom,
                customValues: themeValues,
            };
        } else {
            // on close, reset the theme
            resetTheme();
        }
    }

    function closePopover() {
        // set the old theme to the current theme so resetting doesn't override it
        oldTheme = theme;
        // closes the popover without resetting the theme
        popoverElement.hidePopover();
    }

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

<dialog
    id="theme-popover"
    popover
    onbeforetoggle={onToggle}
    bind:this={popoverElement}
>
    <div class="header-wrapper">
        <hgroup
            class="header"
            style="--colour-1:{randomColour1};--colour-2:{randomColour2};"
        >
            <h1>Theme Picker</h1>
            <p>Choose a custom theme!</p>
        </hgroup>
    </div>

    {#if simpleTheme}
        <SimpleThemePicker bind:customTheme />
    {:else}
        <AdvancedThemePicker bind:customTheme />
    {/if}

    <div class="button-toolbar">
        <button onclick={closePopover}>Save and close</button>
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

        transition: translate 0.2s;
        translate: 0 -100%;

        &:popover-open {
            translate: 0 0;
            @starting-style {
                translate: 0 -100%;
            }
        }
    }

    .button-toolbar {
        margin-top: 30px;

        > button {
            background-color: var(--background-color-2);
            color: var(--primary-color);
            border: 3px solid var(--primary-color);
            border-radius: 10px;
            margin-right: 5px;
            padding: 8px;

            font-size: 18px;

            transition-property: background-color color;
            transition-duration: 0.2s;

            &:hover {
                background-color: var(--primary-color);
                color: var(--background-color);
            }
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
