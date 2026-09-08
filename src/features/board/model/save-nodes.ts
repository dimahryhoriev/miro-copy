import { supabase } from "@/shared/api/supabase";
import { type Node } from "./nodes";

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