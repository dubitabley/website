<script lang="ts">
    import { getRandomInt } from "../util/random";


    type DataBlockProps = {
        lines: number,
    };

    let {
        lines = 10
    }: DataBlockProps = $props();

    function generateHexData(): string[] {
        const dataLines = [];

        const NUM_NUMS = 16;
        for (let i = 0; i < lines; i++) {
            let currentLine = "";
            for (let j = 0; j < NUM_NUMS; j++) {
                const byteNum = getRandomInt(0, 256);
                currentLine += hex2Char(byteNum);
                if (j != NUM_NUMS - 1) {
                    currentLine += " ";
                }
            }
            dataLines.push(currentLine);
        }

        return dataLines;
    }

    function hex2Char(num: number): string {
        const str = num.toString(16);
        return str.length < 2 ? `0${str}` : str;
    }

    const dataText = $state(generateHexData());
</script>

<div class="data-text">
    {#each dataText as dataLine}
        {dataLine}
        <br />
    {/each}
</div>

<style>
    .data-text {
        font-family: "Lucida Console", "Courier New", monospace;
        text-wrap: nowrap;
    }
</style>
