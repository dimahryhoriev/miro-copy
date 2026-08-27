import { useEffect, useState } from "react";
import { type Node } from "./nodes";
import { centerRect, type Rect } from "@/shared/lib/geometry";
import { getNodesRect } from "./get-nodes-rect";
import { type NodesDimensionsMap } from "../hooks/use-nodes-dimensions";

export type WindowPosition = {
    x: number;
    y: number;
    zoom: number;
}

export function useWindowPositionModel(
    initialNodes: Node[] = [],
    canvasRect: Rect | null,
    nodesDimensions: NodesDimensionsMap,
) {
    const [position, setPosition] = useState<WindowPosition>({
        x: 0,
        y: 0,
        zoom: 1,
    });

    useEffect(() => {
        if (
            !canvasRect
            ||
            initialNodes.length === 0
        ) return;

        const centeredCanvasRect = centerRect(
            getNodesRect(
                initialNodes,
                nodesDimensions,
            ),
            canvasRect,
        );

        queueMicrotask(() => {
            setPosition({
                x: centeredCanvasRect.x,
                y: centeredCanvasRect.y,
                zoom: 1,
            })
        })
    }, [canvasRect, initialNodes, nodesDimensions]);

    return {
        position: position,
        setPosition,
    };
};

export type WindowPositionModel =
    ReturnType<typeof useWindowPositionModel>;