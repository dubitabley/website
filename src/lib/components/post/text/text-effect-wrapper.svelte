<script lang="ts">
    import type { Snippet } from "svelte";
    import type { EffectType, TextEffectContext } from "./text-effect-types";
    import { setTextEffectContext } from "./text-effect-types";

    type Props = {
        children: Snippet;
        effectType: EffectType;
    };

    let { children, effectType }: Props = $props();

    let textEffectContext: TextEffectContext = $state({
        sections: [],
        effectType: () => effectType,
    });

    setTextEffectContext(textEffectContext);
</script>

<div>
    {@render children()}
</div>
