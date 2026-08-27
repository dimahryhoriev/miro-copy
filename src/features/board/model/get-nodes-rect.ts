import { type NodesDimensionsMap } from "../hooks/use-nodes-dimensions";
import { type Node } from "@/features/board";
import {
    createRectFromPoints,
    getMinMaxPoints,
    type Point,
    type Rect,
} from "@/shared/lib/geometry";

export function getNodesRect(
    nodes: Node[],
    nodeDimensions: NodesDimensionsMap,
): Rect {
    const stickers = nodes.filter(
        (node) => node.type === 'sticker'
    );

    if (stickers.length === 0) {
        return {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        }
    }

    const points: Point[] = stickers.flatMap(
        (sticker) => {
            const dimensions = nodeDimensions[sticker.id];

            const width = dimensions?.width ?? 0;
            const height = dimensions?.height ?? 0;

            return [
                {
                    x: sticker.x,
                    y: sticker.y,
                },
                {
                    x: sticker.x + width,
                    y: sticker.y + height,
                },
            ];
        }
    );

    const minMaxPoints = getMinMaxPoints(points);

    return createRectFromPoints(
        {
            x: minMaxPoints.minPoint.x,
            y: minMaxPoints.minPoint.y,
        },
        {
            x: minMaxPoints.maxPoint.x,
            y: minMaxPoints.maxPoint.y,
        },
    );
}