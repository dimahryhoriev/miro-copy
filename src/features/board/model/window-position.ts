import { type ViewModelParams } from "../view-model/view-model-params";
import { useState } from "react";
import { getNodesRect } from "./get-nodes-rect";
import { centerRect, diffPoints } from "@/shared/lib/geometry";
import { pointOnScreenToCanvas } from "../domain/screen-to-canvas";
import { getZoomToFit } from "../view-model/decorator/zoom";
import { type NodesModel } from "./nodes";
import { type NodesDimensionsMap } from "../hooks/use-nodes-dimensions";
import type { CanvasRect } from "../hooks/use-canvas-rect";

export type WindowPosition = {
    x: number;
    y: number;
    zoom: number;
} | null;

export function useWindowPositionModel() {
    const [position, setPosition] = useState<WindowPosition | null>(
        null
    );

    return {
        position,
        setPosition,
    };
};

export type WindowPositionModel =
    ReturnType<typeof useWindowPositionModel>;

export function getInitialWindowPosition({
    nodesModel,
    canvasRect,
    nodesDimensions,
    windowPositionModel,
}: {
    nodesModel: NodesModel;
    canvasRect: CanvasRect | undefined;
    nodesDimensions: NodesDimensionsMap;
    windowPositionModel: WindowPositionModel;
}): WindowPosition | null {
    if (
        windowPositionModel.position
    ) {
        return windowPositionModel.position;
    }

    if (nodesModel.nodes.length === 0) {
        return {
            x: 0,
            y: 0,
            zoom: 1,
        };
    };

    if (
        !canvasRect
        ||
        Object.keys(nodesDimensions).length === 0
    ) {
        return null;
    };

    const centeredWindow = getWindowCenter({
        nodesModel,
        canvasRect,
        nodesDimensions,
    } as ViewModelParams)

    return (
        centeredWindow
        ??
        {
            x: 0,
            y: 0,
            zoom: 1,
        }
    );
};

function getWindowCenter({
    nodesModel,
    canvasRect,
    nodesDimensions,
}: ViewModelParams) {
    if (
        !canvasRect
        ||
        nodesModel.nodes.length === 0
    ) return;

    const nodesRect = getNodesRect(
        nodesModel.nodes,
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

    return {
        x: centeredCanvasRect.x - diff.x,
        y: centeredCanvasRect.y - diff.y,
        zoom: fittedZoom,
    }
}