import { pointOnScreenToCanvas } from "../../domain/screen-to-canvas";
import { type ViewModelParams } from "../view-model-params";
import { type ViewModel } from "../view-model-type";
import { goToDrawArrow } from "./draw-arrow";
import { goToIdle } from "./idle";

export type AddArrowViewState = {
    type: 'add-arrow';
};

export function useAddArrowViewModel({
    setViewState,
    nodesModel,
    windowPositionModel,
    canvasRect,
}: ViewModelParams) {
    return (): ViewModel => ({
        nodes: nodesModel.nodes
            .map(
                (node) => {
                    if (node.type === 'sticker') {
                        return {
                            ...node,
                            onMouseDown: (e: React.MouseEvent) => {
                                const point = pointOnScreenToCanvas(
                                    windowPositionModel.position,
                                    {
                                        x: e.clientX,
                                        y: e.clientY,
                                    },
                                    canvasRect,
                                );
                                setViewState(
                                    goToDrawArrow(
                                        point,
                                        node.id,
                                    ),
                                );
                            },
                        };
                    };
                    return node;
                },
            ),
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
                onClick: () => {
                    setViewState(goToIdle());
                },
            },
        },
        overlay: {
            onMouseDown: (e) => (
                setViewState(
                    goToDrawArrow(
                        pointOnScreenToCanvas(
                            windowPositionModel.position,
                            {
                                x: e.clientX,
                                y: e.clientY,
                            },
                            canvasRect,
                        ),
                    ),
                )
            ),
        },
    });
};

export function goToAddArrow(
): AddArrowViewState {
    return {
        type: 'add-arrow',
    };
};