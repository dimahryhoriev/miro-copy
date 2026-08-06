import { type WindowPosition } from "../model/window-position";

export function pointOnScreenToCanvas(
    windowPosition: WindowPosition,
    point: {
        x: number,
        y: number,
    },
    canvasRect?: {
        x: number,
        y: number,
    },
) {
    if (!canvasRect) return point;
    return {
        x: (point.x - canvasRect.x)
            / windowPosition.zoom
            + windowPosition.x,
        y: (point.y - canvasRect.y)
            / windowPosition.zoom
            + windowPosition.y,
    };
};