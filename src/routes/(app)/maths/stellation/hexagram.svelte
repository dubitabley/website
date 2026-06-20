<script lang="ts">
    import RadioGroup from "$lib/components/misc/radio-group.svelte";
    import { generatePolygonPath } from "$lib/components/svg/utils";

    const TOTAL_SIZE = 100;
    const RADIUS = 50;

    const path1 = generatePolygonPath(RADIUS, 3, Math.PI / 2);
    const path2 = generatePolygonPath(RADIUS, 3, (3 * Math.PI) / 2);

    const Mode = {
        Default: "default",
        ColouredPaths: "colour",
        EnablePath1: "path1",
        EnablePath2: "path2",
    } as const;
    type Mode = (typeof Mode)[keyof typeof Mode];

    let currentMode: Mode = $state(Mode.Default);

    function modeLabel(mode: Mode): string {
        switch (mode) {
            case Mode.Default:
                return "Default:";
            case Mode.ColouredPaths:
                return "Highlight Triangles";
            case Mode.EnablePath1:
                return "Show Triangle 1 only";
            case Mode.EnablePath2:
                return "Show Triangle 2 only";
            default:
                throw new Error("Invalid mode");
        }
    }
</script>

<div>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 {TOTAL_SIZE} {TOTAL_SIZE}"
        class="svg"
    >
        {#if currentMode !== Mode.EnablePath2}
            <path
                d={path1}
                fill="none"
                class={[
                    currentMode === Mode.ColouredPaths
                        ? "red shadow-triangle"
                        : "",
                ]}
            />
        {/if}
        {#if currentMode !== Mode.EnablePath1}
            <path
                d={path2}
                fill="none"
                class={[
                    currentMode === Mode.ColouredPaths
                        ? "blue shadow-triangle"
                        : "",
                ]}
            />
        {/if}
    </svg>
    <div>
        <RadioGroup
            options={[
                Mode.Default,
                Mode.ColouredPaths,
                Mode.EnablePath1,
                Mode.EnablePath2,
            ]}
            labelFunc={modeLabel}
            bind:value={currentMode}
        />
    </div>
</div>

<style>
    .svg {
        background-color: light-dark(white, black);
        stroke-width: 3px;
        stroke: light-dark(black, white);
        width: 50%;
        height: 50%;

        @media (width < 600px) {
            width: 100%;
            height: 100%;
        }
    }

    .red {
        stroke: red;
        --shadow-colour: rgb(255, 0, 0, 0.4);
    }

    .blue {
        stroke: blue;
        --shadow-colour: rgb(0, 0, 255, 0.4);
    }

    .shadow-triangle {
        filter: drop-shadow(0px 0px 4px var(--shadow-colour));
    }
</style>
