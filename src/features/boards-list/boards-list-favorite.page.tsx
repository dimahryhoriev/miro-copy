import { useBoardsList } from "./model/use-boards-list";
import { useDeleteBoard } from "./model/use-delete-board";
import { useUpdateFavorite } from "./model/use-update-favorite";
import {
    BoardsListLayout,
    BoardsListLayoutHeader,
    BoardsListLayoutContent,
} from "./ui/boards-list-layout";
import { ViewModeToggle, type ViewMode } from "./ui/view-mode-toggle";
import { useState } from "react";
import { BoardsListCard } from "./ui/boards-list-card";
import { Button } from "@/shared/ui/kit/button";
import { BoardsFavoriteToggle } from "./ui/boards-favorite-toggle";

function BoardsListPage() {
    const boardsQuery = useBoardsList({
        isFavorite: true,
    });

    const deleteBoard = useDeleteBoard();
    const updateFavorite = useUpdateFavorite();

    const [viewMode, setViewMode] = useState<ViewMode>('list');

    return (
        <BoardsListLayout
            header={
                <BoardsListLayoutHeader
                    title='Favorite boards'
                    description='Here you can view and manage your favorite boards'
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
                isEmpty={boardsQuery.boards.length === 0}
                isPending={boardsQuery.isPending}
                isPendingNext={boardsQuery.isFetchingNextPage}
                cursorRef={boardsQuery.cursorRef}
                hasCursor={boardsQuery.hasNextPage}
                mode={viewMode}
                renderList={() => (
                    boardsQuery.boards
                        .filter((board) => updateFavorite.isOptimisticFavorite(board))
                        .map((board) => (
                            <BoardsListCard
                                key={board.id}
                                board={board}
                                rightTopActions={
                                    <BoardsFavoriteToggle
                                        isFavorite={updateFavorite.isOptimisticFavorite(board)}
                                        onToggle={() => updateFavorite.toggle(board)}
                                    />
                                }
                                bottomActions={
                                    <Button
                                        variant='destructive'
                                        disabled={deleteBoard.getIsPending(board.id)}
                                        onClick={() => deleteBoard.deleteBoard(board.id)}
                                    >
                                        Delete
                                    </Button>
                                }
                            />
                        ))
                )}
                renderGrid={() => (
                    boardsQuery.boards
                        .filter((board) => updateFavorite.isOptimisticFavorite(board))
                        .map((board) => (
                            <BoardsListCard
                                key={board.id}
                                board={board}
                                rightTopActions={
                                    <BoardsFavoriteToggle
                                        isFavorite={updateFavorite.isOptimisticFavorite(board)}
                                        onToggle={() => updateFavorite.toggle(board)}
                                    />
                                }
                                bottomActions={
                                    <Button
                                        variant='destructive'
                                        disabled={deleteBoard.getIsPending(board.id)}
                                        onClick={() => deleteBoard.deleteBoard(board.id)}
                                    >
                                        Delete
                                    </Button>
                                }
                            />
                        ))
                )}
            >
            </BoardsListLayoutContent>
        </BoardsListLayout>
    )
}

export const Component = BoardsListPage;