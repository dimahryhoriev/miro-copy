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
    const touchesDiffRef = useRef<number | null>(null);

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
                viewModel.window?.onTouchMove?.(e);

                if (e.touches.length !== 2) {
                    touchesDiffRef.current = null;
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

                if (touchesDiffRef.current !== null) {
                    applyZoom({
                        point,
                        scale: currentDiff / touchesDiffRef.current,
                        windowPositionModel,
                        canvasRect,
                    });
                };

                touchesDiffRef.current = currentDiff;
            },
            onTouchEnd: (e) => {
                viewModel.window?.onTouchEnd?.(e);
                if (e.touches.length !== 2) {
                    touchesDiffRef.current = null;
                    return;
                };
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
    windowPositionModel,
    canvasRect,
}: {
    point: Point;
    scale: number;
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

    const currentPoint = pointOnScreenToCanvas(
        windowPositionModel.position,
        point,
        canvasRect,
    );
    const newPoint = pointOnScreenToCanvas(
        {
            ...windowPositionModel.position,
            zoom: newZoom,
        },
        point,
        canvasRect,
    );
    const diff = diffPoints(
        currentPoint,
        newPoint,
    );

    windowPositionModel.setPosition({
        x: windowPositionModel.position.x - diff.x,
        y: windowPositionModel.position.y - diff.y,
        zoom: newZoom,
    });
};