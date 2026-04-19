<script lang="ts">
    import CodeDemonstration from "$lib/components/code-demonstration.svelte";
    import MathToken from "../equation/mathml/math-token.svelte";
    import { parseEquation, type Token } from "../equation/simple-maths";

    type FunctionValue = (n: number) => number;
    type FunctionDisplayToken = (n: number) => Token[];

    type Props = {
        funcValue: FunctionValue;
        funcDisplay: FunctionDisplayToken;
        skipAhead?: boolean;
    };

    let { funcValue, funcDisplay, skipAhead = true }: Props = $props();

    // elements
    let formulaWrapper: HTMLElement;
    let formulaElement: HTMLElement;
    let childElements: HTMLElement[] = $state([]);

    // change if we need something other than addition
    const addTokens = parseEquation("+");

    let equationDisplayTokens: Token[][] = $state([]);
    let outputNum = $state(0);
    let currentIndex: number | null = $state(null);
    let leftOffset = $state(0);

    // start at 1 - could configure to start at 0
    let displayN = $state(1);
    let valueN = $state(1);
    let running = $state(false);

    function isFormulaOnRight() {
        const boundingRect = formulaElement.getBoundingClientRect();
        const wrapperRect = formulaWrapper.getBoundingClientRect();

        return wrapperRect.right < boundingRect.right;
    }

    function isFormulaOnMiddle(index: number) {
        if (index >= childElements.length) {
            return;
        }
        const child = childElements[index];
        const wrapperRect = formulaWrapper.getBoundingClientRect();
        const childRect = child.getBoundingClientRect();
        const wrapperMiddle = wrapperRect.left + wrapperRect.width / 2;

        return childRect.left < wrapperMiddle;
    }

    // adds a new token to the end of the formula
    function addNewToken() {
        if (isFormulaOnRight()) {
            return;
        }

        let tokens = funcDisplay(displayN);
        if (equationDisplayTokens.length > 0) {
            equationDisplayTokens.push(addTokens);
        }
        equationDisplayTokens.push(tokens);
        displayN += 1;
    }

    function selectNextToken() {
        const checkIndex = currentIndex !== null ? currentIndex : 0;
        if (!isFormulaOnMiddle(checkIndex)) {
            return;
        }

        // map to every second list of tokens
        // 1 -> 0, 2 -> 2, 3 -> 4
        currentIndex = currentIndex !== null ? currentIndex + 2 : 0;
        const newValue = funcValue(valueN);
        outputNum += newValue;
        valueN += 1;
    }

    function removeLeftToken() {
        if (childElements.length === 0) {
            return;
        }
        if (currentIndex === null) {
            return;
        }
        const leftToken = childElements[0];
        const leftRect = leftToken.getBoundingClientRect();
        const wrapperRect = formulaWrapper.getBoundingClientRect();

        if (leftRect.right < wrapperRect.left) {
            equationDisplayTokens.splice(0, 1);
            leftOffset += leftRect.width;
            currentIndex -= 1;
        }
    }

    function update() {
        leftOffset -= 3;
        // only run every second for perf reasons
        addNewToken();
        selectNextToken();
        removeLeftToken();
        if (running) {
            setTimeout(update, 50);
        }
    }

    function toggleRunning() {
        running = !running;
        if (running) {
            update();
        }
    }

    function skipAheadFunc() {
        leftOffset = 0;
        let newVal;
        for (newVal = valueN; newVal < valueN + 100; newVal++) {
            outputNum += funcValue(newVal);
        }
        valueN = newVal;
        displayN = newVal;
        currentIndex = null;
        equationDisplayTokens = [];
        childElements = [];
    }

    function reset() {
        leftOffset = 0;
        valueN = 1;
        displayN = 1;
        outputNum = 0;
        currentIndex = null;
        equationDisplayTokens = [];
        childElements = [];
    }
</script>

<div>
    <CodeDemonstration codeText="Function" outputText="Value">
        {#snippet code()}
            <div class="scrolling-wrapper" bind:this={formulaWrapper}>
                <div
                    class="scrolling-formula"
                    style="--offset: {leftOffset}px"
                    bind:this={formulaElement}
                >
                    <math class="maths">
                        {#each equationDisplayTokens as displayTokens, i}
                            <span
                                class={{ currentDisplay: currentIndex === i }}
                                bind:this={childElements[i]}
                            >
                                {#each displayTokens as token}
                                    <MathToken {token} />
                                {/each}
                            </span>
                        {/each}
                    </math>
                </div>
            </div>
        {/snippet}
        {#snippet output()}
            <p>{outputNum.toFixed(6)}</p>
        {/snippet}
    </CodeDemonstration>
    <!-- controls -->
    <div class="controls-wrapper">
        <div class="controls">
            <button class="control" onclick={toggleRunning}>
                {running ? "Pause" : "Start"}
            </button>
            <button class="control" onclick={reset}>Reset</button>
            {#if skipAhead}
                <button class="control" onclick={skipAheadFunc}>Skip</button>
            {/if}
        </div>
    </div>
</div>

<style>
    .controls-wrapper {
        display: flex;
        justify-content: center;
    }
    .controls {
        display: flex;
        width: 60%;
        gap: 20px;

        .control {
            flex-grow: 1;
            height: 2.5em;
            font-weight: bold;
            background-color: inherit;
            border: 3px solid var(--primary-color);
            border-radius: 5px;
            transition: all 0.2s;
            text-align: center;

            &:hover {
                background-color: var(--primary-color);
                color: var(--background-color);
            }
        }
    }

    .currentDisplay {
        color: hsl(20, 100%, var(--secondary-lightness));
        font-weight: bold;
    }

    .scrolling-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        width: 100%;
    }

    .scrolling-formula {
        display: block;
        position: relative;
        left: 100%;
        white-space: nowrap;
        translate: var(--offset, 0);
    }

    .maths {
        font-family: math;
    }
</style>
