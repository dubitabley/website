import { createContext } from "svelte";
import { SvelteSet } from "svelte/reactivity";

export type UpdateComponentFunction = (amountThrough: number) => void;

export interface SvgAnim {
    order(): number;
    updateFunc: UpdateComponentFunction;
}

export class SvgAnimContext {
    /**
     * Functions for components to update
     */
    #anims: SvelteSet<SvgAnim>;

    /** Derived array */
    #animsOrder: Map<number, SvgAnim[]>;

    /** What index we're currently on */
    #index: number;

    /** How far through the current index we are, between 0 and 1 */
    #amountThrough: number;

    /** Whether the animation is playing */
    #playing: boolean;

    /** Whether the animation has finished */
    #finished: boolean;

    constructor() {
        this.#anims = new SvelteSet();
        this.#animsOrder = $derived(Map.groupBy(this.#anims, (x) => x.order()));

        // these need to be reactive since they're used on the UI
        this.#index = $state(0);
        this.#amountThrough = $state(0);
        this.#playing = $state(false);
        this.#finished = $state(false);
    }

    addAnim(svgAnim: SvgAnim) {
        this.#anims.add(svgAnim);
        // recalculate if finished
        if (this.#finished && this.#index <= this.getMaxOrder()) {
            this.#finished = false;
        }
    }

    removeAnim(svgAnim: SvgAnim) {
        this.#anims.delete(svgAnim);
    }

    getMaxOrder(): number {
        return this.#animsOrder.size - 1;
    }

    #update() {
        if (!this.#playing && !this.#finished) {
            return;
        }

        this.#amountThrough += 0.02;
        if (this.#amountThrough >= 1 || this.#index >= this.#animsOrder.size) {
            if (this.#index < this.#animsOrder.size) {
                const anims = this.#animsOrder.get(this.#index);
                if (anims) {
                    for (const anim of anims) {
                        anim.updateFunc(1);
                    }
                }
                this.#index += 1;
                this.#amountThrough = 0;
            }
            if (this.#index > this.getMaxOrder()) {
                this.#finished = true;
                this.#playing = false;
                return;
            }
        } else {
            const anims = this.#animsOrder.get(this.#index);
            if (anims) {
                for (const anim of anims) {
                    anim.updateFunc(this.#amountThrough);
                }
            }
        }

        requestAnimationFrame(this.#update.bind(this));
    }

    reset() {
        this.totalAmountThrough = 0;
        this.togglePlay();
    }

    set totalAmountThrough(value: number) {
        this.#index = Math.floor(value);
        this.#amountThrough = value - this.#index;

        // set all
        for (let i = 0; i < this.#animsOrder.size; i++) {
            const anims = this.#animsOrder.get(i);
            if (anims) {
                for (let j = 0; j < anims.length; j++) {
                    let value: number;
                    if (i < this.#index) {
                        value = 1;
                    } else if (i === this.#index) {
                        value = this.#amountThrough;
                    } else {
                        value = 0;
                    }
                    anims[j].updateFunc(value);
                }
            }
        }

        if (
            this.#index >= this.#animsOrder.size ||
            (this.#index === this.#animsOrder.size - 1 &&
                this.#amountThrough === 1)
        ) {
            this.#finished = true;
        } else {
            this.#finished = false;
        }

        this.#playing = false;
    }

    get totalAmountThrough(): number {
        return this.#index + this.#amountThrough;
    }

    togglePlay() {
        this.#playing = !this.#playing;
        if (this.#playing) {
            this.#update();
        }
    }

    isPlaying() {
        return this.#playing;
    }

    isFinished() {
        return this.#finished;
    }
}

export const [getSvgAnimContext, setSvgAnimContext] =
    createContext<SvgAnimContext>();
