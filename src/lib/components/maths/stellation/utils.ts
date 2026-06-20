/** Gets the size of an internal angle of a regular polygon in radians */
export function getInternalAngle(numVertices: number): number {
    // https://en.wikipedia.org/wiki/Regular_polygon
    return ((numVertices - 2) * Math.PI) / numVertices;
}

/** Gets the edge length for a polygon from a radius */
export function getEdgeLength(numVertices: number, radius: number): number {
    return 2 * radius * Math.sin(Math.PI / numVertices);
}

/** Converts 2 points into the gradient and y intersection of the line they form, i.e. y=mx+c */
export function getGradientIntersection(
    point1: [number, number],
    point2: [number, number]
): [number, number] {
    const xDiff = point2[0] - point1[0];
    if (xDiff === 0) {
        // can't divide by zero, just have a vertical line and return the x coordinate
        return [Infinity, point1[0]];
    }

    const gradient = (point2[1] - point1[1]) / xDiff;
    // c=y-mx
    const yIntersection = point1[1] - gradient * point1[0];

    return [gradient, yIntersection];
}

/**
 * Gets the intersection point of two lines. The lines are defined by [gradient, y intersection]
 * If the lines are parallel, then throws an error
 */
export function getIntersectionPoint(
    lineFormula1: [number, number],
    lineFormula2: [number, number]
): [number, number] {
    // parallel lines, just return null
    if (lineFormula1[0] === lineFormula2[0]) {
        throw new Error("Parallel lines");
    }
    // if either of the gradients aren't finite, they're a vertical line
    if (!Number.isFinite(lineFormula1[0]) || !Number.isFinite(lineFormula2[0])) {
        if (!Number.isFinite(lineFormula1[0])) {
            // get where line formula 2 has x = line formula 1's x
            const y = lineFormula2[0] * lineFormula1[1] + lineFormula2[1];
            return [lineFormula1[1], y];
        } else if (!Number.isFinite(lineFormula2[0])) {
            const y = lineFormula1[0] * lineFormula2[1] + lineFormula1[1];
            return [lineFormula2[1], y];
        } else {
            throw new Error("should be unreachable");
        }
    }

    // x = (c2 - c1) / (m1 - m2)
    const x = (lineFormula2[1] - lineFormula1[1]) / (lineFormula1[0] - lineFormula2[0]);
    const y = lineFormula1[0] * x + lineFormula1[1];
    return [x, y];
}

export function getDistance(
    point1: [number, number],
    point2: [number, number]
): number {
    return Math.hypot(point2[0] - point1[0], point2[1] - point1[1]);
}

export function addLengthToPoint(
    point: [number, number],
    line: [number, number],
    length: number
): [number, number] {
    if (!Number.isFinite(line[0])) {
        // vertical line
        return [point[0], point[1] + length];
    }
    const xDiff = length / (1 + line[0]);
    const yDiff = line[0] * xDiff;
    return [
        point[0] + xDiff,
        point[1] + yDiff
    ];
}

/**
 * Creates a point (tuple of nums) round a circle
 * @param radius Radius of the circle
 * @param fraction Fraction around the circle
 * @param centre Centre value to add point by
 */
export function createCirclePoint(
    radius: number,
    fraction: number,
    centre: number,
): [number, number] {
    return [
        centre + radius * Math.cos(2 * Math.PI * fraction),
        centre + radius * Math.sin(2 * Math.PI * fraction),
    ];
}
