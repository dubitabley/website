<!--
  @component A better simple writing text component using Javascript to show the text one character at a time
-->
<script lang="ts">
    import { onMount, untrack } from "svelte";

    type WritingTextProps = {
        text: string;
        appear: boolean;
        speed?: number;
    };

    let { text, appear, speed = 40 }: WritingTextProps = $props();

    let index = $state(0);
    let timer: number | null = $state(null);

    $effect(() => {
        // use untrack so don't get infinite loop
        if (untrack(() => timer) != null) {
            clearInterval(untrack(() => timer!));
            timer = null;
        }

        if (appear) {
            index = 0;
            timer = setInterval(() => {
                index += 1;
            }, convertSpeed(speed));
        } else {
            index = 0;
        }
    });

    function convertSpeed(speed: number): number {
        // speed ranges from 1-100. 1 means it moves very slowly
        // 100 means it goes really fast - around 20ms
        // 50 should map to around 50 as well
        return (100 * 20) / speed;
    }

    onMount(() => {
        return () => {
            if (timer != null) {
                clearInterval(timer);
            }
        };
    });
</script>

<div>
    <span>{text.substring(0, index)}</span
    ><!--
        remove whitespace between elements
    --><span class="hide"
        >{text.substring(index)}</span
    >
</div>

<style>
    .hide {
        visibility: hidden;
    }
</style>
