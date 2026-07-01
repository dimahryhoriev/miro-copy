import { useBoardsList } from "./model/use-boards-list";
import {
    BoardsListLayout,
    BoardsListLayoutHeader,
    BoardsListLayoutContent,
    BoardsLayoutContentGroups,
    BoardsListLayoutList,
    BoardsListLayoutCards,
} from "./ui/boards-list-layout";
import { ViewModeToggle, type ViewMode } from "./ui/view-mode-toggle";
import { useState } from "react";
import { useRecentGroups } from "./model/use-recent-groups";
import { BoardItem } from "./compose/board-item";
import { BoardCard } from "./compose/board-card";
import { BoardsSidebar } from "./ui/boards-sidebar";

function BoardsListPage() {
    const boardsQuery = useBoardsList({
        sort: "lastOpenedAt",
    });

    const [viewMode, setViewMode] = useState<ViewMode>('list');

    const recentGroups = useRecentGroups(boardsQuery.boards);

    return (
        <BoardsListLayout
            sidebar={<BoardsSidebar />}
            header={
                <BoardsListLayoutHeader
                    title='Recent boards'
                    description='Here you can view and manage your recent boards'
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
            >
                <BoardsLayoutContentGroups
                    groups={
                        recentGroups.map((group) => ({
                            items: {
                                list: (
                                    <BoardsListLayoutList>
                                        {
                                            group.items
                                                .map(
                                                    (board) => <BoardItem key={board.id} board={board} />
                                                )
                                        }
                                    </BoardsListLayoutList>
                                ),
                                cards: (
                                    <BoardsListLayoutCards>
                                        {
                                            group.items
                                                .map(
                                                    (board) => <BoardCard key={board.id} board={board} />
                                                )
                                        }
                                    </BoardsListLayoutCards>
                                )
                            }[viewMode],
                            title: group.title,
                        }))
                    }
                />
            </BoardsListLayoutContent>
        </BoardsListLayout>
    )
}

export const Component = BoardsListPage;