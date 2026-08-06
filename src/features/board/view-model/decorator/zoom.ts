import { vectorFromPoints } from "../../domain/point";
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

                const mouseDiff = vectorFromPoints(
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