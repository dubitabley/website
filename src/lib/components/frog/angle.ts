const TAU: number = Math.PI * 2;

/**
 *
 * @param angle1
 * @param angle2
 * @returns true if we need to add to this angle to get towards other angle via shortest distance,
 *  false otherwise. Also returns the shortest distance
 */
function getShortestDirection(
    angle1: number,
    angle2: number,
): [boolean, number] {
    if (angle1 < angle2) {
        const leftDist = angle2 - angle1;
        const rightDist = angle1 + TAU - angle2;
        const left = leftDist < rightDist;
        return [left, left ? leftDist : rightDist];
    } else {
        const leftDist = angle1 - angle2;
        const rightDist = angle2 + TAU - angle1;
        const left = leftDist < rightDist;
        return [!left, left ? leftDist : rightDist];
    }
}

/**
 * Interpolates from an angle to a target angle
 * @param currentAngle
 * @param targetAngle
 */
export function angleInterp(
    currentAngle: number,
    targetAngle: number,
): [number, boolean] {
    const [addToCurrentAngle, shortestDistance] = getShortestDirection(
        currentAngle,
        targetAngle,
    );

    let amount = Math.min(0.1, shortestDistance);
    if (!addToCurrentAngle) {
        amount = -amount;
    }
    return [clampAngle(currentAngle + amount), Math.abs(amount) < 0.01];
}

/**
 * Gets the distance between 2 angles
 * @param angle1
 * @param angle2
 */
function angleDistance(angle1: number, angle2: number): number {
    return Math.abs(clampAngle(angle1) - clampAngle(angle2));
}

/**
 * Clamps an angle to between 0 and 2 * PI
 * @param angle
 */
function clampAngle(angle: number): number {
    let newAngle = angle;
    while (newAngle < 0) {
        newAngle += TAU;
    }

    while (newAngle > TAU) {
        newAngle -= TAU;
    }

    return newAngle;
}
