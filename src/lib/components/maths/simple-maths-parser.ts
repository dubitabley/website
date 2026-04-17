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

const specialIdentifierMap = new Map();
specialIdentifierMap.set("alpha", "α");
specialIdentifierMap.set("beta", "β");
specialIdentifierMap.set("gamma", "γ");
specialIdentifierMap.set("delta", "δ");
specialIdentifierMap.set("epsilon", "ε");
specialIdentifierMap.set("zeta", "ζ");
specialIdentifierMap.set("eta", "η");
specialIdentifierMap.set("theta", "θ");
specialIdentifierMap.set("iota", "ι");
specialIdentifierMap.set("kappa", "κ");
specialIdentifierMap.set("lambda", "λ");
specialIdentifierMap.set("mu", "μ");
specialIdentifierMap.set("nu", "ν");
specialIdentifierMap.set("xi", "ξ");
specialIdentifierMap.set("omicron", "ο");
specialIdentifierMap.set("pi", "π"); // important
specialIdentifierMap.set("rho", "ρ");
specialIdentifierMap.set("sigma", "σ");
specialIdentifierMap.set("tau", "τ");
specialIdentifierMap.set("upsilon", "υ");
specialIdentifierMap.set("phi", "φ");
specialIdentifierMap.set("chi", "χ");
specialIdentifierMap.set("psi", "ψ");
specialIdentifierMap.set("omega", "ω");

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

const PartialTokenType = {
    None: 0,
    Number: 1,
    SpecialIdentifier: 2,
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
type PartialToken = PartialNone | PartialNumber | SpecialPartialIdentifier;

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
                if (specialIdentifierMap.has(value)) {
                    value = specialIdentifierMap.get(value);
                }
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
        } else {
            if (currentPartial.type === PartialTokenType.SpecialIdentifier) {
                currentPartial.currentValue += currentValue;
            } else {
                finishCurrentValue();
                rawTokens.push(newIdentifier(currentValue));
            }
        }
    }
    finishCurrentValue();

    return rawTokens;
}
