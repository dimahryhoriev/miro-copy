import { ROUTES } from "@/shared/model/routes";
import { Button } from "@/shared/ui/kit/button";
import { Card, CardFooter, CardHeader } from "@/shared/ui/kit/card";
import { Link, href } from "react-router-dom";
import { Switch } from "@/shared/ui/kit/switch";
import { useBoardsList } from "./model/use-boards-list";
import { useBoardsFilters } from "./model/use-boards-filters";
import { useDebouncedValue } from "@/shared/lib/react";
import { useCreateBoard } from "./model/use-create-board";
import { useDeleteBoard } from "./model/use-delete-board";
import { useUpdateFavorite } from "./model/use-update-favorite";
import { StarIcon, PlusIcon } from "lucide-react";
import {
    BoardsListLayout,
    BoardsListLayoutFilters,
    BoardsListLayoutHeader,
    BoardsListLayoutContent,
} from "./ui/boards-list-layout";
import { ViewModeToggle, type ViewMode } from "./ui/view-mode-toggle";
import { useState } from "react";
import { BoardsSortSelect } from "./ui/boards-sort-select";
import { BoardsSearchInput } from "./ui/boards-search-input";

function BoardsListPage() {
    const boardsFilters = useBoardsFilters();
    const boardsQuery = useBoardsList({
        sort: boardsFilters.sort,
        search: useDebouncedValue(boardsFilters.search, 300),
    });

    const createBoard = useCreateBoard();
    const deleteBoard = useDeleteBoard();
    const updateFavorite = useUpdateFavorite();

    const [viewMode, setViewMode] = useState<ViewMode>('list');

    return (
        <BoardsListLayout
            header={
                <BoardsListLayoutHeader
                    title='Boards'
                    description='Here you can view and manage your boards'
                    actions={
                        <Button
                            disabled={createBoard.isPending}
                            onClick={createBoard.createBoard}
                        >
                            <PlusIcon />
                            Create board
                        </Button>
                    }
                />
            }
            filters={
                <BoardsListLayoutFilters
                    sort={
                        <BoardsSortSelect
                            value={boardsFilters.sort}
                            onValueChange={boardsFilters.setSort}
                        />
                    }
                    filters={
                        <BoardsSearchInput
                            value={boardsFilters.search}
                            onChange={boardsFilters.setSearch}
                        />
                    }
                    actions={
                        <ViewModeToggle
                            value={viewMode}
                            onChange={(value) => setViewMode(value)}
                        />
                    }
                />
            }
        >
            <BoardsListLayoutContent
                isPending={boardsQuery.isPending}
                isEmpty={boardsQuery.boards.length === 0}
                hasCursor={boardsQuery.hasNextPage}
                isPendingNext={boardsQuery.isFetchingNextPage}
            >

            </BoardsListLayoutContent>
            {boardsQuery.isPending ? (
                <div className="text-center py-10">Loading...</div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {boardsQuery.boards.map((board) => (
                            <Card key={board.id} className="relative">
                                <div className="absolute top-2 right-2 flex items-center gap-2">
                                    <span className="text-sm text-gray-500">
                                        <StarIcon />
                                    </span>
                                    <Switch
                                        checked={updateFavorite.isOptimisticFavorite(board)}
                                        onCheckedChange={() => updateFavorite.toggle(board)}
                                    />
                                </div>
                                <CardHeader>
                                    <div className="flex flex-col gap-2">
                                        <Button
                                            asChild
                                            variant="link"
                                            className="text-left justify-start h-auto p-0"
                                        >
                                            <Link to={href(ROUTES.BOARD, { boardId: board.id })}>
                                                <span className="text-xl font-medium">
                                                    {board.name}
                                                </span>
                                            </Link>
                                        </Button>
                                        <div className="text-sm text-gray-500">
                                            Created: {new Date(board.createdAt).toLocaleDateString()}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            Last opened:{" "}
                                            {new Date(board.lastOpenedAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardFooter>
                                    <Button
                                        variant="destructive"
                                        disabled={deleteBoard.getIsPending(board.id)}
                                        onClick={() =>
                                            deleteBoard.deleteBoard(board.id)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    {boardsQuery.boards.length === 0 && !boardsQuery.isPending && (
                        <div className="text-center py-10">No boards found</div>
                    )}

                    {boardsQuery.hasNextPage && (
                        <div ref={(el) => boardsQuery.cursorRef(el)} className="text-center py-8">
                            {boardsQuery.isFetchingNextPage && "Loading more boards..."}
                        </div>
                    )}
                </>
            )}
        </BoardsListLayout>
    )
}

export const Component = BoardsListPage;