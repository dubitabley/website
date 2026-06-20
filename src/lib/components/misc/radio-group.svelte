<!--
    @component Custom radio group
 -->
<script lang="ts" generics="T">
    type Props = {
        value: T;
        labelFunc: (t: T) => string;
        options: T[];
    };

    let { value = $bindable(), labelFunc, options }: Props = $props();

    let id = $props.id();
</script>

<div class="wrapper">
    {#each options as option}
        <label class="input-label">
            {labelFunc(option)}
            <input type="radio" name={id} value={option} bind:group={value} />
        </label>
    {/each}
</div>

<style>
    .wrapper {
        display: flex;
        flex-direction: row;
        gap: 1em;
    }
    .input-label {
        display: flex;
        font-weight: bold;
        flex-direction: column;
        padding: 0.3em;
        background-color: hsl(200, 40%, var(--primary-lightness));
        border: 3px solid hsl(200, 40%, var(--primary-lightness));

        &:has(input[type="radio"]:checked) {
            border: 3px solid green;
        }
    }
</style>
