/**
 * Gets a random int between min(inclusive) and max(exclusive)
 */
export function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Gets a random number between min and max
 */
export function getRandomNum(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

export function getRandomValueInArray<T>(array: T[]): T {
    const index = getRandomInt(0, array.length);
    return array[index];
}

export function getRandomCharInString(string: string): string {
    const index = getRandomInt(0, string.length);
    return string[index];
}
