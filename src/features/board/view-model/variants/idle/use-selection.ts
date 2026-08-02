import { type ViewModelParams } from "../../view-model-params";
import { type IdleViewState } from ".";
import {
    selectItems,
    type SelectionModifier,
} from "@/features/board/domain/selection";


export function useSelection({
    setViewState,
}: ViewModelParams) {
    const select = (
        lastState: IdleViewState,
        ids: string[],
        modif: SelectionModifier,
    ) => {
        setViewState({
            ...lastState,
            selectedIds: selectItems(
                lastState.selectedIds,
                ids,
                modif,
            )
        })
    };

    const isSelected = (
        idleState: IdleViewState,
        nodeId: string,
    ) => {
        return idleState.selectedIds.has(nodeId);
    };

    const handleNodeClick = (
        idleState: IdleViewState,
        nodeId: string,
        e: React.MouseEvent<HTMLButtonElement>,
    ) => {
        if (e.ctrlKey || e.shiftKey || e.metaKey) {
            select(
                idleState,
                [nodeId],
                'toggle',
            );
        } else {
            select(
                idleState,
                [nodeId],
                'replace',
            );
        };
    };

    const handleOverlayMouseUp = (
        idleState: IdleViewState,
    ) => {
        if (idleState.mouseDown) {
            setViewState({
                ...idleState,
                selectedIds: selectItems(
                    idleState.selectedIds,
                    [],
                    'replace',
                ),
            });
        };
    };

    return {
        handleNodeClick,
        handleOverlayMouseUp,
        isSelected,
    };
};
