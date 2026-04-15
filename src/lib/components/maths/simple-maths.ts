import {
    parseToTokens,
    RawMathsTokenType,
    type RawMathsToken,
} from "./simple-maths-parser";

export const TokenType = {
    /** Basic number/const identifier */
    Identifier: 0,
    /** Basic operator e.g. plus/subtract */
    Operator: 1,
    /** Fraction operator, normally division */
    Fraction: 2,
    /** Exponent operator, consisting of a base and power */
    Exponent: 3,
    /** Brackets around some operators */
    Bracket: 4,
} as const;
export type TokenType = (typeof TokenType)[keyof typeof TokenType];

export type IdentifierToken = {
    type: typeof TokenType.Identifier;
    identifier: string;
};

export type OperatorToken = {
    type: typeof TokenType.Operator;
    operator: string;
};

export type FractionToken = {
    type: typeof TokenType.Fraction;
    numerator: Token[];
    denominator: Token[];
};

export type ExponentToken = {
    type: typeof TokenType.Exponent;
    base: Token;
    power: Token[];
};

export type BracketToken = {
    type: typeof TokenType.Bracket;
    tokens: Token[];
};

export type Token =
    | IdentifierToken
    | OperatorToken
    | FractionToken
    | ExponentToken
    | BracketToken;

export function parseEquation(equation: string): Token[] {
    const rawTokens = parseToTokens(equation);

    const step1Tokens = parseStep1(rawTokens);
    const step2Tokens = parseStep2(step1Tokens);

    return parseStep3(step2Tokens);
}

type Step1Token =
    | {
          isBracket: false;
          token: RawMathsToken;
      }
    | {
          isBracket: true;
          tokens: Step1Token[];
      };

/** Brackets */
function parseStep1(rawTokens: RawMathsToken[]): Step1Token[] {
    function mapRaw(mathsToken: RawMathsToken): Step1Token {
        return {
            isBracket: false,
            token: mathsToken,
        };
    }

    function mapBracket(tokens: Step1Token[]): Step1Token {
        return {
            isBracket: true,
            tokens,
        };
    }

    const closeBracketIndex = rawTokens.findIndex(
        (x) => x.type === RawMathsTokenType.CloseBracket,
    );
    if (closeBracketIndex === -1) {
        // no brackets, just return step 1 tokens raw
        return rawTokens.map(mapRaw);
    }

    let tokens: Step1Token[] = [];
    let openIndex = 0;
    let startCurrentIndex = 0;
    let depth = 0;
    for (let index = 0; index < rawTokens.length; index++) {
        const rawToken = rawTokens[index];
        if (rawToken.type === RawMathsTokenType.OpenBracket) {
            if (depth === 0) {
                // get previous section
                if (startCurrentIndex < index) {
                    const startTokens = rawTokens
                        .slice(startCurrentIndex, index)
                        .map(mapRaw);
                    tokens.push(...startTokens);
                }
                openIndex = index;
            }
            depth += 1;
        } else if (rawToken.type === RawMathsTokenType.CloseBracket) {
            depth -= 1;
            if (depth === 0) {
                // go between open index and this one
                const bracketRawTokens = rawTokens.slice(openIndex + 1, index);
                const bracketTokens = parseStep1(bracketRawTokens);
                tokens.push(mapBracket(bracketTokens));
                startCurrentIndex = index + 1;
            }
        }
    }

    if (startCurrentIndex < rawTokens.length) {
        const finalRawTokens = rawTokens.slice(startCurrentIndex).map(mapRaw);
        tokens.push(...finalRawTokens);
    }

    return tokens;
}

const Step2TokenType = {
    Bracket: 0,
    DoubleType: 1,
    Other: 2,
} as const;

type Step2Double = {
    type: typeof Step2TokenType.DoubleType;
    actualType:
        | typeof RawMathsTokenType.Divide
        | typeof RawMathsTokenType.Exponent;
    first: Step2Token;
    second: Step2Token;
};
type Step2Token =
    | {
          type: typeof Step2TokenType.Bracket;
          tokens: Step2Token[];
      }
    | Step2Double
    | {
          type: typeof Step2TokenType.Other;
          rawToken: RawMathsToken;
      };

/** Exponents and Fractions */
function parseStep2(step1Tokens: Step1Token[]): Step2Token[] {
    function mapToken(step1Token: Step1Token): Step2Token {
        if (step1Token.isBracket) {
            return {
                type: Step2TokenType.Bracket,
                tokens: parseStep2(step1Token.tokens),
            };
        } else {
            return {
                type: Step2TokenType.Other,
                rawToken: step1Token.token,
            };
        }
    }

    let tokens: Step2Token[] = [];
    let lastIndex = 0;
    let previousEnd: Step2Double | null = null;
    for (let index = 0; index < step1Tokens.length; index++) {
        const step1Token = step1Tokens[index];

        // if it's a bracket then will be covered already
        if (!step1Token.isBracket) {
            const tokenType = step1Token.token.type;
            // if it's a double sided function then handle it here
            if (
                tokenType === RawMathsTokenType.Divide ||
                tokenType === RawMathsTokenType.Exponent
            ) {
                // append this onto previous
                // add previous tokens
                if (lastIndex < index - 1) {
                    const previousTokens = step1Tokens
                        .slice(lastIndex, index - 1)
                        .map(mapToken);
                    tokens.push(...previousTokens);
                }
                // get previous token and next token
                const previousToken = step1Tokens[index - 1];
                const nextToken = step1Tokens[index + 1];
                const doubleToken = {
                    type: Step2TokenType.DoubleType,
                    actualType: tokenType,
                    first: mapToken(previousToken),
                    second: mapToken(nextToken),
                };
                // if we just had a double, then append this one on to the previous
                if (previousEnd != null) {
                    previousEnd.second = doubleToken;
                } else {
                    tokens.push(doubleToken);
                }
                previousEnd = doubleToken;

                lastIndex = index + 2;
                // skip checking next index
                index += 1;
            } else {
                previousEnd = null;
            }
        } else {
            previousEnd = null;
        }
    }

    if (lastIndex < step1Tokens.length) {
        const endTokens = step1Tokens
            .slice(lastIndex, step1Tokens.length)
            .map(mapToken);
        tokens.push(...endTokens);
    }

    return tokens;
}

/** Basic identifiers/operators */
function parseStep3(step2Tokens: Step2Token[]): Token[] {
    function convertTokenToArray(token: Token): Token[] {
        if (token.type === TokenType.Bracket) {
            return token.tokens;
        } else {
            return [token];
        }
    }

    function convertRawToken(rawToken: RawMathsToken): Token {
        if (rawToken.type === RawMathsTokenType.Identifier) {
            return {
                type: TokenType.Identifier,
                identifier: rawToken.identifier,
            };
        } else if (rawToken.type === RawMathsTokenType.Operator) {
            return {
                type: TokenType.Operator,
                operator: rawToken.operator,
            };
        } else {
            throw new Error("invalid raw token");
        }
    }
    function parseSingle(step2Token: Step2Token): Token {
        if (step2Token.type === Step2TokenType.Bracket) {
            const subTokens = parseStep3(step2Token.tokens);
            return { type: TokenType.Bracket, tokens: subTokens };
        } else if (step2Token.type === Step2TokenType.DoubleType) {
            const subFirst = parseSingle(step2Token.first);
            const subSecond = parseSingle(step2Token.second);
            if (step2Token.actualType === RawMathsTokenType.Divide) {
                return {
                    type: TokenType.Fraction,
                    numerator: convertTokenToArray(subFirst),
                    denominator: convertTokenToArray(subSecond),
                };
            } else if (step2Token.actualType === RawMathsTokenType.Exponent) {
                return {
                    type: TokenType.Exponent,
                    base: subFirst,
                    power: convertTokenToArray(subSecond),
                };
            } else {
                throw new Error("invalid double type");
            }
        } else if (step2Token.type === Step2TokenType.Other) {
            const rawToken = step2Token.rawToken;
            return convertRawToken(rawToken);
        } else {
            throw new Error("invalid token type");
        }
    }

    return step2Tokens.map(parseSingle);
}
