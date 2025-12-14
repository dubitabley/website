<script lang="ts">
    import { onMount } from "svelte";

    const THEME_STORAGE_KEY: string = "theme";

    const Theme = {
        System: "system",
        Light: "light",
        Dark: "dark",
        Purple: "purple",
    } as const;

    type ThemeType = (typeof Theme)[keyof typeof Theme];

    let theme: ThemeType = $state(Theme.System);

    function selectTheme(checkboxTheme: ThemeType, checkbox: HTMLInputElement) {
        if (checkbox.checked) {
            theme = checkboxTheme;
        } else {
            theme = Theme.System;
        }
    }

    onMount(() => {
        const themeValue = localStorage.getItem(THEME_STORAGE_KEY);
        if (themeValue) {
            theme = <ThemeType>themeValue;
        }
    });

    $effect(() => {
        const rootElement = document.documentElement;

        switch (theme) {
            case Theme.System:
                delete rootElement.dataset.theme;
                break;
            default:
                rootElement.dataset.theme = theme;
                break;
        }

        // save to localstorage
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    });
</script>

<span class="theme-wrapper">
    <p>Theme:</p>
    <label>
        <input
            type="checkbox"
            onclick={(e) => selectTheme(Theme.Light, e.currentTarget)}
            checked={theme == Theme.Light}
        />
        <span>Light</span>
    </label>
    <label>
        <input
            type="checkbox"
            onclick={(e) => selectTheme(Theme.Dark, e.currentTarget)}
            checked={theme == Theme.Dark}
        />
        <span>Dark</span>
    </label>
    <label>
        <input
            type="checkbox"
            onclick={(e) => selectTheme(Theme.Purple, e.currentTarget)}
            checked={theme == Theme.Purple}
        />
        <span>Purple</span>
    </label>
</span>

<style>
    /* Hide inputs so we can apply custom style */
    input[type="checkbox"] {
        opacity: 0;
        position: absolute;
    }

    label {
        background-color: var(--primary-color);
        color: var(--background-color);
        padding-left: 8px;
        padding-right: 8px;

        padding-top: 3px;
        padding-bottom: 3px;

        text-align: center;

        &:has(input:checked) {
            background-color: hsl(117, 100%, var(--secondary-lightness));
            box-shadow: 3px 3px 0px 0px
                hsl(117, 80%, var(--secondary-lightness));
        }
    }

    .theme-wrapper {
        display: flex;
        flex-direction: column;
        margin: 10px;
        gap: 5px;
        & * {
            margin: 0;
        }

        & p {
            font-weight: bold;
            font-size: 25px;
        }
    }
</style>
