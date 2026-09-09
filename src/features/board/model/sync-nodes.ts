import { supabase } from "@/shared/api/supabase";
import { type Node } from "./nodes";

export type NodesUpdater = (prev: Node[]) => Node[];
export type NodesSetter = (nodes: Node[]) => void;

export type NodesSaverParams = {
    boardId: string | undefined,
    nodes: Node[],
};
export type NodesSaver = ({
    boardId,
    nodes,
}: NodesSaverParams) => Promise<void>;

export type SetAndSaveNodesParams = {
    setNodes: NodesSetter;
    updateNodes: NodesUpdater;
    boardId: string | undefined;
    nodes: Node[];
};

export type SetAndSaveNodes = (
    params: SetAndSaveNodesParams
) => void;

export const saveNodes: NodesSaver = async ({
    boardId,
    nodes,
}) => {
    if (!boardId) return;

    const { error } = await supabase
        .from('boards')
        .update({ nodes })
        .eq('id', boardId)

    if (error) throw error;
};

export const setAndSaveNodes: SetAndSaveNodes = ({
    setNodes,
    updateNodes,
    boardId,
    nodes,
}) => {
    if (!boardId) return;

    const newNodes = updateNodes(nodes);
    setNodes(newNodes);
    saveNodes({
        boardId,
        nodes: newNodes,
    });
};

export function debounceNodes(
    delay: number = 500,
) {
    let timeoutId: ReturnType<typeof setTimeout>;

    return ({
        boardId,
        nodes,
    }: NodesSaverParams) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        };

        timeoutId = setTimeout(() => {
            saveNodes({
                boardId,
                nodes,
            });
        }, delay);
    };
};