import { type NodesDimensionsMap } from "../hooks/use-nodes-dimensions";
import { type Node } from "./nodes";
import { useEffect, useState } from "react";
import { centerRect, diffPoints, type Rect } from "@/shared/lib/geometry";
import { getNodesRect } from "./get-nodes-rect";
import { getZoomToFit } from "../view-model/decorator/zoom";
import { pointOnScreenToCanvas } from "../domain/screen-to-canvas";

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

        const nodesRect = getNodesRect(
            initialNodes,
            nodesDimensions,
        );
        const centeredCanvasRect = centerRect(
            nodesRect,
            canvasRect,
        );
        const { fittedZoom = 1 } = getZoomToFit(
            canvasRect,
            nodesRect,
        );
        const screenCenter = {
            x: canvasRect.x + canvasRect.width / 2,
            y: canvasRect.y + canvasRect.height / 2,
        };

        const centerBeforeZoom = pointOnScreenToCanvas(
            {
                x: centeredCanvasRect.x,
                y: centeredCanvasRect.y,
                zoom: 1,
            },
            screenCenter,
            canvasRect,
        )
        const centerAfterZoom = pointOnScreenToCanvas(
            {
                x: centeredCanvasRect.x,
                y: centeredCanvasRect.y,
                zoom: fittedZoom,
            },
            screenCenter,
            canvasRect,
        )
        const diff = diffPoints(
            centerBeforeZoom,
            centerAfterZoom,
        );

        queueMicrotask(() => {
            setPosition({
                x: centeredCanvasRect.x - diff.x,
                y: centeredCanvasRect.y - diff.y,
                zoom: fittedZoom,
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