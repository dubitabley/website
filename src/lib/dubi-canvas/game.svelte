<script lang="ts">
    import { onDestroy, onMount, setContext, type Snippet } from "svelte";
    import { Context, type GameContext, type GameFn, type GameParams } from "./types.js";

    // handles the game loop etc.

    type GameProps = {
        gameLoopFunctions?: Array<GameFn>,
        children: Snippet,
    }

    let {
        gameLoopFunctions = $bindable([]),
        children,
    }: GameProps = $props();

    let lastTime = performance.now();

    let animationFrameId: number | null = null;

    onMount(() => {
        update();
    });

    onDestroy(() => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    });

    const gameContext: GameContext = {
        addGameLoopFunction: (fn: GameFn) => {
            gameLoopFunctions.push(fn);
        },
        removeGameLoopFunction: function (fn: GameFn): void {
            const functionIndex = gameLoopFunctions.indexOf(fn);
            if (functionIndex >= 0) {
                gameLoopFunctions.splice(functionIndex, 1);
            }
        }
    };
    setContext(Context.Game, gameContext);

    function update() {
        const currentTime = performance.now();
        const deltaTime = 0.001 * (currentTime - lastTime);
        lastTime = currentTime;

        const gameParams: GameParams = {
            deltaTime
        };
        for (var loopFunction of gameLoopFunctions) {
            loopFunction(gameParams);
        }

        animationFrameId = requestAnimationFrame(() => update());
    }
</script>

{@render children()}