import { rqClient } from "@/shared/api/instance";
import { useQueryClient, type InfiniteData } from "@tanstack/react-query";
import type { ApiSchemas } from "@/shared/api/schema";

export function useUpdateFavorite() {
    const queryClient = useQueryClient();

    const updateFavoriteMutation = rqClient.useMutation(
        'put',
        '/boards/{boardId}/favorite',
        {
            onMutate: async ({ params, body }) => {
                await queryClient.cancelQueries(
                    rqClient.queryOptions('get', '/boards'),
                );

                queryClient.setQueriesData(
                    rqClient.queryOptions('get', '/boards'),
                    (data: InfiniteData<ApiSchemas['BoardsList']>) => {
                        console.log(data);
                        return {
                            ...data,
                            pages: data.pages.map((page) => ({
                                ...page,
                                list: page.list.map((board) =>
                                    board.id === params.path.boardId
                                        ? { ...board, isFavorite: body.isFavorite }
                                        : board
                                )
                            }))
                        };
                    },
                );
            },
            onSettled: async () => {
                await queryClient.invalidateQueries(
                    rqClient.queryOptions('get', '/boards'),
                );
            },
        },
    );

    const toggle = (
        board: { id: string, isFavorite: boolean }
    ) =>
        updateFavoriteMutation.mutate({
            params: {
                path: {
                    boardId: board.id,
                },
            },
            body: {
                isFavorite: !board.isFavorite,
            },
        });

    return {
        toggle,
    };
};