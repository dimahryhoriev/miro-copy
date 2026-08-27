import { distanceFromPoints } from "@/shared/lib/geometry";
import { pointOnScreenToCanvas } from "@/features/board/domain/screen-to-canvas";
import { type IdleViewState } from ".";
import { type ViewModelParams } from "../../view-model-params";
import { goToWindowDragging } from "../window-dragging";

export function useGoToWindowDragging({
    windowPositionModel,
    canvasRect,
    setViewState,
}: ViewModelParams) {
    const handleWindowMouseMove = (
        idleState: IdleViewState,
        e: MouseEvent,
    ) => {
        if (
            idleState.mouseDown
            &&
            idleState.mouseDown.isRightClick
        ) {
            const currentPoint = pointOnScreenToCanvas(
                windowPositionModel.position,
                {
                    x: e.clientX,
                    y: e.clientY,
                },
                canvasRect,
            );
            if (
                distanceFromPoints(
                    idleState.mouseDown,
                    currentPoint,
                )
                >
                5
            ) {
                setViewState(
                    goToWindowDragging({
                        startPoint: idleState.mouseDown,
                        endPoint: currentPoint,
                    }),
                );
            };
        };
    };

    return {
        handleWindowMouseMove,
    };
};