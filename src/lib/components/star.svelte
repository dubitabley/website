<script lang="ts">
    const STAR_SIZE: number = 100;
    const CENTRE = STAR_SIZE / 2;
    const NUM_POINTS = 5;
    const INNER_SIZE = 25;
    const OUTER_SIZE = 45;

    type StarProps = {
        enabled: boolean
    };

    const {
        enabled
    }: StarProps = $props();

    type Coord = [number, number];

    function generateCoords(): Coord[] {
        let coords: Coord[] = [];

        for (let i = 0; i < NUM_POINTS * 2; i++) {
            const size = i % 2 == 0 ? INNER_SIZE : OUTER_SIZE;
            const x = size * Math.cos(2 * Math.PI * i / (NUM_POINTS * 2)) + CENTRE;
            const y = size * Math.sin(2 * Math.PI * i / (NUM_POINTS * 2)) + CENTRE;
            coords[i] = [x, y];
        }

        return coords;
    }

    function coordString(coord: Coord): string {
        return `${coord[0]},${coord[1]}`;
    }

    function getStarPath(coords: Coord[]) {
        let pathString = `M `;

        for (const coord of coords) {
            pathString += `${coordString(coord)} `;
        }

        pathString += "Z";

        return pathString;
    }
</script>

<style>
    .star-wrapper {
        display: inline;
        padding: 2px;
    }
    .star-svg {
        width: 20px;
        height: 20px;
    }

    .star {
        stroke: var(--primary-color-2);
        stroke-width: 10px;
    }

    .filled-star {
        fill: hsl(59, 40%, 52%);
    }

    .empty-star {
        fill: transparent;
    }
</style>

<div class="star-wrapper">
    <svg
        class="star-svg"
        width="{STAR_SIZE}mm"
        height="{STAR_SIZE}mm"
        viewBox="0 0 {STAR_SIZE} {STAR_SIZE}">

        <g>
            <path 
                fill-rule="nonzero"
                class={["star", enabled ? "filled-star" : "empty-star"]}
                d={getStarPath(generateCoords())}  
            />
        </g>
    </svg>
</div>