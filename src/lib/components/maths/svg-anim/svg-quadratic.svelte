<script lang="ts">
    type Props = {
        a: number;
        b: number;
        c: number;
    };

    let { a, b, c }: Props = $props();

    // https://stackoverflow.com/questions/8772944/fit-a-svg-curve-to-a-polynomial
</script>

<path d="M10,0 Q90,90 20,0" />
