<script lang="ts">
    import Cuboid from "$lib/components/css3d/cuboid.svelte";
</script>

{#snippet side()}
    This works without javascript!
{/snippet}

<div class="centre">
    <cuboid-wrapper>
        <Cuboid --width="300px" --height="300px" side2={side} />
    </cuboid-wrapper>
</div>

<style>
    .centre {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        min-height: 600px;
    }

    cuboid-wrapper {
        animation: cuboid-rotate 3s linear infinite;

        :global(.cuboid_side) {
            font-family: Verdana, Geneva, Tahoma, sans-serif;
            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;

            &:nth-child(1),
            &:nth-child(2) {
                background: radial-gradient(orange 0%, red 100%);
            }

            &:nth-child(3),
            &:nth-child(4),
            &:nth-child(5),
            &:nth-child(6) {
                background-color: mediumseagreen;
            }
        }
    }

    @keyframes cuboid-rotate {
        from {
            transform: rotateX(0deg) rotateY(0deg);
        }

        to {
            transform: rotateX(360deg) rotateY(360deg);
        }
    }

    :global(*) {
        box-sizing: border-box;
        transform-style: preserve-3d;
    }

    :global(html) {
        background-color: grey;
    }
</style>
