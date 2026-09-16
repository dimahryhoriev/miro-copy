import { pointOnScreenToCanvas } from "../../domain/screen-to-canvas";
import { type ViewModelParams } from "../view-model-params";
import { type ViewModel } from "../view-model-type";
import { goToDrawSelectionWindow } from "./draw-selection-window";
import { goToIdle } from "./idle";

export type AddSelectionWindowViewState = {
    type: 'add-selection-window';
};

export function useAddSelectionWindowViewModel({
    nodesModel,
    setViewState,
    windowPositionModel,
    canvasRect,
}: ViewModelParams) {
    return (): ViewModel => ({
        nodes: nodesModel.nodes,
        overlay: {
            onMouseDown: (e) => {
                setViewState(
                    goToDrawSelectionWindow({
                        startPoint:
                            pointOnScreenToCanvas(
                                windowPositionModel.position,
                                {
                                    x: e.clientX,
                                    y: e.clientY,
                                },
                                canvasRect,
                            ),
                        initialSelectedIds: new Set(),
                    }),
                )
            },
            onTouchStart: (e) => {
                if (e.touches.length !== 1) return;
                const touch = e.touches[0];

                setViewState(
                    goToDrawSelectionWindow({
                        startPoint:
                            pointOnScreenToCanvas(
                                windowPositionModel.position,
                                {
                                    x: touch.clientX,
                                    y: touch.clientY,
                                },
                                canvasRect,
                            ),
                        initialSelectedIds: new Set(),
                    }),
                )
            },
        },
        actions: {
            toggleSelection: {
                isActive: true,
                onClick: () => {
                    setViewState(goToIdle());
                },
            },
        },
    });
};

export function goToAddSelectionWindow(
): AddSelectionWindowViewState {
    return {
        type: 'add-selection-window',
    };
};