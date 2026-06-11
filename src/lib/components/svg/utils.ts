import type { CrossfadeParams, TransitionConfig } from "svelte/transition";

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
