/**
 * Linear interp between num1 and num2
 * @param num1
 * @param num2
 * @param amount
 * @returns
 */
export function lerp(num1: number, num2: number, amount: number): number {
    return num1 * (1.0 - amount) + num2 * amount;
}

// properties of this function
// needs to return min at amount = 0 and amount = 1
// needs to return max at amount = 0.5
// needs to be a parabolic curve
export function parabola(min: number, max: number, amount: number): number {
    return -(max - min) * amount ** 2 + (max - min) * amount + min;
}
