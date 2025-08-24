<script lang="ts">
    import { getContext, onDestroy, onMount, setContext, type Snippet } from "svelte";
    import { BALL_RADIUS, Context, type GameContext, type GameParams, type Vector2 } from "./types.js";

    type PhysicsProps = {
        gravity?: number,
        children: Snippet,
        position: Vector2,
        velocity?: Vector2,
    };

    const { 
        gravity = 10,
        children,
        position = $bindable(),
        velocity = $bindable({
            x: 0,
            y: 0,
        })
    }: PhysicsProps = $props();

    const TERMINAL_VELOCITY = 100;

    let grounded = $state(false);
    
    const gameContext: GameContext = getContext(Context.Game)
    onMount(() => {
        gameContext.addGameLoopFunction(update);
    });

    onDestroy(() => {
        gameContext.removeGameLoopFunction(update);
    });
    
    function update(gameParams: GameParams) {
        velocity.y = Math.max(velocity.y - gravity * gameParams.deltaTime, -TERMINAL_VELOCITY);
    
        position.x += velocity.x;
        position.y += velocity.y;

        if (position.y < BALL_RADIUS) {
            position.y = BALL_RADIUS;
            velocity.y = 0;
            grounded = true;
            velocity.x *= 0.98;
        } else {
            grounded = false;
        }
    }

    setContext(Context.Physics, {
        position,
        velocity,
    });
</script>

{@render children()}