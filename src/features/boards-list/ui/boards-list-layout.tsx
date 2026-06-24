import { Skeleton } from "@/shared/ui/kit/skeleton";
import type { ViewMode } from "./view-mode-toggle";

export function BoardsListLayout({
    header,
    filters,
    children,
}: {
    header: React.ReactNode;
    filters?: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <div className="container mx-auto p-4 flex flex-col gap-6">
            {header}
            {filters}
            {children}
        </div>
    )
}

export function BoardsListLayoutHeader({
    title,
    description,
    actions,
}: {
    title: string;
    description?: string;
    actions?: React.ReactNode;
}) {
    return (
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold">{title}</h1>
                {description && <p className="text-gray-500">{description}</p>}
            </div>

            {actions}
        </div>
    )
}

export function BoardsListLayoutFilters({
    sort,
    filters,
    actions,
}: {
    sort?: React.ReactNode;
    filters?: React.ReactNode;
    actions?: React.ReactNode;
}) {
    return (
        <div className="flex items-center gap-4">
            {filters && (
                <div className="flex items-center gap-2">
                    <div className="text-sm text-gray-500">Filter by</div>
                    {filters}
                </div>
            )}
            {sort && (
                <div className="flex items-center gap-2">
                    <div className="text-sm text-gray-500">Sort by</div>
                    {sort}
                </div>
            )}
            {actions && <div className="ml-auto">{actions}</div>}
        </div>
    );
}

export function BoardsListLayoutContent({
    children,
    isEmpty,
    isPending,
    isPendingNext,
    cursorRef,
    hasCursor,
    mode,
    renderList,
    renderGrid,
}: {
    children?: React.ReactNode;
    isEmpty?: boolean;
    isPending?: boolean;
    isPendingNext?: boolean;
    cursorRef?: React.Ref<HTMLDivElement>;
    hasCursor?: boolean;
    mode: ViewMode;
    renderList: () => React.ReactNode;
    renderGrid: () => React.ReactNode;
}) {
    return (
        <div>
            {isPending && <div className="text-center py-10">Loading...</div>}

            {mode === 'list' && (
                <div className="flex flex-col gap-2">
                    {renderList()}
                </div>
            )}

            {mode === 'cards' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {renderGrid()}
                </div>
            )}

            {!isPending && children}

            {isEmpty && !isPending && (
                <div className="text-center py-10">No boards found</div>
            )}

            {hasCursor && (
                <div ref={cursorRef} className="text-center py-8">
                    {isPendingNext &&
                        {
                            list: (
                                <div className="flex flex-col gap-2">
                                    <Skeleton className="h-10 w-full" />
                                    <Skeleton className="h-10 w-full" />
                                </div>
                            ),
                            cards: (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <Skeleton className="h-40 w-full" />
                                    <Skeleton className="h-40 w-full" />
                                    <Skeleton className="h-40 w-full" />
                                </div>
                            ),
                        }[mode]}
                </div>
            )}
        </div>
    )
}