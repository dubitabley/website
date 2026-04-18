import { getSpecialValue } from "./special-identifiers";
import { getSpecialOperator, SpecialOperator } from "./special-operators";

export const RawMathsTokenType = {
    Identifier: 0,
    Operator: 1,
    OpenBracket: 2,
    CloseBracket: 3,
    Exponent: 4,
    Divide: 5,
    SquareRoot: 6,
    Root: 7,
    SubSuperElement: 8,
} as const;
export type RawMathsTokenType =
    (typeof RawMathsTokenType)[keyof typeof RawMathsTokenType];

export type RawMathsIdentifier = {
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
    operator: "+" | "-" | "×" | "∫";
};

function newOperator(operator: "+" | "-" | "×" | "∫"): RawMathsOperator {
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
        | typeof RawMathsTokenType.CloseBracket
        | typeof RawMathsTokenType.SquareRoot
        | typeof RawMathsTokenType.Root;
};

type SubSuperIdentifier = {
    type: typeof RawMathsTokenType.SubSuperElement;
    identifier: string;
};

export type RawMathsToken =
    | RawMathsIdentifier
    | RawMathsOperator
    | BasicMathsToken
    | SubSuperIdentifier;

const PartialTokenType = {
    None: 0,
    Number: 1,
    SpecialIdentifier: 2,
    SpecialOperator: 3,
} as const;

type PartialNone = {
    type: typeof PartialTokenType.None;
};
type PartialNumber = {
    type: typeof PartialTokenType.Number;
    currentNumber: string;
};

type SpecialPartialIdentifier = {
    type: typeof PartialTokenType.SpecialIdentifier;
    currentValue: string;
};

type SpecialPartialOperator = {
    type: typeof PartialTokenType.SpecialOperator;
    currentValue: string;
};
type PartialToken =
    | PartialNone
    | PartialNumber
    | SpecialPartialIdentifier
    | SpecialPartialOperator;

export function parseToTokens(equationString: string): RawMathsToken[] {
    const rawTokens: RawMathsToken[] = [];

    let currentPartial: PartialToken = {
        type: PartialTokenType.None,
    };
    let finishCurrentValue = () => {
        if (currentPartial.type == PartialTokenType.Number) {
            rawTokens.push(newIdentifier(currentPartial.currentNumber));
            currentPartial = {
                type: PartialTokenType.None,
            };
        }
        if (currentPartial.type === PartialTokenType.SpecialIdentifier) {
            throw new Error("invalid special identifier - interrupted");
        }
        if (currentPartial.type === PartialTokenType.SpecialOperator) {
            throw new Error("invalid special operator - interrupted");
        }
    };
    for (let index = 0; index < equationString.length; index++) {
        const currentValue = equationString[index];

        const numberRegex = /[0-9]/g;
        const whitespaceRegex = /\s/g;
        if (numberRegex.test(currentValue)) {
            // if number, append it to current value or create new current value
            if (currentPartial.type === PartialTokenType.Number) {
                currentPartial.currentNumber += currentValue;
            } else {
                currentPartial = {
                    type: PartialTokenType.Number,
                    currentNumber: currentValue,
                };
            }
        } else if (whitespaceRegex.test(currentValue)) {
            // whitespace, so end any current values we have
            finishCurrentValue();
        } else if (
            currentValue === "+" ||
            currentValue === "-" ||
            currentValue === "*"
        ) {
            // basic operators
            finishCurrentValue();
            if (currentValue === "*") {
                // convert * to multiplication symbol
                rawTokens.push(newOperator("×"));
            } else {
                rawTokens.push(newOperator(currentValue));
            }
        } else if (currentValue === "^") {
            // exponent
            finishCurrentValue();
            rawTokens.push({ type: RawMathsTokenType.Exponent });
        } else if (currentValue === "/") {
            // divide
            finishCurrentValue();
            rawTokens.push({ type: RawMathsTokenType.Divide });
        } else if (currentValue === "(") {
            finishCurrentValue();
            rawTokens.push({ type: RawMathsTokenType.OpenBracket });
        } else if (currentValue === ")") {
            finishCurrentValue();
            rawTokens.push({ type: RawMathsTokenType.CloseBracket });
        } else if (currentValue === "{") {
            // syntax for special identifiers
            finishCurrentValue();
            currentPartial = {
                type: PartialTokenType.SpecialIdentifier,
                currentValue: "",
            };
        } else if (currentValue === "}") {
            // close special identifier
            if (currentPartial.type === PartialTokenType.SpecialIdentifier) {
                let value = currentPartial.currentValue;
                // map to special value
                value = getSpecialValue(value) ?? value;

                rawTokens.push({
                    type: RawMathsTokenType.Identifier,
                    identifier: value,
                });
                currentPartial = {
                    type: PartialTokenType.None,
                };
            } else {
                throw new Error("Closed special identifier without opening it");
            }
        } else if (currentValue === "\\") {
            finishCurrentValue();
            currentPartial = {
                type: PartialTokenType.SpecialOperator,
                currentValue: "",
            };
        } else {
            if (currentPartial.type === PartialTokenType.SpecialIdentifier) {
                currentPartial.currentValue += currentValue;
            } else if (
                currentPartial.type === PartialTokenType.SpecialOperator
            ) {
                currentPartial.currentValue += currentValue;
                const operator = getSpecialOperator(
                    currentPartial.currentValue,
                );
                if (operator != null) {
                    let rawToken: RawMathsToken;
                    switch (operator) {
                        case SpecialOperator.SquareRoot:
                            rawToken = { type: RawMathsTokenType.SquareRoot };
                            break;
                        case SpecialOperator.Root:
                            rawToken = { type: RawMathsTokenType.Root };
                            break;
                        case SpecialOperator.Integral:
                            // integral symbol
                            rawToken = newOperator("∫");
                            break;
                        case SpecialOperator.DefiniteIntegral:
                            rawToken = {
                                type: RawMathsTokenType.SubSuperElement,
                                identifier: "∫",
                            };
                            break;
                        case SpecialOperator.Sum:
                            rawToken = {
                                type: RawMathsTokenType.SubSuperElement,
                                identifier: "Σ",
                            };
                            break;
                        case SpecialOperator.Product:
                            rawToken = {
                                type: RawMathsTokenType.SubSuperElement,
                                identifier: "Π",
                            };
                            break;
                        default:
                            throw new Error("invalid special operator");
                    }
                    rawTokens.push(rawToken);
                    currentPartial = {
                        type: PartialTokenType.None,
                    };
                }
            } else {
                finishCurrentValue();
                rawTokens.push(newIdentifier(currentValue));
            }
        }
    }
    finishCurrentValue();

    return rawTokens;
}
