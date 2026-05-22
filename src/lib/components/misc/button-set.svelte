<script module>
    export type ButtonValue = {
        value: number;
        label: string;
    };
</script>

<script lang="ts">
    type Props = {
        values: ButtonValue[];
        value: number;
    };

    let { values, value = $bindable() }: Props = $props();
</script>

<fieldset>
    {#each values as buttonValue}
        <button
            ><label>
                {buttonValue.label}
                <input
                    type="radio"
                    name="buttonset"
                    value={buttonValue.value}
                    bind:group={value}
                />
            </label></button
        >
    {/each}
</fieldset>

<style>
    fieldset {
        display: flex;
        flex-direction: row;
        padding: 0;
    }
    label {
        display: block;
        padding: 0.5em;

        &:has(input[type="radio"]:checked) {
            background-color: var(--primary-color);
            color: var(--background-color);
        }
        &:hover {
            background-color: var(--primary-color-2);
            color: var(--background-color-2);
        }
        input[type="radio"] {
            position: absolute;
            clip-path: circle(0);
        }
    }
    button {
        all: unset;
        border-right: 2px solid var(--primary-color);
    }
</style>
