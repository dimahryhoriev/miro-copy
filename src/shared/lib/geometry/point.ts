export type Point = {
    x: number;
    y: number;
    relativeTo?: string;
};

export type RelativePoint = {
    relativeTo: string;
} & Point;

export function diffPoints(
    point1: Point,
    point2: Point,
) {
    return {
        x: point2.x - point1.x,
        y: point2.y - point1.y,
    }
}

export function distanceFromPoints(
    point1: Point,
    point2: Point,
) {
    return Math.sqrt(
        (point2.x - point1.x) ** 2
        +
        (point2.y - point1.y) ** 2
    )
}

export function addPoints(
    point1: Point,
    point2: Point,
) {
    return {
        x: point1.x + point2.x,
        y: point1.y + point2.y,
    };
}

export type RelativeBase = Record<string, Point>;

export function resolveRelativePoint(
    base: RelativeBase,
    point: Point,
): Point {
    let relativeTo = point.relativeTo;
    let newPoint = point;
    while (relativeTo) {
        const basePoint = base[relativeTo];

        if (basePoint) {
            newPoint = addPoints(
                newPoint,
                basePoint,
            );
        };

        relativeTo = basePoint?.relativeTo;
    };
    return newPoint;
};

export function isRelativePoint(
    point: Point,
): point is RelativePoint {
    return 'relativeTo' in point;
};

export function getMinMaxPoints(
    points: Point[],
) {
    if (!points) return {
        minPoint: {
            x: 0,
            y: 0,
        },
        maxPoint: {
            x: 0,
            y: 0,
        },
    };

    const minPoint = {
        x: Math.min(
            ...points.map(
                (point) => point.x
            )
        ),
        y: Math.min(
            ...points.map(
                (point) => point.y
            ),
        )
    };

    const maxPoint = {
        x: Math.max(
            ...points.map(
                (point) => point.x
            )
        ),
        y: Math.max(
            ...points.map(
                (point) => point.y
            ),
        )
    };

    return {
        minPoint: {
            x: minPoint.x,
            y: minPoint.y,
        },
        maxPoint: {
            x: maxPoint.x,
            y: maxPoint.y,
        }
    }
};