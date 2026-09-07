import { supabase } from "@/shared/api/supabase";
import {
    keepPreviousData,
    useInfiniteQuery,
} from "@tanstack/react-query";
import {
    useCallback,
    type RefCallback,
} from "react";

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
    const {
        fetchNextPage,
        data,
        isFetchingNextPage,
        isPending,
        hasNextPage,
    } = useInfiniteQuery({
        queryFn: async ({
            pageParam
        }) => {
            const from = (pageParam - 1) * limit;
            const to = from + limit - 1;

            let query = supabase
                .from('boards')
                .select(
                    '*',
                    {
                        count: 'exact',
                    },
                )

            if (search) {
                query = query.ilike(
                    'name',
                    `%${search}%`
                );
            };

            const sortConfig = {
                createdAt: { column: 'created_at', ascending: false },
                updatedAt: { column: 'updated_at', ascending: false },
                lastOpenedAt: { column: 'last_opened_at', ascending: false },
                name: { column: 'name', ascending: true },
            };

            if (sort) {
                const { column, ascending } = sortConfig[sort];
                query = query.order(
                    column,
                    {
                        ascending
                    },
                )
            } else {
                query = query.order(
                    'created_at',
                    {
                        ascending: false
                    },
                )
            }

            if (isFavorite) {
                query = query.eq(
                    'is_favorite',
                    true,
                );
            };

            const {
                data: unformattedData,
                error,
                count,
            } = await query.range(
                from,
                to,
            );

            if (error) throw error;

            const data = unformattedData.map(
                (item) => ({
                    ...item,
                    createdAt: item.created_at,
                    updatedAt: item.updated_at,
                    lastOpenedAt: item.last_opened_at,
                })
            ) ?? [];

            const totalPages = Math.ceil(
                (count ?? 0)
                /
                limit
            );

            return {
                data,
                error,
                count,
                totalPages,
            };
        },
        queryKey: [
            'boards',
            {
                isFavorite,
                search,
                sort,
            },
        ],
        initialPageParam: 1,
        getNextPageParam: (lastPage, _, lastPageParams) =>
            Number(lastPageParams) < lastPage.totalPages
                ? Number(lastPageParams) + 1
                : undefined,
        placeholderData: keepPreviousData,
    });

    const cursorRef: RefCallback<HTMLDivElement> = useCallback((el) => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0].isIntersecting
                    &&
                    hasNextPage
                    &&
                    !isFetchingNextPage
                ) {
                    fetchNextPage();
                }
            },
            { threshold: 0.5 },
        );

        if (el) {
            observer.observe(el)

            return () => {
                observer.disconnect();
            }
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    const boards = data?.pages.flatMap((page) => page.data) ?? [];

    return {
        isPending,
        isFetchingNextPage,
        hasNextPage,
        boards,
        cursorRef,
    };
}