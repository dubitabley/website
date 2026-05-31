<script lang="ts">
    type Props = {
        name: string;
        values: string[];
        value: string;
    };

    let { name, values, value = $bindable(values[0]) }: Props = $props();
</script>

<div class="radio-wrapper">
    {#each values as radioValue}
        <label class="radio-block">
            <div class="arrow-wrapper">
                <div class="arrow"></div>
            </div>
            <div class="content-wrapper">
                {radioValue}
            </div>
            <input type="radio" {name} value={radioValue} bind:group={value} />
        </label>
    {/each}
</div>

<style>
    input[type="radio"] {
        display: none;
    }

    .content-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    .radio-block {
        font-size: 30px;
        background-color: var(--background-color-2);
        --border-color: hsl(50, 100%, var(--primary-lightness));
        border: var(--border-color) inset 3px;
        box-shadow: 0px 0px 4px 4px var(--border-color);
        --width: 100px;
        --height: 120px;
        width: var(--width);
        height: var(--height);
        border-radius: 20px;
        transition: box-shadow 0.2s;

        &:hover {
            background-color: var(--background-color);
        }

        &:has(input:checked) {
            border: var(--primary-color-2) inset 3px;
            box-shadow: 0px 0px 4px 4px var(--primary-color-2);

            .arrow-wrapper {
                position: relative;
                width: 0;
                height: 0;

                .arrow {
                    content: "";
                    width: var(--width);
                    height: calc(0.2 * var(--height));
                    background-color: var(--primary-color-2);
                    position: absolute;
                    left: calc(0 * var(--width));
                    bottom: calc(-1 * var(--height));
                    clip-path: shape(
                        from 0 100%,
                        line to 100% 100%,
                        line to 50% 0,
                        line to 0 100%
                    );
                }
            }
        }
    }

    .radio-wrapper {
        display: flex;
        flex-direction: row;
        gap: 15px;
    }
</style>
