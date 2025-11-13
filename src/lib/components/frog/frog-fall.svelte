<!-- for when a frog is falling and can only move a small amount -->
<script lang="ts">
    import { Spring, Tween } from "svelte/motion";
    import { getFrogContext } from "./frog-types";
    import { onMount } from "svelte";
    import { cubicOut } from "svelte/easing";

    const frog = getFrogContext();

    const UP_DIR = -Math.PI / 2;

    let rotation = new Spring(UP_DIR, {
        damping: 0.2,
        stiffness: 0.2
    });

    const X_MOVE: number = 100;
    const Y_MOVE: number = 30;
    const X_TWEEN_DURATION: number = 1000;
    const Y_TWEEN_DURATION: number = 1000;

    let frogX = new Tween(frog.x, {
        duration: X_TWEEN_DURATION,
        easing: cubicOut,
    });
    let frogY = new Tween(frog.y, {
        duration: Y_TWEEN_DURATION,
        easing: cubicOut,
    });
    let frogXTimeout: number | null = null;

    function onMouseDown(e: MouseEvent) {
        const targetX = e.pageX;
        const targetY = e.pageY;

        const xDiff = targetX - frog.x;
        const yDiff = targetY - frog.y;

        const xMove = Math.min(Math.abs(xDiff), X_MOVE);
        const yMove = Math.min(Math.abs(yDiff), Y_MOVE);
        const targetFrogX = frog.x + xMove * Math.sign(xDiff);
        const targetFrogY = frog.y + yMove * Math.sign(yDiff);

        if (Math.abs(xDiff) > 0.1) {
            rotation.target = UP_DIR + 0.5 * (xDiff > 0 ? 1 : -1);
        } else {
            rotation.target = UP_DIR;
        }
        frogX.target = targetFrogX;
        frogY.target = targetFrogY;
        if (frogXTimeout) {
            clearTimeout(frogXTimeout);
        }
        frogXTimeout = setTimeout(() => {
            rotation.target = UP_DIR;
        }, X_TWEEN_DURATION - 200);
    }

    let animationFrame: number | null = $state(null);

    onMount(() => {
        document.documentElement.addEventListener("mousedown", onMouseDown);

        animationFrame = requestAnimationFrame(update);

        return () => {
            document.documentElement.removeEventListener("mousedown", onMouseDown);

            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        }
    });

    function update() {

        frog.direction = rotation.current;
        frog.x = frogX.current;
        frog.y = frogY.current;

        animationFrame = requestAnimationFrame(update);
    }



</script>
