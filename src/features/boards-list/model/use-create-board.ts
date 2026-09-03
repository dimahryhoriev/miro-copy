import { type Node } from "@/features/board";
import { queryClient } from "@/shared/api/query-client";
import { supabase, useSession } from "@/shared/api/supabase";
import { ROUTES } from "@/shared/model/routes";
import { useMutation } from "@tanstack/react-query";
import { href, useNavigate } from "react-router";

type CreateBoardParams = {
    boardName: string;
    nodes?: Node[]
}

export function useCreateBoard() {
    const navigate = useNavigate();
    const { session } = useSession();

    const createBoardMutation = useMutation({
        mutationFn: async ({
            boardName,
            nodes,
        }: CreateBoardParams) => {
            if (!session?.user?.id) {
                throw new Error('User not authenticated');
            };

            const {
                data,
                error
            } = await supabase
                .from('boards')
                .insert({
                    name: boardName,
                    nodes: nodes ?? [],
                    user_id: session.user.id,
                })
                .select()
                .single()

            if (error) throw error;
            return data;
        },
        onSuccess(data) {
            navigate(
                href(
                    ROUTES.BOARD,
                    {
                        boardId: data?.id,
                    },
                ),
            );
            queryClient.invalidateQueries({
                queryKey: ['boards'],
            });
        },
    });

    return {
        isPending: createBoardMutation.isPending,
        createBoard: (
            boardName: string,
            nodes?: Node[],
        ) => createBoardMutation.mutate({
            boardName,
            nodes,
        }),
    };
}