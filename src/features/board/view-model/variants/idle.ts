import type { IdleViewState } from "../../model/view-state";
import type { ViewModel, ViewModelParams } from "../use-view-model";

export function useIdleViewModel({
    nodesModel,
    viewStateModel,
}: ViewModelParams) {
    return (idleState: IdleViewState): ViewModel => ({
        nodes: nodesModel.nodes.map(node => ({
            ...node,
            isSelected: idleState.selectedIds
                .has(node.id),
            onClick: (e) => {
                if (viewStateModel.viewState.type === 'idle') {
                    if (e.ctrlKey || e.shiftKey || e.metaKey) {
                        viewStateModel.selection(
                            [node.id],
                            'toggle',
                        )
                    } else {
                        viewStateModel.selection(
                            [node.id],
                            'replace',
                        )
                    }
                }
            }
        })),
        layout: {
            onKeyDown: (e) => {
                if (e.key === 's') {
                    viewStateModel.goToAddSticker();
                }
            }
        },
        overlay: {
            onClick: () => {
                viewStateModel.selection([], 'replace')
            }
        },
        actions: {
            addSticker: {
                isActive: false,
                onClick: () => {
                    viewStateModel.goToAddSticker();
                }
            },
        },
    })
}