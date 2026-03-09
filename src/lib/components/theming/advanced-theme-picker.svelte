<script lang="ts">
    import ColourPicker from "./colour-picker.svelte";
    import { type CustomTheme } from "./theme-misc";

    type AdvancedThemeProps = {
        customTheme: CustomTheme;
    };

    let { customTheme = $bindable() }: AdvancedThemeProps = $props();
</script>

<div>Choose primary colour:</div>
<ColourPicker bind:colour={customTheme.customValues.primaryColour} />
<div>Choose primary colour 2:</div>
<ColourPicker bind:colour={customTheme.customValues.primaryColour2} />
<div>Choose background colour:</div>
<ColourPicker bind:colour={customTheme.customValues.backgroundColour} />
<div>Choose background colour 2:</div>
<ColourPicker bind:colour={customTheme.customValues.backgroundColour2} />
<div>Choose primary lightness:</div>
<!-- todo: mess around with a custom percentage input -->
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
