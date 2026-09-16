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
        if (idleState.mouseDown?.type !== 'overlay') return;
        if (!idleState.mouseDown?.isRightClick) return;

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

    const handleWindowTouchMove = (
        idleState: IdleViewState,
        e: TouchEvent,
    ) => {
        if (e.touches.length !== 1) return;
        if (idleState.touchStart?.type !== 'overlay') return;

        const touch = e.touches[0];

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
                goToWindowDragging({
                    startPoint: idleState.touchStart,
                    endPoint: currentPoint,
                }),
            );
        };
    };

    return {
        handleWindowMouseMove,
        handleWindowTouchMove,
    };
};