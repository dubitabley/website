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
            /* Use transparent so the background image is visible */
            border: 1px solid white;
            /*background-color: green;*/
            padding: 5px;
            border-radius: 5px;
            /*todo: change this to be more rainbowey*/
            background-image:
                linear-gradient(rgba(255, 0, 0, 0.3), orange),
                linear-gradient(to right, cyan, lime);
            background-origin: border-box;
            background-clip: padding-box, border-box;
        }

        :global(.cuboid) {
            /*transform: rotateX(64deg) rotateZ(36deg);*/
            animation: cuboid-rotate 3s linear infinite;
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
