import { expect, test } from "vitest";
import { constructFarey } from "./farey";

test("n = 4", () => {
    const vals = constructFarey(4);
    expect(vals.length).toEqual(7);
    expect(vals[0]).toEqual([0, 1]);
    expect(vals[1]).toEqual([1, 4]);
    expect(vals[2]).toEqual([1, 3]);
    expect(vals[3]).toEqual([1, 2]);
    expect(vals[4]).toEqual([2, 3]);
    expect(vals[5]).toEqual([3, 4]);
    expect(vals[6]).toEqual([1, 1]);
});

test("n = 8", () => {
    const vals = constructFarey(8);
    expect(vals.length).toEqual(24);
    expect(vals[0]).toEqual([0, 1]);
    expect(vals[1]).toEqual([1, 8]);
    expect(vals[2]).toEqual([1, 7]);
    expect(vals[3]).toEqual([1, 6]);
    expect(vals[4]).toEqual([2, 5]);
    expect(vals[5]).toEqual([3, 4]);
    expect(vals[6]).toEqual([2, 7]);
    expect(vals[7]).toEqual([1, 3]);
    expect(vals[8]).toEqual([3, 8]);
    expect(vals[9]).toEqual([2, 5]);
    expect(vals[10]).toEqual([3, 7]);
    expect(vals[11]).toEqual([1, 2]);
    expect(vals[12]).toEqual([4, 7]);
});
