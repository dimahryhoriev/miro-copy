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
    if (nodes.length === 0) {
        return {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        }
    }

    const points: Point[] = nodes.flatMap(
        (node) => {
            const dimensions = nodeDimensions[node.id];

            const width = dimensions?.width ?? 0;
            const height = dimensions?.height ?? 0;

            if (node.type === 'sticker') return [
                {
                    x: node.x,
                    y: node.y,
                },
                {
                    x: node.x + width,
                    y: node.y + height,
                },
            ];

            if (node.type === 'arrow') return [
                {
                    x: node.start.x,
                    y: node.start.y,
                },
                {
                    x: node.end.x,
                    y: node.end.y,
                },
            ];

            return [];
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
};