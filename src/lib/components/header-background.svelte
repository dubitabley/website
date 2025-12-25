<script lang="ts">
    type Props = {
        num?: number;
    };

    let { num = 30 }: Props = $props();
</script>

<div class="header-background">
    {#each { length: num }}
        <i></i>
    {/each}
</div>

<style>
    /*
        Based off the cool animation at
        https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Animations
    */
    .header-background {
        position: absolute;
        top: 0;

        & i {
            position: absolute;
            display: inline-block;
            height: 16px;
            width: 16px;
            border-radius: 50%;
            background-image: radial-gradient(
                var(--primary-color-2),
                transparent 70%
            );
            animation-composition: add, replace, add;
            animation-delay: 0s, 0s, 0s;
            animation-iteration-count: infinite, infinite, infinite;
            animation-name: falling, fade-out, wave;
            animation-timing-function: linear, linear, linear;
            animation-duration:
                var(--fall-duration), var(--fall-duration), var(--wave-duration);
        }

        :nth-of-type(7n) {
            --x-start: -200px;
            --x-end: 300px;
        }
        :nth-of-type(7n + 1) {
            --x-start: -600px;
            --x-end: -100px;
        }
        :nth-of-type(7n + 2) {
            --x-start: -300px;
            --x-end: 400px;
        }
        :nth-of-type(7n + 3) {
            --x-start: -300px;
            --x-end: 600px;
        }
        :nth-of-type(7n + 4) {
            --x-start: -500px;
            --x-end: 300px;
        }
        :nth-of-type(7n + 5) {
            --x-start: -100px;
            --x-end: 100px;
        }
        :nth-of-type(7n + 6) {
            --x-start: -800px;
            --x-end: 200px;
        }

        /* speed offsets */
        :nth-of-type(8n) {
            --fall-duration: 3s;
        }
        :nth-of-type(8n + 1) {
            --fall-duration: 1s;
        }
        :nth-of-type(8n + 2) {
            --fall-duration: 2s;
        }
        :nth-of-type(8n + 3) {
            --fall-duration: 6s;
        }
        :nth-of-type(8n + 4) {
            --fall-duration: 4s;
        }
        :nth-of-type(8n + 5) {
            --fall-duration: 3.5s;
        }
        :nth-of-type(8n + 6) {
            --fall-duration: 2.5s;
        }
        :nth-of-type(8n + 7) {
            --fall-duration: 4.5s;
        }

        /* speed offsets */
        :nth-of-type(5n) {
            --wave-duration: 6s;
        }
        :nth-of-type(5n + 1) {
            --wave-duration: 4s;
        }
        :nth-of-type(5n + 2) {
            --wave-duration: 3s;
        }
        :nth-of-type(5n + 3) {
            --wave-duration: 8s;
        }
        :nth-of-type(5n + 4) {
            --wave-duration: 6s;
        }
    }

    @keyframes falling {
        from {
            translate: 0px 0px;
        }
        to {
            translate: 0px 150px;
        }
    }

    @keyframes wave {
        0% {
            translate: var(--x-start) 0px;
        }
        100% {
            translate: var(--x-end) 0px;
        }
    }

    @keyframes fade-out {
        from {
            opacity: 60%;
        }

        to {
            opacity: 0%;
        }
    }
</style>
