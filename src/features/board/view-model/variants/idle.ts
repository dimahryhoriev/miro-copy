import {
    selectItems,
    type SelectionModifier,
} from "../../domain/selection";
import type { ViewModelParams } from "../view-model-params";
import type { ViewModel } from "../view-model-type";
import { goToAddSticker } from "./add-sticker";

export type IdleViewState = {
    type: 'idle';
    selectedIds: Set<string>;
    mouseDown?: {
        x: number,
        y: number,
    };
};

export function useIdleViewModel({
    nodesModel,
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
    }

    return (idleState: IdleViewState): ViewModel => ({
        selectionWindow: {
            x: 100,
            y: 100,
            width: 1000,
            height: 100,
        },
        nodes: nodesModel.nodes.map(node => ({
            ...node,
            isSelected: idleState.selectedIds
                .has(node.id),
            onClick: (e) => {
                if (e.ctrlKey || e.shiftKey || e.metaKey) {
                    select(
                        idleState,
                        [node.id],
                        'toggle',
                    );
                } else {
                    select(
                        idleState,
                        [node.id],
                        'replace',
                    );
                }
            }
        })),
        layout: {
            onKeyDown: (e) => {
                if (e.key === 's') {
                    setViewState(goToAddSticker());
                }
            }
        },
        overlay: {
            onClick: () => {
                select(idleState, [], 'replace')
            },
            onMouseDown: (e) => {
                console.log('onMouseDown', e);
            },
        },
        window: {
            onMouseMove: (e) => {
                console.log('onMouseMove', e);
            },
            onMouseUp: (e) => {
                console.log('onMouseUp', e);
            },
        },
        actions: {
            addSticker: {
                isActive: false,
                onClick: () => {
                    setViewState(goToAddSticker());
                }
            },
        },
    })
}

export function goToIdle(

): IdleViewState {
    return {
        type: 'idle',
        selectedIds: new Set(),
    }
}