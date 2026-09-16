import { pointOnScreenToCanvas } from "@/features/board/domain/screen-to-canvas";
import { type IdleViewState } from ".";
import { type ViewModelParams } from "../../view-model-params";

export function useTouchStart({
    windowPositionModel,
    setViewState,
    canvasRect,
}: ViewModelParams) {
    const handleOverlayTouchStart = (
        idleState: IdleViewState,
        e: React.TouchEvent<HTMLDivElement>,
    ) => {
        if (e.touches.length !== 1) return;

        const touch = e.touches[0];
        const point = pointOnScreenToCanvas(
            windowPositionModel.position,
            {
                x: touch.clientX,
                y: touch.clientY,
            },
            canvasRect,
        );

        setViewState({
            ...idleState,
            touchStart: {
                type: 'overlay',
                x: point.x,
                y: point.y,
            },
        });
    };

    const getIsStickerTouchStart = (
        idleState: IdleViewState,
        nodeId: string,
    ) => {
        return (
            idleState.touchStart?.type === 'node'
            &&
            idleState.touchStart.nodeId === nodeId
        );
    };

    const handleNodeTouchStart = (
        idleState: IdleViewState,
        e: React.TouchEvent,
        nodeId: string,
    ) => {
        if (e.touches.length !== 1) return;

        const touch = e.touches[0];
        const point = pointOnScreenToCanvas(
            windowPositionModel.position,
            {
                x: touch.clientX,
                y: touch.clientY,
            },
            canvasRect,
        );

        setViewState({
            ...idleState,
            touchStart: {
                type: 'node',
                nodeId: nodeId,
                x: point.x,
                y: point.y,
            },
        });
    };

    const handleWindowTouchEnd = (
        idleState: IdleViewState,
    ) => {
        if (idleState.touchStart) {
            setViewState({
                ...idleState,
                touchStart: undefined,
            });
        };
    };

    return {
        handleOverlayTouchStart,
        handleWindowTouchEnd,
        handleNodeTouchStart,
        getIsStickerTouchStart,
    };
};