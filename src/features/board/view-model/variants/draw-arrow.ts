import { diffPoints, type Point } from "@/shared/lib/geometry";
import { pointOnScreenToCanvas } from "../../domain/screen-to-canvas";
import { createRelativeBase } from "../decorator/resolve-relative";
import { type ViewModelParams } from "../view-model-params";
import { type ViewModel } from "../view-model-type";
import { goToIdle } from "./idle";

export type DrawArrowViewState = {
    type: 'draw-arrow';
    startPoint: Point;
    endPoint: Point;
    startRelativeTo?: string;
    endRelativeTo?: string;
};

export function useDrawArrowViewModel({
    setViewState,
    nodesModel,
    windowPositionModel,
    canvasRect,
}: ViewModelParams) {
    const addArrow = (
        state: DrawArrowViewState,
        endRelativeTo?: string,
    ) => {
        const relativeBase = createRelativeBase(
            nodesModel.nodes,
        );
        nodesModel.addArrow({
            start: state.startRelativeTo
                ?
                {
                    ...diffPoints(
                        relativeBase[state.startRelativeTo],
                        state.startPoint,
                    ),
                    relativeTo: state.startRelativeTo,
                }
                :
                state.startPoint,
            end: endRelativeTo
                ?
                {
                    ...diffPoints(
                        relativeBase[endRelativeTo],
                        state.endPoint,
                    ),
                    relativeTo: endRelativeTo,
                }
                : state.endPoint,
        });
    };

    return (state: DrawArrowViewState): ViewModel => {
        const newArrow = {
            id: 'drawing-arrow',
            type: 'arrow' as const,
            start: state.startPoint,
            end: state.endPoint,
            noPointerEvents: true,
        };

        const newNodes = [
            ...nodesModel.nodes,
            newArrow,
        ];

        return {
            nodes: newNodes,
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
                onMouseUp: (e) => {
                    const endRelativeTo = document
                        .elementsFromPoint(e.clientX, e.clientY)
                        ?.map((el) => el.closest('[data-id]'))
                        ?.find(Boolean)
                        ?.getAttribute('data-id')
                    console.log(endRelativeTo);

                    addArrow(state, endRelativeTo ?? undefined)
                    setViewState(goToIdle());
                },
                onTouchMove: (e) => {
                    if (e.touches.length !== 1) return;
                    const touch = e.touches[0];

                    const currentPoint
                        = pointOnScreenToCanvas(
                            windowPositionModel.position,
                            {
                                x: touch.clientX,
                                y: touch.clientY,
                            },
                            canvasRect,
                        );
                    setViewState({
                        ...state,
                        endPoint: currentPoint,
                    });
                },
                onTouchEnd: (e) => {
                    if (e.touches.length !== 1) return;
                    const touch = e.touches[0];

                    const endRelativeTo = document
                        .elementsFromPoint(touch.clientX, touch.clientY)
                        ?.map((el) => el.closest('[data-id]'))
                        ?.find(Boolean)
                        ?.getAttribute('data-id')

                    addArrow(state, endRelativeTo ?? undefined)
                    setViewState(goToIdle());
                }
            },
            layout: {
                onKeyDown: (e) => {
                    if (e.key === 'Escape') {
                        setViewState(goToIdle());
                    };
                },
            },
            actions: {
                addArrow: {
                    isActive: true,
                },
            },
        }
    };
};

export function goToDrawArrow(
    startPoint: Point,
    startRelativeTo?: string,
): DrawArrowViewState {
    return {
        type: 'draw-arrow',
        startPoint,
        endPoint: startPoint,
        startRelativeTo,
    };
};