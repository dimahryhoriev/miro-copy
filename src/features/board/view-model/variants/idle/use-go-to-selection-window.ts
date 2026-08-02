import { type ViewModelParams } from "../../view-model-params";
import { type IdleViewState } from '.';
import { distanceFromPoints } from "../../../domain/point";
import { pointOnScreenToCanvas } from "../../../domain/screen-to-canvas";
import { goToSelectionWindow } from "../selection-window";

export function useGoToSelectionWindow({
    setViewState,
    canvasRect,
}: ViewModelParams) {
    const handleWindowMouseMove = (
        idleState: IdleViewState,
        e: MouseEvent,
    ) => {
        if (idleState.mouseDown) {
            const currentPoint = pointOnScreenToCanvas(
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
                    goToSelectionWindow({
                        startPoint: idleState.mouseDown,
                        endPoint: currentPoint,
                        initialSelectedIds:
                            e.shiftKey
                                ? idleState.selectedIds
                                : undefined
                    }),
                );
            };
        };
    };

    return {
        handleWindowMouseMove,
    };
};