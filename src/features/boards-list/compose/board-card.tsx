import { Button } from "@/shared/ui/kit/button";
import { useDeleteBoard } from "../model/use-delete-board";
import { useUpdateFavorite } from "../model/use-update-favorite";
import { BoardsFavoriteToggle } from "../ui/boards-favorite-toggle";
import { BoardsListCard } from "../ui/boards-list-card";
import type { ApiSchemas } from "@/shared/api/schema";

export function BoardCard({
    board,
}: {
    board: ApiSchemas['Board'];
}) {
    const deleteBoard = useDeleteBoard();
    const updateFavorite = useUpdateFavorite();

    return (
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
    )
}