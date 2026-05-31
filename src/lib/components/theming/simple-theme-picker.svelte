<script lang="ts">
    import CustomRadio from "../misc/custom-radio.svelte";
    import { BackgroundType, getAllBackgroundTypes } from "./background-misc";
    import { getThemeFromSimple, SimpleTheme } from "./simple-theme-misc";
    import { type CustomTheme } from "./theme-misc";
    import ThemeSplodge from "./theme-splodge.svelte";

    type AdvancedThemeProps = {
        customTheme: CustomTheme;
        background: BackgroundType;
    };

    let {
        customTheme = $bindable(),
        background = $bindable(),
    }: AdvancedThemeProps = $props();

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
        [SimpleTheme.Purple, "#28083f"],
        [SimpleTheme.Blue, "#82d9e5"],
        [SimpleTheme.Orange, "#d88117"],
    ];
</script>

<div>Pick from a selection of colours for a pre-defined colour scheme!</div>

<h3>Colour Theme:</h3>
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
<h3>Background Style:</h3>
<div class="theme-wrapper">
    <CustomRadio
        name="background"
        values={getAllBackgroundTypes()}
        bind:value={background}
    />
</div>

<style>
    .theme-wrapper {
        display: flex;
        flex-direction: row;
    }
</style>
