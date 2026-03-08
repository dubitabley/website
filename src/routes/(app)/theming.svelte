<script lang="ts">
    import {
        getThemeFromLocalStorage,
        setTheme,
        ThemeType,
        type Theme,
    } from "$lib/components/theming/theme-misc";
    import { onMount } from "svelte";
    import ThemePopup from "$lib/components/theming/theme-popup.svelte";

    let theme: Theme = $state({ themeType: ThemeType.System });
    type CheckboxTheme = typeof ThemeType.Light | typeof ThemeType.Dark;

    function selectTheme(
        checkboxTheme: CheckboxTheme,
        checkbox: HTMLInputElement,
    ) {
        if (checkbox.checked) {
            theme = { themeType: checkboxTheme };
        } else {
            theme = { themeType: ThemeType.System };
        }
    }

    onMount(() => {
        const themeValue = getThemeFromLocalStorage();
        if (themeValue) {
            theme = themeValue;
        }
    });

    $effect(() => {
        setTheme(theme);
    });
</script>

<span class="theme-wrapper">
    <p>Theme:</p>
    <label>
        <input
            type="checkbox"
            onclick={(e) => selectTheme(ThemeType.Light, e.currentTarget)}
            checked={theme.themeType == ThemeType.Light}
        />
        <span>Light</span>
    </label>
    <label>
        <input
            type="checkbox"
            onclick={(e) => selectTheme(ThemeType.Dark, e.currentTarget)}
            checked={theme.themeType == ThemeType.Dark}
        />
        <span>Dark</span>
    </label>
    <label>
        <input
            class="custom-popover"
            type="button"
            popovertarget="theme-popover"
        />
        <span>Custom</span>
    </label>
</span>
<ThemePopup bind:theme />

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

        &:hover {
            background-color: hsl(150, 100%, var(--secondary-lightness));
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

    .custom-popover {
        position: absolute;
        display: none;
    }
</style>
