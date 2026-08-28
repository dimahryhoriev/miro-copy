import { diffPoints, type Rect } from "@/shared/lib/geometry";
import { pointOnScreenToCanvas } from "../../domain/screen-to-canvas";
import { type ViewModelParams } from "../view-model-params";
import { type ViewModel } from "../view-model-type";

export function useZoomDecorator({
    windowPositionModel,
    canvasRect,
}: ViewModelParams) {
    return (viewModel: ViewModel): ViewModel => ({
        ...viewModel,
        window: {
            ...viewModel.window,
            onMouseWheel: (e) => {
                if (
                    !windowPositionModel.position
                    ||
                    !canvasRect
                ) return;

                viewModel.window?.onMouseWheel?.(e);

                const scale = e.deltaY > 0 ? 0.9 : 1.1;
                const currentPoint = pointOnScreenToCanvas(
                    windowPositionModel.position,
                    {
                        x: e.clientX,
                        y: e.clientY,
                    },
                    canvasRect,
                );

                const newZoom
                    = windowPositionModel.position.zoom
                    * scale

                const newPoint = pointOnScreenToCanvas(
                    {
                        ...windowPositionModel.position,
                        zoom: newZoom,
                    },
                    {
                        x: e.clientX,
                        y: e.clientY,
                    },
                    canvasRect,
                );

                const mouseDiff = diffPoints(
                    currentPoint,
                    newPoint,
                );

                windowPositionModel.setPosition({
                    x: windowPositionModel.position.x - mouseDiff.x,
                    y: windowPositionModel.position.y - mouseDiff.y,
                    zoom: newZoom,
                });
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