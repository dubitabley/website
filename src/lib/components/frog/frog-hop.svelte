<!-- For doing a click/tap that hops the frog around -->

<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { angleInterp } from "./util/angle";
    import { lerp, parabola } from "./util/numbers";
    import { getFrogContext, type FrogInfo } from "./frog-types";

    type FrogHopProps = {
        onHopEnd?: (frogInfo: FrogInfo) => void,
    }

    const FROG_SPEED: number = 4;

    const frog = getFrogContext();

    let {
        onHopEnd,
    }: FrogHopProps = $props();

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

    let currentFrogMode: FrogModeInfo = $state({
        frogMode: FrogMode.Idle,
    });

    function onMouseDown(e: MouseEvent) {
        const targetX = e.pageX;
        const targetY = e.pageY;
        const xDiff = targetX - frog.x;
        const yDiff = targetY - frog.y;
        const targetAngle = Math.atan2(yDiff, xDiff);
        currentFrogMode = {
            // turn towards target
            frogMode: FrogMode.Turn,
            targetX,
            targetY,
            targetAngle,
        };
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
        };
    });

    function update() {
        switch (currentFrogMode.frogMode) {
            case FrogMode.Idle:
                // do nothing when idling
                break;
            case FrogMode.Turn:
                // turn towards target
                const [newDirection, finishedTurning] = angleInterp(
                    frog.direction,
                    currentFrogMode.targetAngle,
                );
                frog.direction = newDirection;

                if (finishedTurning) {
                    const distance = Math.hypot(
                        currentFrogMode.targetY - frog.y,
                        currentFrogMode.targetX - frog.x,
                    );
                    const jumpInfo = generateJump(distance, frog.x, frog.y);
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
                    jumpInfo.currentJumpDistance += FROG_SPEED;
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
                    const fraction = jumpInfo.plannedJumpDistance == 0 ? 0 :
                        jumpInfo.currentJumpDistance /
                        jumpInfo.plannedJumpDistance;
                    const endJumpX =
                        jumpInfo.startX +
                        Math.cos(frog.direction) * jumpInfo.plannedJumpDistance;
                    const endJumpY =
                        jumpInfo.startY +
                        Math.sin(frog.direction) * jumpInfo.plannedJumpDistance;
                    frog.x = lerp(jumpInfo.startX, endJumpX, fraction);
                    frog.y = lerp(jumpInfo.startY, endJumpY, fraction);
                    frog.size = parabola(100, 180, fraction);
                    if (finishedJump) {
                        const distance = Math.hypot(
                            currentFrogMode.targetY - frog.y,
                            currentFrogMode.targetX - frog.x,
                        );
                        if (distance < 0.01) {
                            currentFrogMode = {
                                frogMode: FrogMode.Idle,
                            };

                            const frogInfo = {
                                x: frog.x,
                                y: frog.y,
                                size: frog.size,
                                direction: frog.direction,
                            }
                            onHopEnd?.(frogInfo);
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
                            currentFrogMode.targetY - frog.y,
                            currentFrogMode.targetX - frog.x,
                        );
                        const newJumpInfo = generateJump(distance, frog.x, frog.y);
                        currentFrogMode.jumpInfo = newJumpInfo;
                    }
                }

                break;
        }

        animationFrame = requestAnimationFrame(update);
    }
</script>
