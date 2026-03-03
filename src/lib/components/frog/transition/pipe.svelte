<script lang="ts">
    const value = "11.0010010000111111011010101000100010000101101000110";
</script>

<frog-pipe>{value}</frog-pipe>

<style>
    frog-pipe {
        text-decoration-line: underline overline;
        text-decoration-thickness: 2px;
        text-decoration-style: wavy;
        rotate: 80deg;
        display: inline-block;

        animation-name: pipe-colour;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-direction: normal;
    }

    @keyframes pipe-colour {
        0% {
            text-decoration-color: red;
        }

        14% {
            text-decoration-color: orange;
        }

        28% {
            text-decoration-color: yellow;
        }

        43% {
            text-decoration-color: green;
        }

        57% {
            text-decoration-color: blue;
        }

        71% {
            text-decoration-color: indigo;
        }

        86% {
            text-decoration-color: violet;
        }

        100% {
            text-decoration-color: red;
        }
    }
</style>
