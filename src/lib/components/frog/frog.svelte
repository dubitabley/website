<script lang="ts">
    import FrogImage from "$lib/assets/frog/frog.webp";
    import { onMount } from "svelte";
    import { angleInterp } from "./angle";
    import { lerp, parabola } from "./utils";

    /** The discriminant for the enum for the mode the frog is currently in */
    const FrogMode = {
        Idle: 0,
        Turn: 1,
        Jump: 2,
    } as const;
    type FrogMode = (typeof FrogMode)[keyof typeof FrogMode];

    type FrogModeInfo = IdleFrogMode | TurnFrogMode | JumpFrogMode;

    /**
     * Frog is idle
     */
    type IdleFrogMode = {
        frogMode: typeof FrogMode.Idle;
    };

    /**
     * Currently turning with small hops
     */
    type TurnFrogMode = {
        frogMode: typeof FrogMode.Turn;

        targetAngle: number;
        targetX: number;
        targetY: number;
    };

    /**
     * Currently mid jump
     */
    type JumpFrogMode = {
        frogMode: typeof FrogMode.Jump;

        targetX: number;
        targetY: number;

        jumpInfo: JumpInfo;
    };

    type JumpInfo = JumpingState | WaitingState;

    const JumpStateType = {
        Jumping: 0,
        Waiting: 1,
    } as const;
    type JumpStateType = (typeof JumpStateType)[keyof typeof JumpStateType];

    type JumpingState = {
        jumpState: typeof JumpStateType.Jumping;
        // how far through the jump we are
        currentJumpDistance: number;
        // how far the jump is planned to go
        plannedJumpDistance: number;
        startX: number;
        startY: number;
    };

    type WaitingState = {
        jumpState: typeof JumpStateType.Waiting;
        timeToWait: number;
        currentWaitTime: number;
    };

    function generateJump(
        maxDistance: number,
        startX: number,
        startY: number,
    ): JumpInfo {
        let distance = Math.random() * 80 + 60;
        distance = Math.min(distance, maxDistance);
        return {
            jumpState: JumpStateType.Jumping,
            currentJumpDistance: 0,
            plannedJumpDistance: distance,
            startX,
            startY,
        };
    }

    // current position of the frog, x and y are the centre points
    let x = $state(100);
    let y = $state(100);
    let size = $state(100);
    // current direction of the frog, in radians
    let direction = $state(0);

    let currentFrogMode: FrogModeInfo = $state({
        frogMode: FrogMode.Idle,
    });

    onMount(() => {
        document.documentElement.addEventListener("mousedown", (e) => {
            const targetX = e.clientX;
            const targetY = e.clientY;
            const xDiff = targetX - x;
            const yDiff = targetY - y;
            const targetAngle = xDiff == 0 ? 0 : Math.atan2(yDiff, xDiff);
            currentFrogMode = {
                // turn towards target
                frogMode: FrogMode.Turn,
                targetX,
                targetY,
                targetAngle,
            };
        });

        update();
    });

    function update() {
        switch (currentFrogMode.frogMode) {
            case FrogMode.Idle:
                // do nothing when idling
                break;
            case FrogMode.Turn:
                // turn towards target
                const [newDirection, finishedTurning] = angleInterp(
                    direction,
                    currentFrogMode.targetAngle,
                );
                direction = newDirection;

                if (finishedTurning) {
                    const distance = Math.hypot(
                        currentFrogMode.targetY - y,
                        currentFrogMode.targetX - x,
                    );
                    const jumpInfo = generateJump(distance, x, y);
                    currentFrogMode = {
                        frogMode: FrogMode.Jump,
                        targetX: currentFrogMode.targetX,
                        targetY: currentFrogMode.targetY,
                        jumpInfo,
                    };
                }
                break;
            case FrogMode.Jump:
                // jump towards target
                const jumpInfo = currentFrogMode.jumpInfo;
                if (jumpInfo.jumpState == JumpStateType.Jumping) {
                    jumpInfo.currentJumpDistance += 2;
                    let finishedJump = false;
                    if (
                        jumpInfo.currentJumpDistance >=
                        jumpInfo.plannedJumpDistance
                    ) {
                        jumpInfo.currentJumpDistance =
                            jumpInfo.plannedJumpDistance;
                        finishedJump = true;
                    }
                    // update position
                    const fraction =
                        jumpInfo.currentJumpDistance /
                        jumpInfo.plannedJumpDistance;
                    const endJumpX =
                        jumpInfo.startX +
                        Math.cos(direction) * jumpInfo.plannedJumpDistance;
                    const endJumpY =
                        jumpInfo.startY +
                        Math.sin(direction) * jumpInfo.plannedJumpDistance;
                    x = lerp(jumpInfo.startX, endJumpX, fraction);
                    y = lerp(jumpInfo.startY, endJumpY, fraction);
                    size = parabola(100, 180, fraction);
                    if (finishedJump) {
                        const distance = Math.hypot(
                            currentFrogMode.targetY - y,
                            currentFrogMode.targetX - x,
                        );
                        if (distance < 0.01) {
                            currentFrogMode = {
                                frogMode: FrogMode.Idle,
                            };
                        } else {
                            currentFrogMode.jumpInfo = {
                                jumpState: JumpStateType.Waiting,
                                currentWaitTime: 0,
                                timeToWait: Math.random() * 20 + 5,
                            };
                        }
                    }
                } else if (jumpInfo.jumpState == JumpStateType.Waiting) {
                    jumpInfo.currentWaitTime += 1;

                    if (jumpInfo.currentWaitTime >= jumpInfo.timeToWait) {
                        const distance = Math.hypot(
                            currentFrogMode.targetY - y,
                            currentFrogMode.targetX - x,
                        );
                        const newJumpInfo = generateJump(distance, x, y);
                        currentFrogMode.jumpInfo = newJumpInfo;
                    }
                }

                break;
        }

        requestAnimationFrame(update);
    }
</script>

<div
    class="frog"
    style:left="{x - size / 2}px"
    style:top="{y - size / 2}px"
    style:rotate="{direction - Math.PI / 2}rad"
>
    <img width="{size}px" height="{size}px" src={FrogImage} alt="Frog" />
</div>

<style>
    .frog {
        position: absolute;
        z-index: 100;
    }
</style>
