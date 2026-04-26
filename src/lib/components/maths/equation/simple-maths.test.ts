import { parseEquation, TokenType, type Token } from "./simple-maths";
import { test, expect } from "vitest";

function expectIdentifier(token: Token, expectedValue: string) {
    if (token.type !== TokenType.Identifier) {
        throw new Error("token isn't identifier");
    }
    if (token.identifier !== expectedValue) {
        throw new Error(
            `identifier doesn't match. expected: ${expectedValue}, actual: ${token.identifier}`,
        );
    }
}

function expectOperator(token: Token, expectedValue: string) {
    if (token.type !== TokenType.Operator) {
        throw new Error("token isn't operator");
    }
    if (token.operator !== expectedValue) {
        throw new Error(
            `operator doesn't match. expected: ${expectedValue}, actual: ${token.operator}`,
        );
    }
}

type ExpectTokenFunction = (tokens: Token[]) => void;
function expectFraction(
    token: Token,
    numerator: ExpectTokenFunction,
    denominator: ExpectTokenFunction,
) {
    if (token.type !== TokenType.Fraction) {
        throw new Error("unexpected token type");
    }

    numerator(token.numerator);
    denominator(token.denominator);
}

function expectExponent(
    token: Token,
    base: (token: Token) => void,
    power: ExpectTokenFunction,
) {
    if (token.type !== TokenType.Exponent) {
        throw new Error("unexpected token type");
    }

    base(token.base);
    power(token.power);
}

function expectBracket(token: Token, children: ExpectTokenFunction) {
    if (token.type !== TokenType.Bracket) {
        throw new Error("unexpected token type");
    }

    children(token.tokens);
}

function expectSquareRoot(token: Token, children: ExpectTokenFunction) {
    if (token.type !== TokenType.SquareRoot) {
        throw new Error("unexpected token type");
    }

    children(token.tokens);
}

function expectRoot(
    token: Token,
    roots: ExpectTokenFunction,
    children: ExpectTokenFunction,
) {
    if (token.type !== TokenType.Root) {
        throw new Error("unexpected token type");
    }

    roots(token.rootTokens);
    children(token.tokens);
}

function expectSubSuperIdentifier(
    token: Token,
    superTokens: ExpectTokenFunction,
    subTokens: ExpectTokenFunction,
) {
    if (token.type !== TokenType.SubSuperIdentifier) {
        throw new Error("unexpected token type");
    }

    superTokens(token.superTokens);
    subTokens(token.subTokens);
}

function expectSub(
    token: Token,
    main: (token: Token) => void,
    children: ExpectTokenFunction,
) {
    if (token.type !== TokenType.Sub) {
        throw new Error("unexpected token type");
    }

    main(token.identifierToken);
    children(token.subTokens);
}

test("basic addition", () => {
    const equation = "2+4";
    const tokens = parseEquation(equation);

    expect(tokens.length).toEqual(3);
    expectIdentifier(tokens[0], "2");
    expectOperator(tokens[1], "+");
    expectIdentifier(tokens[2], "4");
});

test("basic multiplication", () => {
    const equation = "5*10";
    const tokens = parseEquation(equation);

    expect(tokens.length).toEqual(3);
    expectIdentifier(tokens[0], "5");
    expectOperator(tokens[1], "×");
    expectIdentifier(tokens[2], "10");
});

test("basic addition with whitespace", () => {
    const equation = "2 + 4";
    const tokens = parseEquation(equation);

    expect(tokens.length).toEqual(3);
    expectIdentifier(tokens[0], "2");
    expectOperator(tokens[1], "+");
    expectIdentifier(tokens[2], "4");
});

test("basic fraction", () => {
    const equation = "6/3";
    const tokens = parseEquation(equation);

    expect(tokens.length).toEqual(1);
    const fractionToken = tokens[0];
    if (fractionToken.type !== TokenType.Fraction) {
        throw new Error("invalid - not fraction");
    }
    expectIdentifier(fractionToken.numerator[0], "6");
    expectIdentifier(fractionToken.denominator[0], "3");
});

test("basic brackets", () => {
    const equation = "5 * (2 + 6)";
    const tokens = parseEquation(equation);

    expect(tokens.length).toEqual(3);
    expectIdentifier(tokens[0], "5");
    expectOperator(tokens[1], "×");
    expectBracket(tokens[2], (tokens) => {
        expect(tokens.length).toEqual(3);
        expectIdentifier(tokens[0], "2");
        expectOperator(tokens[1], "+");
        expectIdentifier(tokens[2], "6");
    });
});

test("bracket with exponent", () => {
    const equation = "(3 + 8)^3";
    const tokens = parseEquation(equation);
    expect(tokens.length).toEqual(1);
    expectExponent(
        tokens[0],
        (base) => {
            expectBracket(base, (tokens) => {
                expect(tokens.length).toEqual(3);
                expectIdentifier(tokens[0], "3");
                expectOperator(tokens[1], "+");
                expectIdentifier(tokens[2], "8");
            });
        },
        (power) => {
            expect(power.length).toEqual(1);
            expectIdentifier(power[0], "3");
        },
    );
});

test("chain fraction", () => {
    const equation = "2/3/5";
    const tokens = parseEquation(equation);

    // this should be (2/(3/5))
    expect(tokens.length).toEqual(1);
    expectFraction(
        tokens[0],
        (numerator) => {
            expect(numerator.length).toEqual(1);
            expectIdentifier(numerator[0], "2");
        },
        (denominator) => {
            expect(denominator.length).toEqual(1);
            expectFraction(
                denominator[0],
                (numerator) => {
                    expect(numerator.length).toEqual(1);
                    expectIdentifier(numerator[0], "3");
                },
                (denominator) => {
                    expect(denominator.length).toEqual(1);
                    expectIdentifier(denominator[0], "5");
                },
            );
        },
    );
});

test("special identifiers", () => {
    const equation = "[pi] + [sigma] + [test]";
    const tokens = parseEquation(equation);

    expect(tokens.length).toEqual(5);
    expectIdentifier(tokens[0], "π");
    expectOperator(tokens[1], "+");
    expectIdentifier(tokens[2], "σ");
    expectOperator(tokens[3], "+");
    expectIdentifier(tokens[4], "test");
});

test("square root", () => {
    const equation = "\\sqrt5";
    const tokens = parseEquation(equation);

    expect(tokens.length).toEqual(1);
    expectSquareRoot(tokens[0], (tokens) => {
        expect(tokens.length).toEqual(1);
        expectIdentifier(tokens[0], "5");
    });
});

test("general root", () => {
    const equation = "4\\root(5*4)";
    const tokens = parseEquation(equation);

    expect(tokens.length).toEqual(1);
    expectRoot(
        tokens[0],
        (roots) => {
            expect(tokens.length).toEqual(1);
            expectIdentifier(roots[0], "4");
        },
        (tokens) => {
            expect(tokens.length).toEqual(3);
            expectIdentifier(tokens[0], "5");
            expectOperator(tokens[1], "×");
            expectIdentifier(tokens[2], "4");
        },
    );
});

test("basic integral", () => {
    const equation = "\\integral 5x[dx]";
    const tokens = parseEquation(equation);

    expect(tokens.length).toEqual(4);
    expectOperator(tokens[0], "∫");
    expectIdentifier(tokens[1], "5");
    expectIdentifier(tokens[2], "x");
    expectIdentifier(tokens[3], "dx");
});

test("definite integral", () => {
    const equation = "6\\defintegral3 3y[dy]";
    const tokens = parseEquation(equation);

    expect(tokens.length).toEqual(4);
    expectSubSuperIdentifier(
        tokens[0],
        (superTokens) => {
            expect(superTokens.length).toEqual(1);
            expectIdentifier(superTokens[0], "6");
        },
        (subTokens) => {
            expect(subTokens.length).toEqual(1);
            expectIdentifier(subTokens[0], "3");
        },
    );
    expectIdentifier(tokens[1], "3");
    expectIdentifier(tokens[2], "y");
    expectIdentifier(tokens[3], "dy");
});

test("product", () => {
    const equation = "5 \\product (i=3) 2i = 120";
    const tokens = parseEquation(equation);

    expect(tokens.length).toEqual(5);
    expectSubSuperIdentifier(
        tokens[0],
        (superTokens) => {
            expect(superTokens.length).toEqual(1);
            expectIdentifier(superTokens[0], "5");
        },
        (subTokens) => {
            expect(subTokens.length).toEqual(3);
            expectIdentifier(subTokens[0], "i");
            expectIdentifier(subTokens[1], "=");
            expectIdentifier(subTokens[2], "3");
        },
    );
    expectIdentifier(tokens[1], "2");
    expectIdentifier(tokens[2], "i");
    expectIdentifier(tokens[3], "=");
    expectIdentifier(tokens[4], "120");
});

test("subscript", () => {
    const equation = "F\\sub5";
    const tokens = parseEquation(equation);

    expect(tokens.length).toEqual(1);
    expectSub(
        tokens[0],
        (token) => {
            expectIdentifier(token, "F");
        },
        (tokens) => {
            expect(tokens.length).toEqual(1);
            expectIdentifier(tokens[0], "5");
        },
    );
});
