export const SpecialOperator = {
    SquareRoot: 0,
    Root: 1,
} as const;
export type SpecialOperator =
    (typeof SpecialOperator)[keyof typeof SpecialOperator];

const specialOperatorMap: Map<string, SpecialOperator> = new Map();
specialOperatorMap.set("sqrt", SpecialOperator.SquareRoot);
specialOperatorMap.set("root", SpecialOperator.Root);

export function getSpecialOperator(value: string): SpecialOperator | null {
    if (specialOperatorMap.has(value)) {
        return specialOperatorMap.get(value)!;
    }
    return null;
}
