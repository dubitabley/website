<!--
  @component A bad simple writing text component using Javascript to write the text one character at a time, will display strangely
-->
<script lang="ts">
    import { onMount, untrack } from "svelte";

    type WritingTextProps = {
        text: string;
        appear: boolean;
    };

    let { text, appear }: WritingTextProps = $props();

    let index = $state(0);
    let timer: number | null = $state(null);

    $effect(() => {
        if (appear) {
            index = 0;
            timer = setInterval(() => {
                index += 1;
            }, 50);
        } else {
            index = 0;
            if (untrack(() => timer) != null) {
                clearInterval(untrack(() => timer!));
                timer = null;
            }
        }
    });

    onMount(() => {
        return () => {
            if (timer != null) {
                clearInterval(timer);
            }
        };
    });
</script>

<div>
    {text.substring(0, index)}
</div>

<style>
</style>
