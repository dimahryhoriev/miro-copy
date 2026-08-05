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
    console.log(point.x, canvasRect.x, windowPosition.x)
    console.log(point.x - canvasRect.x - windowPosition.x)
    return {
        x: point.x - canvasRect.x - windowPosition.x,
        y: point.y - canvasRect.y - windowPosition.y,
    };
}