import { supabase } from "@/shared/api/supabase";
import { type LoaderFunctionArgs } from "react-router-dom";

export async function boardLoader({
    params
}: LoaderFunctionArgs) {
    if (!params.boardId) {
        throw new Response(
            'Board ID is required',
            {
                status: 400,
            },
        );
    };

    const {
        data,
        error,
    } = await supabase
        .from('boards')
        .select('nodes')
        .eq('id', params.boardId)
        .single()

    if (error) throw new Response(
        'Board not found',
        {
            status: 404,
        },
    );

    return data.nodes ?? [];
}