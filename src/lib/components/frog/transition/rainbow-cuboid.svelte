<script lang="ts">
    import Cuboid from "$lib/components/css3d/cuboid.svelte";
</script>

<cuboid-wrapper>
    <Cuboid />
</cuboid-wrapper>

<style>
    cuboid-wrapper {
        /*animation: cuboid-rotate 3s linear infinite;*/

        :global(.cuboid-side) {
            border: 3px solid black;
            padding: 5px;
            background-image: linear-gradient(
                45deg,
                red,
                orange,
                yellow,
                green,
                blue,
                indigo,
                violet
            );
            opacity: 0.7;
            background-origin: border-box;
            background-clip: padding-box, border-box;
        }

        :global(.cuboid) {
            /*transform: rotateX(64deg) rotateZ(36deg);*/
            animation: cuboid-rotate 3s linear infinite;
        }

        :global(*) {
            box-sizing: border-box;
        }
    }

    @keyframes cuboid-rotate {
        from {
            transform: rotateX(0deg) rotateY(0deg) translateZ(50px);
        }

        to {
            transform: rotateX(360deg) rotateY(360deg) translateZ(50px);
        }
    }

    :global(*) {
        transform-style: preserve-3d;
    }
</style>
