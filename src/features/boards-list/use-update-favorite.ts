import { rqClient } from "@/shared/api/instance";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function useUpdateFavorite() {
    const queryClient = useQueryClient();

    const [favorite, setFavorite] = useState<Record<string, boolean>>({});

    const updateFavoriteMutation = rqClient.useMutation(
        'put',
        '/boards/{boardId}/favorite',
        {
            onMutate: async ({ params, body }) => {
                setFavorite((prev) => ({
                    ...prev,
                    [params.path.boardId]: body.isFavorite,
                }));
            },

            onSettled: async (data, _, { params }) => {
                await queryClient.invalidateQueries(
                    rqClient.queryOptions('get', '/boards'),
                );
                setFavorite((prev) => ({
                    ...prev,
                    [params.path.boardId]: data?.isFavorite ?? false,
                }));
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

    const isOptimisticFavorite = (board: { id: string, isFavorite: boolean }) =>
        favorite[board.id] ?? board.isFavorite;

    return {
        toggle,
        isOptimisticFavorite,
    };
};