import { lerp } from "../frog/util/numbers";

/**
 * Generates an SVG path for a regular polygon
 * @param radius The radius of the polygon
 * @param points The number of points for the polygon
 * @param angleOffset Angle offset in radians
 * @returns
 */
export function generatePolygonPath(
    radius: number,
    points: number,
    angleOffset: number = 0,
): string {
    let pathString = "";

    for (let i = 0; i < points; i++) {
        let pointX =
            radius +
            radius * Math.cos((2 * Math.PI * i) / points + angleOffset);
        let pointY =
            radius +
            radius * Math.sin((2 * Math.PI * i) / points + angleOffset);
        if (i === 0) {
            pathString += `M ${pointX},${pointY}`;
        } else {
            pathString += ` L ${pointX},${pointY}`;
        }
    }
    pathString += " Z";

    return pathString;
}

/**
 * Constructs a semicircle path
 * @param radius Radius of the semicircle
 */
export function generateSemicirclePath(
    radius: number,
    options?: {
        offsetX?: number;
        offsetY?: number;
    },
): string {
    const offsetX = options?.offsetX ?? 0;
    const offsetY = options?.offsetY ?? 0;

    let pathString = "";

    // start on left
    pathString += `M ${offsetX},${radius + offsetY} `;
    // arc to right
    pathString += `A ${radius},${radius} 180 1 1 ${2 * radius + offsetX},${radius + offsetY} `;
    // close path
    pathString += `Z`;

    return pathString;
}

/**
 * Constructs a path for an angle
 * @param point The point the angle is for
 * @param startAngle Starting angle going anti-clockwise
 * @param angleSize The size of the angle in radians
 * @returns Path for SVG
 */
export function generateAnglePath(
    point: readonly [number, number],
    startAngle: number,
    angleSize: number,
): string {
    const endAngle = startAngle + angleSize;
    const dist = 12;
    const pos1 = [
        point[0] + Math.cos(startAngle) * dist,
        point[1] + Math.sin(startAngle) * dist,
    ];
    const pos2 = [
        point[0] + Math.cos(endAngle) * dist,
        point[1] + Math.sin(endAngle) * dist,
    ];
    const curveAngle = lerp(startAngle, endAngle, 0.5);
    const curvePos = [
        point[0] + Math.cos(curveAngle) * dist * 1.5,
        point[1] + Math.sin(curveAngle) * dist * 1.5,
    ];
    let path = `M ${pos1[0]} ${pos1[1]} S ${curvePos[0]} ${curvePos[1]}, ${pos2[0]} ${pos2[1]}`;

    return path;
}
