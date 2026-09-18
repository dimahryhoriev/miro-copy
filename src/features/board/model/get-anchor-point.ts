import { type NodeDimensions } from "../hooks/use-nodes-dimensions";
import { distanceFromPoints, type Point } from "@/shared/lib/geometry";

export function getAnchorPoint(
    relativePoint: Point,
    stickerDimensions: NodeDimensions,
): Point {
    const anchorPoints = [
        {
            x: stickerDimensions.width / 2,
            y: 0,
        },
        {
            x: stickerDimensions.width / 2,
            y: stickerDimensions.height,
        },
        {
            x: 0,
            y: stickerDimensions.height / 2,
        },
        {
            x: stickerDimensions.width,
            y: stickerDimensions.height / 2,
        }
    ];

    const vectors = anchorPoints.map(
        (point) => ({
            length: distanceFromPoints(point, relativePoint),
            anchor: point,
        })
    );

    const minVector = vectors.filter(
        (vector) => (
            vector.length
            ===
            Math.min(
                ...vectors.map(
                    (vector) => vector.length
                )
            )
        )
    )[0];

    return minVector.anchor;
};