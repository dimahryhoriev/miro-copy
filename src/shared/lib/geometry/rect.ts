import type { Point } from "./point";

export type Rect = {
    x: number;
    y: number;
    width: number;
    height: number;
}

export function createRectFromDimensions(
    start: Point,
    dimensions: {
        width: number;
        height: number;
    },
) {
    return {
        x: start.x,
        y: start.y,
        width: dimensions.width,
        height: dimensions.height,
    }
}

export function createRectFromPoints(
    start: Point,
    end: Point,
): Rect {
    return {
        x: Math.min(start.x, end.x),
        y: Math.min(start.y, end.y),
        width: Math.abs(start.x - end.x),
        height: Math.abs(start.y - end.y),
    }
}

export function isPointInRect(
    point: Point,
    rect: Rect,
) {
    return (
        point.x >= rect.x &&
        point.x <= rect.x + rect.width &&
        point.y >= rect.y &&
        point.y <= rect.y + rect.height
    );
}

export function isRectsIntersecting(
    rect1: Rect,
    rect2: Rect,
) {
    return (
        rect1.x <= rect2.x + rect2.width &&
        rect1.x + rect1.width >= rect2.x &&
        rect1.y <= rect2.y + rect2.height &&
        rect1.y + rect1.height >= rect2.y
    )
}

export function centerRect(
    parentRect: Rect,
    childRect: Rect,
): Rect {
    return {
        x: parentRect.x + (
            (parentRect.width - childRect.width)
            /
            2
        ),
        y: parentRect.y + (
            (parentRect.height - childRect.height)
            /
            2
        ),
        width: childRect.width,
        height: childRect.height,
    }
}