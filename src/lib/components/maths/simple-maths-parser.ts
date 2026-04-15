export const RawMathsTokenType = {
    Identifier: 0,
    Operator: 1,
    OpenBracket: 2,
    CloseBracket: 3,
    Exponent: 4,
    Divide: 5,
} as const;
export type RawMathsTokenType =
    (typeof RawMathsTokenType)[keyof typeof RawMathsTokenType];

type RawMathsIdentifier = {
    type: typeof RawMathsTokenType.Identifier;
    identifier: string;
};

function newIdentifier(identifier: string): RawMathsIdentifier {
    return {
        type: RawMathsTokenType.Identifier,
        identifier,
    };
}

export type RawMathsOperator = {
    type: typeof RawMathsTokenType.Operator;
    operator: "+" | "-" | "×";
};

function newOperator(operator: "+" | "-" | "×"): RawMathsOperator {
    return {
        type: RawMathsTokenType.Operator,
        operator,
    };
}

type BasicMathsToken = {
    type:
        | typeof RawMathsTokenType.Exponent
        | typeof RawMathsTokenType.Divide
        | typeof RawMathsTokenType.OpenBracket
        | typeof RawMathsTokenType.CloseBracket;
};

export type RawMathsToken =
    | RawMathsIdentifier
    | RawMathsOperator
    | BasicMathsToken;

export function parseToTokens(equationString: string): RawMathsToken[] {
    const rawTokens: RawMathsToken[] = [];

    let currentNumber: string | null = null;
    let finishCurrentValue = () => {
        if (currentNumber != null) {
            rawTokens.push(newIdentifier(currentNumber));
            currentNumber = null;
        }
    };
    for (let index = 0; index < equationString.length; index++) {
        const currentValue = equationString[index];

        const numberRegex = /[0-9]/g;
        const whitespaceRegex = /\s/g;
        if (numberRegex.test(currentValue)) {
            // append it
            if (currentNumber != null) {
                currentNumber += currentValue;
            } else {
                currentNumber = currentValue;
            }
        } else if (whitespaceRegex.test(currentValue)) {
            finishCurrentValue();
        } else if (
            currentValue === "+" ||
            currentValue === "-" ||
            currentValue === "*"
        ) {
            finishCurrentValue();
            if (currentValue === "*") {
                // convert * to multiplication symbol
                rawTokens.push(newOperator("×"));
            } else {
                rawTokens.push(newOperator(currentValue));
            }
        } else if (currentValue === "^") {
            finishCurrentValue();
            rawTokens.push({ type: RawMathsTokenType.Exponent });
        } else if (currentValue === "/") {
            finishCurrentValue();
            rawTokens.push({ type: RawMathsTokenType.Divide });
        } else if (currentValue === "(") {
            finishCurrentValue();
            rawTokens.push({ type: RawMathsTokenType.OpenBracket });
        } else if (currentValue === ")") {
            finishCurrentValue();
            rawTokens.push({ type: RawMathsTokenType.CloseBracket });
        } else {
            finishCurrentValue();
            rawTokens.push(newIdentifier(currentValue));
        }
    }
    finishCurrentValue();

    return rawTokens;
}
