import { supabase } from "@/shared/api/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteBoard() {
    const queryClient = useQueryClient();
    const deleteBoardMutation = useMutation(
        {
            mutationFn: async (
                boardId: string,
            ) => {
                const {
                    error,
                } = await supabase
                    .from('boards')
                    .delete()
                    .eq('id', boardId)

                if (error) throw error;

                return {
                    error,
                };
            },
            onSettled: async () => {
                await queryClient.invalidateQueries(
                    {
                        queryKey: ['boards'],
                    },
                );
            },
        },
    );

    return {
        deleteBoard: (boardId: string) =>
            deleteBoardMutation.mutate(
                boardId,
            ),
        getIsPending: (boardId: string) =>
            deleteBoardMutation.isPending &&
            deleteBoardMutation?.variables === boardId,
    };
};