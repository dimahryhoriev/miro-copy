import { diffPoints, type Point } from "@/shared/lib/geometry";
import { pointOnScreenToCanvas } from "../../domain/screen-to-canvas";
import { type ViewModelParams } from "../view-model-params";
import { type ViewModel } from "../view-model-type";
import { goToIdle } from "./idle";

export type WindowDraggingViewState = {
    type: 'window-dragging';
    startPoint: Point;
    endPoint: Point;
};

export function useWindowDraggingViewModel({
    setViewState,
    nodesModel,
    canvasRect,
    windowPositionModel,
}: ViewModelParams) {
    return (
        state: WindowDraggingViewState,
    ): ViewModel => {
        const diff = diffPoints(
            state.startPoint,
            state.endPoint,
        );
        return {
            nodes: nodesModel.nodes,
            windowPosition: {
                x: (windowPositionModel.position?.x ?? 0) - diff.x,
                y: (windowPositionModel.position?.y ?? 0) - diff.y,
                zoom: windowPositionModel.position?.zoom ?? 1,
            },
            window: {
                onMouseMove: (e) => {
                    const currentPoint
                        = pointOnScreenToCanvas(
                            windowPositionModel.position,
                            {
                                x: e.clientX,
                                y: e.clientY,
                            },
                            canvasRect,
                        );
                    setViewState({
                        ...state,
                        endPoint: currentPoint,
                    });
                },
                onMouseUp: () => {
                    windowPositionModel.setPosition({
                        x: (windowPositionModel.position?.x ?? 0) - diff.x,
                        y: (windowPositionModel.position?.y ?? 0) - diff.y,
                        zoom: windowPositionModel.position?.zoom ?? 1,
                    });
                    setViewState(
                        goToIdle({}),
                    );
                },
            },
        };
    };
};


export function goToWindowDragging({
    startPoint,
    endPoint,
}: {
    startPoint: { x: number, y: number },
    endPoint: { x: number, y: number },
}): WindowDraggingViewState {
    return {
        type: 'window-dragging',
        startPoint,
        endPoint,
    };
};