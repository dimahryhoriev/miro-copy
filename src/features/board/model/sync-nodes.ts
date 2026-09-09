import { supabase } from "@/shared/api/supabase";
import { type Node } from "./nodes";

export type NodesUpdater = (prev: Node[]) => Node[];
export type NodesSetter = (nodes: Node[]) => void;

export type SetAndSaveNodesParams = {
    setNodes: NodesSetter;
    updateNodes: NodesUpdater;
    boardId: string | undefined;
    nodes: Node[];
};

export type SetAndSaveNodes = (
    params: SetAndSaveNodesParams
) => void;

export async function saveNodes({
    boardId,
    nodes,
}: {
    boardId: string | undefined;
    nodes: Node[];
}) {
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