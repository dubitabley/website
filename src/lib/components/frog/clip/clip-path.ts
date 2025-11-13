//
// Utilities for handling clip-path stuff
// https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_masking/Clipping
//
//

import { PathType, type AnyPath } from "./path-objects";

/**
 * Generates a inverted path from the objects passed in
 *
 */
export function generatePathInverse(
    width: number,
    height: number,
    pathObject: AnyPath,
): string {
    // https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/shape
    // would be cool if it was more supported
    let pathString =
        `M 0,0 ` +
        `L ${width},0 ` +
        `L ${width},${height} ` +
        `L 0,${height} ` +
        `L 0,0 `;

    switch (pathObject.pathType) {
        case PathType.Circle:
            const pathX = pathObject.x;
            const pathY = pathObject.y;
            const pathR = pathObject.radius;
            pathString +=
                `M ${pathX - pathR},${pathY - pathR} ` +
                `A ${pathR} ${pathR} 180 1 1 ${pathX + pathR},${pathY + pathR} ` +
                `A ${pathR} ${pathR} 180 1 1 ${pathX - pathR},${pathY - pathR} `;
            break;
        case PathType.Rectangle:
            break;
    }

    return pathString;
}

export function generatePath(pathObjects: AnyPath[]) {
    let pathString = "";

    for (const pathObject of pathObjects) {
        switch (pathObject.pathType) {
            case PathType.Circle:
                const pathX = pathObject.x;
                const pathY = pathObject.y;
                const pathR = pathObject.radius;
                pathString +=
                    `M ${pathX - pathR},${pathY - pathR} ` +
                    `A ${pathR} ${pathR} 180 1 1 ${pathX + pathR},${pathY + pathR} ` +
                    `A ${pathR} ${pathR} 180 1 1 ${pathX - pathR},${pathY - pathR} `;
                break;
            case PathType.Rectangle:
                break;
        }
    }

    // pathString += "Z";

    return pathString;
}

export function generateClipPath(path: string): string {
    return `path("${path}")`;
}
