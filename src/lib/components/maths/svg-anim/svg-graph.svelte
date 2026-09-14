<script lang="ts">
    type Props = {
        centreX: number;
        centreY: number;
    };

    let { centreX, centreY }: Props = $props();
</script>

<line x1={centreX} x2={centreX} y1="-10000" y2="10000"></line>
<line x1="-10000" x2="10000" y1={centreY} y2={centreY}></line>
