import type { ApiSchemas } from "@/shared/api/schema";
import { supabase } from "@/shared/api/supabase";
import {
    useMutation,
    useQueryClient,
    type InfiniteData,
} from "@tanstack/react-query";

export function useUpdateFavorite() {
    const queryClient = useQueryClient();

    const updateFavoriteMutation = useMutation(
        {
            mutationFn: async ({
                boardId,
                isFavorite,
            }: {
                boardId: string;
                isFavorite: boolean;
            }) => {
                const { error } = await supabase
                    .from('boards')
                    .update({ is_favorite: isFavorite })
                    .eq('id', boardId)

                if (error) throw error;
            },
            onMutate: async (newBoard) => {
                await queryClient.cancelQueries({
                    queryKey: ['boards']
                })

                const prevState = queryClient.getQueriesData<
                    ApiSchemas['Board'][]
                >({ queryKey: ['boards'] })

                queryClient.setQueriesData<
                    InfiniteData<
                        {
                            data: ApiSchemas['Board'][]
                        }
                    >
                >(
                    { queryKey: ['boards'] },
                    (prevQuery) => {
                        if (!prevQuery?.pages) return prevQuery;

                        return {
                            ...prevQuery,
                            pages: prevQuery.pages.map((page) => ({
                                ...page,
                                data: page.data.map(
                                    (board) => (
                                        board.id === newBoard.boardId
                                            ? {
                                                ...board,
                                                isFavorite: newBoard.isFavorite,
                                            }
                                            : board
                                    )
                                ),
                            })),
                        };
                    },
                );

                return {
                    prevState,
                };
            },
            onError: (
                _error, __variables, context,
            ) => {
                context?.prevState?.forEach(
                    ([queryKey, data]) => {
                        queryClient.setQueryData(
                            queryKey,
                            data,
                        );
                    },
                );
            },
            onSettled: async () => {
                await queryClient.invalidateQueries({
                    queryKey: ['boards'],
                });
            },
        },
    );

    const toggle = (
        board: { id: string, isFavorite: boolean }
    ) => {
        updateFavoriteMutation.mutate({
            boardId: board.id,
            isFavorite: !board.isFavorite,
        });
    };

    return {
        toggle,
    };
};