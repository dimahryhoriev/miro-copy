import { diffPoints, type Point, type Rect } from "@/shared/lib/geometry";
import { pointOnScreenToCanvas } from "../../domain/screen-to-canvas";
import { type ViewModelParams } from "../view-model-params";
import { type ViewModel } from "../view-model-type";
import { type WindowPositionModel } from "../../model/window-position";
import { type CanvasRect } from "../../hooks/use-canvas-rect";
import { useRef } from "react";


export function useZoomDecorator({
    windowPositionModel,
    canvasRect,
}: ViewModelParams) {
    const pinchRef = useRef<
        {
            point: Point;
            diff: number;
        }
        |
        null
    >(null);
    const lastPinchEndTime = useRef<
        number
    >(0);

    return (viewModel: ViewModel): ViewModel => ({
        ...viewModel,
        window: {
            ...viewModel.window,
            onMouseWheel: (e) => {
                const scale = e.deltaY > 0 ? 0.9 : 1.1;
                viewModel.window?.onMouseWheel?.(e);
                applyZoom({
                    point: { x: e.clientX, y: e.clientY },
                    scale,
                    windowPositionModel,
                    canvasRect,
                });
            },
            onTouchMove: (e) => {
                if (e.touches.length !== 2) {
                    if (pinchRef.current !== null) {
                        lastPinchEndTime.current = Date.now();
                        pinchRef.current = null;
                    };

                    if (Date.now() - lastPinchEndTime.current > 150) {
                        viewModel.window?.onTouchMove?.(e);
                    };

                    return;
                };

                const t1 = e.touches[0];
                const t2 = e.touches[1];
                const point = {
                    x: (t1.clientX + t2.clientX) / 2,
                    y: (t1.clientY + t2.clientY) / 2,
                };

                const currentDiff = Math.hypot(
                    t1.clientX - t2.clientX,
                    t1.clientY - t2.clientY,
                );

                if (currentDiff < 20) {
                    pinchRef.current = {
                        diff: currentDiff,
                        point,
                    };
                    return;
                };

                if (pinchRef.current) {
                    applyZoom({
                        point: pinchRef.current.point,
                        scale: currentDiff / pinchRef.current.diff,
                        pan: {
                            x: point.x - pinchRef.current.point.x,
                            y: point.y - pinchRef.current.point.y,
                        },
                        windowPositionModel,
                        canvasRect,
                    });
                };

                pinchRef.current = {
                    diff: currentDiff,
                    point,
                };
            },
            onTouchEnd: (e) => {
                if (pinchRef.current !== null) {
                    pinchRef.current = null;
                    lastPinchEndTime.current = Date.now();
                    return;
                };
                if (Date.now() - lastPinchEndTime.current < 150) {
                    return;
                };
                viewModel.window?.onTouchEnd?.(e);
            },
        },
    });
};

export function getZoomToFit(
    parentRect: Rect,
    childRect: Rect,
) {
    if (
        parentRect.width <= 0
        ||
        parentRect.height <= 0
        ||
        childRect.width <= 0
        ||
        childRect.height <= 0
    ) return {
        zoom: 1,
    };

    const ratio = {
        width: parentRect.width / childRect.width,
        height: parentRect.height / childRect.height,
    };

    return {
        fittedZoom: Math.min(ratio.width, ratio.height) * 0.75,
    };
}

export function applyZoom({
    point,
    scale,
    pan,
    windowPositionModel,
    canvasRect,
}: {
    point: Point;
    scale: number;
    pan?: Point;
    windowPositionModel: WindowPositionModel;
    canvasRect: CanvasRect | undefined;
}) {
    if (
        !windowPositionModel.position
        ||
        !canvasRect
    ) return;

    const currentZoom = windowPositionModel.position.zoom;
    const newZoom = currentZoom * scale;
    const clampedZoom = Math.min(Math.max(newZoom, 0.1), 5);

    if (clampedZoom === currentZoom && !pan) return;

    const currentPoint = pointOnScreenToCanvas(
        windowPositionModel.position,
        point,
        canvasRect,
    );
    const newPoint = pointOnScreenToCanvas(
        {
            ...windowPositionModel.position,
            zoom: clampedZoom,
        },
        point,
        canvasRect,
    );
    const diff = diffPoints(
        currentPoint,
        newPoint,
    );

    const panX = pan ? pan.x / clampedZoom : 0;
    const panY = pan ? pan.y / clampedZoom : 0;

    windowPositionModel.setPosition({
        x: windowPositionModel.position.x - diff.x - panX,
        y: windowPositionModel.position.y - diff.y - panY,
        zoom: clampedZoom,
    });
};