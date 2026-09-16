import { type Selection } from "../../../domain/selection";
import { type ViewModelParams } from "../../view-model-params.ts";
import { type ViewModel } from "../../view-model-type";
import { useSelection } from "./use-selection";
import { useDeleteSelected } from "./use-delete-selected";
import { useGoToEditSticker } from "./use-go-to-edit-sticker";
import { useMouseDown } from "./use-mouse-down";
import { useGoToNodesDragging } from "./use-go-to-nodes-dragging.ts";
import { useGoToWindowDragging } from "./use-go-to-window-dragging.ts";
import { useGoToSelectionWindow } from "./use-go-to-selection-window.ts";
import { useTouchStart } from "./use-touch-start.ts";


export type BasePointerState =
    {
        type: 'overlay';
        x: number;
        y: number;
    }
    |
    {
        type: 'node';
        nodeId: string;
        x: number;
        y: number
    };

export type IdleViewState = {
    type: 'idle';
    selectedIds: Set<string>;
    mouseDown?: BasePointerState & { isRightClick: boolean };
    touchStart?: BasePointerState;
};

export function useIdleViewModel(
    params: ViewModelParams,
) {
    const {
        nodesModel,
        canvasRef,
        setViewState,
    } = params;

    const deleteSelected = useDeleteSelected(params);
    const goToEditSticker = useGoToEditSticker(params);
    const goToNodesDragging = useGoToNodesDragging(params);
    const goToWindowDragging = useGoToWindowDragging(params);
    const goToSelectionWindow = useGoToSelectionWindow(params);
    const mouseDown = useMouseDown(params);
    const touchStart = useTouchStart(params);
    const selection = useSelection(params);

    return (idleState: IdleViewState): ViewModel => ({
        nodes: nodesModel.nodes.map(node => ({
            ...node,
            isSelected: selection.isSelected(idleState, node.id),
            onMouseDown: (e: React.MouseEvent) => {
                const isModifierPressed = e.shiftKey || e.ctrlKey || e.metaKey;

                return (
                    mouseDown.handleNodeMouseDown(
                        !idleState.selectedIds.has(node.id) && !isModifierPressed
                            ? { ...idleState, selectedIds: new Set() }
                            : idleState,
                        e,
                        node.id,
                    )
                )
            },
            onMouseUp: (e: React.MouseEvent) => {
                if (
                    !mouseDown.getIsStickerMouseDown(
                        idleState,
                        node.id,
                    )
                ) return;

                const clickResult =
                    goToEditSticker.handleNodeClick(
                        idleState,
                        node.id,
                        e,
                    );

                if (clickResult.preventNext) return;
                selection.handleNodeClick(
                    idleState,
                    node.id,
                    e,
                );
            },
            onTouchStart: (e: React.TouchEvent) => {
                if (e.touches.length !== 1) return;

                return (
                    touchStart.handleNodeTouchStart(
                        !idleState.selectedIds.has(node.id)
                            ? { ...idleState, selectedIds: new Set() }
                            : idleState,
                        e,
                        node.id,
                    )
                );
            },
            onTouchEnd: (e: React.TouchEvent) => {
                if (
                    !touchStart.getIsStickerTouchStart(
                        idleState,
                        node.id,
                    )
                ) return;

                const touchResult =
                    goToEditSticker.handleNodeTouch(
                        idleState,
                        node.id,
                        e,
                    );

                if (touchResult.preventNext) return;
                selection.handleNodeTouch(
                    idleState,
                    node.id,
                    e,
                );
            },
        })),
        layout: {
            onKeyDown: (e) => {
                if (canvasRef.current) canvasRef.current.focus();
                deleteSelected.handleKeyDown(idleState, e);
            },
        },
        overlay: {
            onMouseDown: (e) => (
                mouseDown.handleOverlayMouseDown(
                    idleState,
                    e,
                )
            ),
            onMouseUp: () => {
                if (idleState.mouseDown?.type === 'overlay') {
                    setViewState(goToIdle());
                };
            },
            onTouchStart: (e) => (
                touchStart.handleOverlayTouchStart(
                    idleState,
                    e,
                )
            ),
            onTouchEnd: () => {
                if (idleState.mouseDown?.type === 'overlay') {
                    setViewState(goToIdle());
                };
            },
        },
        window: {
            onMouseMove: (e) => {
                goToNodesDragging.handleWindowMouseMove(
                    idleState,
                    e,
                );
                goToSelectionWindow.handleWindowMouseMove(
                    idleState,
                    e,
                );
                goToWindowDragging.handleWindowMouseMove(
                    idleState,
                    e,
                );
            },
            onMouseUp: () => {
                if (
                    idleState.mouseDown?.type === 'overlay'
                    &&
                    !idleState.mouseDown.isRightClick
                ) {
                    setViewState(goToIdle());
                    return;
                };
            },
            onTouchMove: (e) => {
                goToNodesDragging.handleWindowTouchMove(
                    idleState,
                    e,
                );
                goToSelectionWindow.handleWindowTouchMove(
                    idleState,
                    e,
                );
                goToWindowDragging.handleWindowTouchMove(
                    idleState,
                    e,
                );
            }
        },
    });
};

export function goToIdle({
    selectedIds,
}: {
    selectedIds?: Selection;
} = {}): IdleViewState {
    return {
        type: 'idle',
        selectedIds: selectedIds ?? new Set(),
    };
};