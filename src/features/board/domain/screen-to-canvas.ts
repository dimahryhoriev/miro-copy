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
            / (windowPosition?.zoom ?? 1)
            + (windowPosition?.x ?? 0),
        y: (point.y - canvasRect.y)
            / (windowPosition?.zoom ?? 1)
            + (windowPosition?.y ?? 0),
    };
};