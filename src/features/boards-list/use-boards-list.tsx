import { rqClient } from "@/shared/api/instance";
import { useEffect } from "react";

type useBoardsListParams = {
    limit?: number;
    isFavorite?: boolean;
    search?: string;
    sort?: 'createdAt' | 'updatedAt' | 'lastOpenedAt' | 'name';
}

export function useBoardsList({
    limit = 20,
    isFavorite,
    search,
    sort,
}: useBoardsListParams) {
    const boardsListQuery =
        rqClient
            .useInfiniteQuery(
                'get',
                '/boards',
                {
                    params: {
                        query: {
                            page: 1,
                            limit,
                            isFavorite,
                            search,
                            sort,
                        },
                    },
                },
                {
                    initialPageParam: 1,
                    pageParamName: 'page',
                    getNextPageParam: (lastPage, _, lastPageParams) =>
                        Number(lastPageParams) < lastPage.totalPages
                            ? Number(lastPageParams) + 1
                            : null
                },
            );

    useEffect(() => {
        setTimeout(() => {
            boardsListQuery.fetchNextPage();
        }, 1000)
    }, [])
    console.log(boardsListQuery.data);
}