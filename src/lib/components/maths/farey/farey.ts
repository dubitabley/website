export type Pair = [number, number];

export function constructFarey(num: number): Pair[] {
    const fareyVals: Pair[] = [];
    // add 0
    fareyVals.push([0, 1]);
    fareyVals.push([1, num]);

    let c = 1;
    while (true) {
        const len = fareyVals.length;
        const prev2 = fareyVals[len - 1]; // a/b
        const prev1 = fareyVals[len - 2]; // c/d
        const newTerm = nextTerm(num, prev1, prev2);
        c = newTerm[0];
        if (c > num) {
            break;
        }
        fareyVals.push(newTerm);
    }

    return fareyVals;
}

// https://en.wikipedia.org/wiki/Farey_sequence#Next_term
function nextTerm(n: number, previousTerm1: Pair, previousTerm2: Pair): Pair {
    // previousTerm1 = a/b, previousTerm2 = c/d
    const p =
        Math.floor((n + previousTerm1[1]) / previousTerm2[1]) *
            previousTerm2[0] -
        previousTerm1[0];
    const q =
        Math.floor((n + previousTerm1[1]) / previousTerm2[1]) *
            previousTerm2[1] -
        previousTerm1[1];

    return [p, q];
}
