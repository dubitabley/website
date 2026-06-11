<script lang="ts">
    import StellatedEnneagram from "./stellated-enneagram.svelte";

    const word = "dubitable";

    type Props = {
        onFinish: () => void;
    };

    let { onFinish }: Props = $props();
</script>

<div class="surround">
    <StellatedEnneagram innerText={word} {onFinish} />
</div>

<style>
    .surround {
        /* todo work out these dimensions */
        width: 500px;
        height: 500px;
    }
</style>
