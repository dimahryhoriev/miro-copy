import { type ViewModelParams } from "../../view-model-params";
import { type IdleViewState } from '.';
import { distanceFromPoints } from "@/shared/lib/geometry";
import { pointOnScreenToCanvas } from "../../../domain/screen-to-canvas";
import { goToDrawSelectionWindow } from "../draw-selection-window";

export function useGoToSelectionWindow({
    windowPositionModel,
    setViewState,
    canvasRect,
}: ViewModelParams) {
    const handleWindowMouseMove = (
        idleState: IdleViewState,
        e: MouseEvent,
    ) => {
        if ((e as PointerEvent).pointerType === 'touch') return;
        if (
            idleState.mouseDown
            &&
            idleState.mouseDown.type === 'overlay'
            &&
            !idleState.mouseDown.isRightClick
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
                    goToDrawSelectionWindow({
                        startPoint: idleState.mouseDown,
                        endPoint: currentPoint,
                        initialSelectedIds:
                            e.ctrlKey || e.shiftKey || e.metaKey
                                ? idleState.selectedIds
                                : undefined
                    }),
                );
            };
        };
    };

    const handleWindowTouchMove = (
        idleState: IdleViewState,
        e: TouchEvent,
    ) => {
        if (e.touches.length !== 1) return;

        const touch = e.touches[0];

        if (
            idleState.touchStart
            &&
            idleState.touchStart.type === 'overlay'
        ) {
            const currentPoint = pointOnScreenToCanvas(
                windowPositionModel.position,
                {
                    x: touch.clientX,
                    y: touch.clientY,
                },
                canvasRect,
            );
            if (
                distanceFromPoints(
                    idleState.touchStart,
                    currentPoint,
                )
                >
                5
            ) {
                setViewState(
                    goToDrawSelectionWindow({
                        startPoint: idleState.touchStart,
                        endPoint: currentPoint,
                        initialSelectedIds: undefined
                    }),
                );
            };
        };
    };

    return {
        handleWindowMouseMove,
        handleWindowTouchMove,
    };
};