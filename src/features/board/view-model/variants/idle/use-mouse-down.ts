import { pointOnScreenToCanvas } from "@/features/board/domain/screen-to-canvas";
import { type IdleViewState } from ".";
import { type ViewModelParams } from "../../view-model-params";

export function useMouseDown({
    windowPositionModel,
    setViewState,
    canvasRect,
}: ViewModelParams) {
    const handleOverlayMouseDown = (
        idleState: IdleViewState,
        e: React.MouseEvent<HTMLDivElement>,
    ) => {
        const point = pointOnScreenToCanvas(
            windowPositionModel.position,
            {
                x: e.clientX,
                y: e.clientY,
            },
            canvasRect,
        );

        setViewState({
            ...idleState,
            mouseDown: {
                type: 'overlay',
                x: point.x,
                y: point.y,
                isRightClick: e.button === 2,
            },
        });
    };

    const getIsStickerMouseDown = (
        idleState: IdleViewState,
        nodeId: string,
    ) => {
        return (
            idleState.mouseDown?.type === 'node'
            &&
            idleState.mouseDown.nodeId === nodeId
        )
    };

    const handleNodeMouseDown = (
        idleState: IdleViewState,
        e: React.MouseEvent<HTMLButtonElement>,
        nodeId: string,
    ) => {
        const point = pointOnScreenToCanvas(
            windowPositionModel.position,
            {
                x: e.clientX,
                y: e.clientY,
            },
            canvasRect,
        );

        setViewState({
            ...idleState,
            mouseDown: {
                type: 'node',
                nodeId: nodeId,
                x: point.x,
                y: point.y,
                isRightClick: e.button === 2,
            }
        })
    }

    const handleWindowMouseUp = (
        idleState: IdleViewState,
    ) => {
        if (idleState.mouseDown) {
            setViewState({
                ...idleState,
                mouseDown: undefined,
            });
        };
    };

    return {
        handleOverlayMouseDown,
        handleWindowMouseUp,
        handleNodeMouseDown,
        getIsStickerMouseDown,
    };
};