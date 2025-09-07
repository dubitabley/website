<script lang="ts">
    import { onMount, type Snippet } from "svelte";

    type SplodgeProps = {
        children: Snippet
    };
    
    let {
        children
    }: SplodgeProps = $props();

    let x1 = $state(0);
    let y1 = $state(0);
    let x2 = $state(0);
    let y2 = $state(0);
    
    let rotation = $state(0);
    
    const SPLODGE_SIZE = 150;
    const SPLODGE_WIDTH = 500;

    function animateSplodge() {
        const time = performance.now();
        
        x1 = Math.cos(time * 0.001) * SPLODGE_WIDTH / 2 + SPLODGE_WIDTH / 2;
        y1 = Math.sin(time * 0.001) * SPLODGE_WIDTH / 2 + SPLODGE_WIDTH / 2;

        x2 = Math.cos(time * 0.001 + Math.PI) * SPLODGE_WIDTH / 2 + SPLODGE_WIDTH / 2;
        y2 = Math.sin(time * 0.001 + Math.PI) * SPLODGE_WIDTH / 2 + SPLODGE_WIDTH / 2;

        rotation += 1;

        requestAnimationFrame(animateSplodge);
    }

    onMount(() => {
        animateSplodge();
    });

    const NUM_SPOKES = 8;
    const OFFSET_AMOUNT = 80;
    function createPath(): string {

        let pathString = "";
        let lastPos: [number, number] = [0, 0];

        for (let i = 0; i < NUM_SPOKES; i++) {
            if (i == 0) {
                // move to 
                const pathChar = "M";
                const pathStartPos = getPos(i);

                pathString += `${pathChar} ${pathStartPos[0]},${pathStartPos[1]} `;

                lastPos = pathStartPos;
            } else {
                // cubic
                const pathChar = "C";

                const pathPos = getPos(i);

                const lastControlPos = getControl(lastPos, pathPos);
                const nextControlPos = getControl(pathPos, lastPos);

                // this is wrong but it looks cool so rolling with it
                // pathString += `${pathChar} ${nextPos[0]},${nextPos[1]} ${lastPos[0]},${lastPos[1]} ${pathPos[0]},${pathPos[1]} `;
                pathString += `${pathChar} ${lastControlPos[0]},${lastControlPos[1]} ${nextControlPos[0]},${nextControlPos[1]} ${pathPos[0]},${pathPos[1]} `;
                lastPos = pathPos;
            }
        }

        pathString += "Z";

        return pathString;
    }

    function getControl(pos1: [number, number], pos2: [number, number]): [number, number] {
        const dist: [number, number] = [pos2[0] - pos1[0], pos2[1] - pos1[1]];
        const normalizedDist = normalize(dist);
        const normal = [-normalizedDist[1], normalizedDist[0]];
        return [pos1[0] + normal[0] * 200, pos1[1] + normal[1] * 200];
    }

    function normalize(pos: [number, number]): [number, number] {
        const length = Math.abs(pos[0]) + Math.abs(pos[1]);
        return [pos[0] / length, pos[1] / length];
    }

    function getPos(i: number): [number, number] {
        const x = (SPLODGE_WIDTH - OFFSET_AMOUNT / 2) * 
            (1/2 + Math.cos(2 * Math.PI * i / NUM_SPOKES) / 2) 
            + OFFSET_AMOUNT * (Math.random() - 0.5);
        const y = (SPLODGE_WIDTH - OFFSET_AMOUNT / 2) * 
            (1/2 + Math.sin(2 * Math.PI * i / NUM_SPOKES) / 2) + 
            OFFSET_AMOUNT * (Math.random() - 0.5);
        return [x, y];
    }

</script>

<style>

    svg {
        flex-grow: 1;
        width: 100%;
        height: 100%;
    }

    .splodge-wrapper {
        width: 100%;
        height: 100%;
    }

    #splodge-color-1 {
        stop-color: hsl(33, 82%, var(--secondary-lightness));
    }

    #splodge-color-2 {
        stop-color: hsl(197, 82%, var(--secondary-lightness));
    }

    #splodge-path {
        fill: url(#splodge-gradient);
    }

</style>

<div class="splodge-wrapper">
    <svg
        width="{SPLODGE_WIDTH}mm"
        height="{SPLODGE_WIDTH}mm"
        viewBox="0 0 {SPLODGE_WIDTH} {SPLODGE_WIDTH}">
        <defs>
            <linearGradient
                gradientUnits="userSpaceOnUse"
                id="splodge-gradient"
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
            >
                <stop id="splodge-color-1" offset=0 />
                <stop id="splodge-color-2" offset=1 />
            </linearGradient>
        </defs>
        <g>
            <path
                style:transform="rotate({rotation}deg)"
                style:transform-origin=center
                d={createPath()}
                id="splodge-path" 
                />
        </g>
    </svg>
</div>

{@render children()}