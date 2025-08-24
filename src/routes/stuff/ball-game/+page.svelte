<script lang="ts">
    import Ball from "$lib/dubi-canvas/ball.svelte";
    import DubiCanvas from "$lib/dubi-canvas/dubi-canvas.svelte";
    import Game from "$lib/dubi-canvas/game.svelte";
    import Line from "$lib/dubi-canvas/line.svelte";
    import Physics from "$lib/dubi-canvas/physics.svelte";
    import HudText from "$lib/dubi-canvas/hud-text.svelte";
    import { BALL_RADIUS, CANVAS_HEIGHT, CANVAS_WIDTH, type ClickEvent, type GameParams } from "$lib/dubi-canvas/types.js";
    
    const startHeight = 300; 

    let ballPosition = $state({
        x: 50,
        y: startHeight,
    });
    let ballHeight = $derived(ballPosition.y.toFixed(0));
    let ballVelocity = $state({
        x: 0,
        y: 0
    });

    let canvasOffset = $state({
        x: 0,
        y: 500,
    });

    function onClick(clickEvent: ClickEvent) {
        /* console.log(`click: x: ${clickEvent.position.x}, y: ${clickEvent.position.y}`);
        const ballPos = $state.snapshot(ballPosition);
        console.log(`ball pos: x: ${ballPos.x}, y: ${ballPos.y}`);
        const ballVel = $state.snapshot(ballVelocity);
        console.log(`ball vel: x: ${ballVel.x}, y: ${ballVel.y}`); */
        if (Math.hypot(clickEvent.position.y - ballPosition.y, clickEvent.position.x - ballPosition.x) < BALL_RADIUS) {
            
            let xDistance = clickEvent.position.x - ballPosition.x;
            let yDistance = clickEvent.position.y - ballPosition.y;

            ballVelocity.x -= xDistance * 0.5;
            ballVelocity.y -= yDistance;

            
            //ballVelocity.y += 10;
        }
    }

    const SPACE = 200;
    let canvasVelocity = $state({
        x: 0,
        y: 0,
    });

    function canvasFollowBall(params: GameParams) {

        /* const ballPos = $state.snapshot(ballPosition);
        console.log(`ball pos: x: ${ballPos.x}, y: ${ballPos.y}`);
        const canvasOff = $state.snapshot(canvasOffset);
        console.log(`canvas offset: x: ${canvasOff.x}, y: ${canvasOff.y}`); */

        // if ball position less than canvas offset
        if (canvasOffset.x < -ballPosition.x + SPACE) {
            // left
            canvasVelocity.x += 0.003 * (-ballPosition.x + SPACE - canvasOffset.x);
        } else if (canvasOffset.x > -ballPosition.x + CANVAS_WIDTH - SPACE) {
            // right
            canvasVelocity.x -= 0.003 * (canvasOffset.x - (-ballPosition.x + CANVAS_WIDTH - SPACE));
        } else {
            canvasVelocity.x *= 0.8;
        }

        if (ballPosition.y + SPACE > canvasOffset.y) {
            // top
            canvasVelocity.y += 0.003 * (ballPosition.y + SPACE - canvasOffset.y);
        } else if (canvasOffset.y > ballPosition.y + CANVAS_HEIGHT - SPACE) {
            // bottom
            canvasVelocity.y -= 0.003 * (canvasOffset.y - (-ballPosition.y + CANVAS_HEIGHT - SPACE));
        } else {
            canvasVelocity.y *= 0.8;
        }

        canvasOffset.x += canvasVelocity.x;
        canvasOffset.y += canvasVelocity.y;
    }

</script>

<DubiCanvas onClick={onClick} offset={canvasOffset}>
    <Game gameLoopFunctions={[canvasFollowBall]}>
        <HudText x={10} y={10} text={`Height: ${ballHeight}`} />
        <Physics bind:position={ballPosition} bind:velocity={ballVelocity}>
            <Ball position={ballPosition} radius={BALL_RADIUS} />
        </Physics>
        <Line start={{x: -1000, y: 0}} end={{x: 3000, y: 0}} width={10} /> 
    </Game>
</DubiCanvas>