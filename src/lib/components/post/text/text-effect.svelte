<script lang="ts">
    import { onMount, type Snippet } from "svelte";
    import { EffectType, getTextEffectContext } from "./text-effect-types";

    type FadeTextProps = {
        children: Snippet;
    };

    let { children }: FadeTextProps = $props();

    let textEffectContext = getTextEffectContext();
    let effectType = textEffectContext.effectType;

    let isFadeIn = $derived(effectType() == EffectType.FadeIn);
    let effectClass = $derived.by(() => {
        switch (effectType()) {
            case EffectType.FadeIn:
                return "fade-appear";
            default:
                return "";
        }
    });
    let effectActive = $state(false);

    let scrollElem: HTMLElement;
    let intersectionObserver: IntersectionObserver;

    onMount(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            scrollMargin: "0px",
            threshold: 1.0,
        };
        intersectionObserver = new IntersectionObserver((entries) => {
            effectActive = entries[0].isIntersecting;
        }, options);
        intersectionObserver.observe(scrollElem);

        return () => {
            intersectionObserver.disconnect();
        };
    });
</script>

<div
    class={[
        "text-effect",
        isFadeIn && "fade-text",
        effectActive && effectClass,
    ]}
    bind:this={scrollElem}
>
    {@render children()}
</div>

<style>
    .fade-text {
        transition: all 2s;
        opacity: 0;
        translate: 0 -10px;

        :global(&.fade-appear) {
            opacity: inherit;
            translate: inherit;
        }
    }
</style>
