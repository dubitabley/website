<script lang="ts">
    import { getThemeFromSimple, SimpleTheme } from "./simple-theme-misc";
    import { type CustomTheme } from "./theme-misc";
    import ThemeSplodge from "./theme-splodge.svelte";

    type AdvancedThemeProps = {
        customTheme: CustomTheme;
    };

    let { customTheme = $bindable() }: AdvancedThemeProps = $props();

    let simpleTheme: SimpleTheme | null = $state(null);

    function selectTheme(newTheme: SimpleTheme) {
        if (newTheme == simpleTheme) {
            simpleTheme = null;
        } else {
            simpleTheme = newTheme;
            customTheme.customValues = getThemeFromSimple(newTheme);
        }
    }

    const themeValues: [SimpleTheme, string][] = [
        [SimpleTheme.Purple, "purple"],
        [SimpleTheme.Blue, "blue"],
        [SimpleTheme.Orange, "orange"],
    ];
</script>

<div>Pick from a selection of colours for a pre-defined colour scheme!</div>

<h3>Theme:</h3>
<div class="theme-wrapper">
    {#each themeValues as [theme, colour], index}
        <ThemeSplodge
            {colour}
            --rotation="{index * 30}deg"
            isSelected={simpleTheme == theme}
            onClick={() => selectTheme(theme)}
        >
            {theme}
        </ThemeSplodge>
    {/each}
</div>

<style>
    .theme-wrapper {
        display: flex;
        flex-direction: row;
    }
</style>
