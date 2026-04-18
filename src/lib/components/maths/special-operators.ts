export const SpecialOperator = {
    SquareRoot: 0,
    Root: 1,
    Integral: 2,
    DefiniteIntegral: 3,
} as const;
export type SpecialOperator =
    (typeof SpecialOperator)[keyof typeof SpecialOperator];

const specialOperatorMap: Map<string, SpecialOperator> = new Map();
specialOperatorMap.set("sqrt", SpecialOperator.SquareRoot);
specialOperatorMap.set("root", SpecialOperator.Root);
specialOperatorMap.set("integral", SpecialOperator.Integral);
specialOperatorMap.set("defintegral", SpecialOperator.DefiniteIntegral);

export function getSpecialOperator(value: string): SpecialOperator | null {
    if (specialOperatorMap.has(value)) {
        return specialOperatorMap.get(value)!;
    }
    return null;
}
