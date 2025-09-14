<script lang="ts">

    const Theme = {
        System: 0,
        Light: 1,
        Dark: 2,
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

    $effect(() => {
        const rootElement = document.documentElement;

        switch (theme) {
            case Theme.System:
                delete rootElement.dataset.theme;
                break;
            case Theme.Light:
                rootElement.dataset.theme = "light";
                break;
            case Theme.Dark:
                rootElement.dataset.theme = "dark";
                break;
        }
    });
</script>

<style>
    
    /* Hide inputs so we can apply custom style */
    input[type=checkbox] {
        opacity: 0;
        width: 0;
        height: 0;
    }

    label {
        flex: 1;
        display: flex;
    }

    label > span {
        background-color: var(--primary-color);
        color: var(--background-color);
        border: 2px solid var(--background-color);
        padding: 4px;
    }

    input:checked + span {
        background-color: hsl(117, 100%, var(--secondary-lightness));
    }

    .theme-wrapper {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .theme-wrapper > * {
        margin: 0;
    }

    
</style>

<span class="theme-wrapper">
    <p>Theme:</p>
    <label>
        <input type="checkbox" onclick="{(e) => selectTheme(Theme.Light, e.currentTarget)}" checked={theme == Theme.Light} />
        <span>Light</span>
    </label>
    <label>
        <input type="checkbox" onclick="{(e) => selectTheme(Theme.Dark, e.currentTarget)}" checked={theme == Theme.Dark} />
        <span>Dark</span>
    </label>
</span>
