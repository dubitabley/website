<script lang="ts">
    type ColourPickerProps = {
        colour: string;
    };

    let { colour = $bindable() }: ColourPickerProps = $props();
</script>

<div>
    <!-- todo: change to a cooler custom colour picker? -->
    <input type="color" bind:value={colour} />
</div>
