import { resolveRelativePoint, type Point } from "@/shared/lib/geometry";
import {
    createRectFromDimensions,
    createRectFromPoints,
    isRectsIntersecting,
    type Rect,
} from "@/shared/lib/geometry";
import { pointOnScreenToCanvas } from "../../domain/screen-to-canvas";
import { selectItems } from "../../domain/selection";
import { createRelativeBase } from "../decorator/resolve-relative";
import { type ViewModelParams } from "../view-model-params";
import { type ViewModel } from "../view-model-type";
import { goToIdle } from "./idle";

export type DrawSelectionWindowViewState = {
    type: 'draw-selection-window';
    startPoint: Point;
    endPoint: Point;
    initialSelectedIds: Set<string>;
};

export function useDrawSelectionWindowViewModel({
    setViewState,
    nodesModel,
    canvasRect,
    nodesDimensions,
    windowPositionModel,
}: ViewModelParams) {
    const getNodes = (
        state: DrawSelectionWindowViewState,
        selectionRect: Rect,
    ) => {
        const relativeBase = createRelativeBase(
            nodesModel.nodes,
        );
        return nodesModel.nodes.map(
            (node) => {
                const nodeDimensions = nodesDimensions[node.id];
                const nodeRect =
                    node.type === 'sticker'
                        ? createRectFromDimensions(
                            node,
                            nodeDimensions,
                        )
                        : createRectFromPoints(
                            resolveRelativePoint(
                                relativeBase,
                                node.start,
                            ),
                            resolveRelativePoint(
                                relativeBase,
                                node.end,
                            ),
                        );
                return {
                    ...node,
                    isSelected:
                        isRectsIntersecting(
                            nodeRect,
                            selectionRect,
                        )
                        ||
                        state.initialSelectedIds.has(
                            node.id,
                        )
                };
            },
        );
    };

    return (
        state: DrawSelectionWindowViewState,
    ): ViewModel => {
        const rect = createRectFromPoints(
            state.startPoint,
            state.endPoint,
        );
        const nodes = getNodes(state, rect);

        return {
            selectionWindow: rect,
            nodes: nodes,
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
                    const nodesIdsInRect
                        = nodes
                            .filter(
                                node => node.isSelected
                            ).map(
                                node => node.id
                            );
                    setViewState(
                        goToIdle({
                            selectedIds: selectItems(
                                state.initialSelectedIds,
                                nodesIdsInRect,
                                'add',
                            ),
                        })
                    );
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
                onTouchEnd: () => {
                    const nodesIdsInRect
                        = nodes
                            .filter(
                                node => node.isSelected
                            ).map(
                                node => node.id
                            );
                    setViewState(
                        goToIdle({
                            selectedIds: selectItems(
                                state.initialSelectedIds,
                                nodesIdsInRect,
                                'add',
                            ),
                        })
                    );
                },
            },
        };
    };
};

export function goToDrawSelectionWindow({
    startPoint,
    endPoint,
    initialSelectedIds,
}: {
    startPoint: Point;
    endPoint?: Point;
    initialSelectedIds?: Set<string>;
}): DrawSelectionWindowViewState {
    return {
        type: 'draw-selection-window',
        startPoint,
        endPoint: endPoint ?? startPoint,
        initialSelectedIds:
            initialSelectedIds ?? new Set(),
    };
};