import { type Selection } from "../../../domain/selection";
import { type ViewModelParams } from "../../view-model-params";
import { type ViewModel } from "../../view-model-type";
import { useSelection } from "./use-selection";
import { useDeleteSelected } from "./use-delete-selected";
import { useGoToEditSticker } from "./use-go-to-edit-sticker";
import { useGoToAddSticker } from "./use-go-to-add-sticker";
import { useGoToSelectionWindow } from "./use-go-to-selection-window.ts";
import { useMouseDown } from "./use-mouse-down";
import { useGoToNodesDragging } from "./use-go-to-nodes-dragging.ts";
import { useGoToWindowDragging } from "./use-go-to-window-dragging.ts";
import { goToAddArrow } from "../add-arrow.ts";


export type IdleViewState = {
    type: 'idle';
    selectedIds: Set<string>;
    mouseDown?:
    {
        type: 'overlay';
        x: number;
        y: number;
        isRightClick: boolean;
    }
    |
    {
        type: 'node';
        nodeId: string;
        x: number;
        y: number;
        isRightClick: boolean;
    };
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
    const goToAddSticker = useGoToAddSticker(params);
    const goToSelectionWindow = useGoToSelectionWindow(params);
    const goToNodesDragging = useGoToNodesDragging(params);
    const goToWindowDragging = useGoToWindowDragging(params);
    const mouseDown = useMouseDown(params);
    const selection = useSelection(params);

    return (idleState: IdleViewState): ViewModel => ({
        nodes: nodesModel.nodes.map(node => ({
            ...node,
            isSelected: selection.isSelected(idleState, node.id),
            onMouseDown: (e: React.MouseEvent) => (
                mouseDown.handleNodeMouseDown(
                    idleState,
                    e,
                    node.id,
                )
            ),
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
                )
            },
        })),
        layout: {
            onKeyDown: (e) => {
                if (canvasRef.current) {
                    canvasRef.current.focus();
                };
                deleteSelected.handleKeyDown(idleState, e);
                goToAddSticker.handleKeyDown(e);
            },
        },
        overlay: {
            onMouseDown: (e) => (
                mouseDown.handleOverlayMouseDown(
                    idleState,
                    e,
                )
            ),
            onMouseUp: () => (
                selection.handleOverlayMouseUp(idleState)
            ),
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
                mouseDown.handleWindowMouseUp(idleState);
            },
        },
        actions: {
            addSticker: {
                isActive: false,
                onClick: goToAddSticker.handleActionClick,
            },
            addArrow: {
                isActive: false,
                onClick: () => setViewState(goToAddArrow()),
            },
        },
    })
}

export function goToIdle({
    selectedIds,
}: {
    selectedIds?: Selection;
} = {}): IdleViewState {
    return {
        type: 'idle',
        selectedIds: selectedIds ?? new Set(),
    }
}