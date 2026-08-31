import { Button } from "@/shared/ui/kit/button";
import { useBoardsList } from "./model/use-boards-list";
import { useBoardsFilters } from "./model/use-boards-filters";
import { useDebouncedValue } from "@/shared/lib/react";
import { useCreateBoard } from "./model/use-create-board";
import { PlusIcon } from "lucide-react";
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
import { BoardItem } from "./compose/board-item";
import { BoardCard } from "./compose/board-card";
import { BoardsSidebar } from "./ui/boards-sidebar";
import {
    TemplatesGallery,
    TemplatesModal,
    useTemplatesModal
} from "@/features/board-templates";
import { useBoardNamingModal } from "./model/use-board-naming-modal";
import { BoardNamingModal } from "./ui/board-naming-modal";

function BoardsListPage() {
    const boardsFilters = useBoardsFilters();
    const boardsQuery = useBoardsList({
        sort: boardsFilters.sort,
        search: useDebouncedValue(boardsFilters.search, 300),
    });

    const boardNamingModal = useBoardNamingModal();
    const templatesModal = useTemplatesModal();

    const createBoard = useCreateBoard();

    const [viewMode, setViewMode] = useState<ViewMode>('list');

    return (
        <>
            <TemplatesModal />
            <BoardNamingModal />
            <BoardsListLayout
                templates={<TemplatesGallery />}
                sidebar={<BoardsSidebar />}
                header={
                    <BoardsListLayoutHeader
                        title='Boards'
                        description='Here you can view and manage your boards'
                        actions={
                            <>
                                <Button
                                    className="flex-1"
                                    variant='outline'
                                    onClick={
                                        () => templatesModal.open()
                                    }
                                >
                                    Choose a template
                                </Button>
                                <Button
                                    className="flex-1"
                                    disabled={createBoard.isPending}
                                    onClick={
                                        () => boardNamingModal.open()
                                    }
                                >
                                    <PlusIcon />
                                    Create board
                                </Button>
                            </>
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
                    isEmpty={boardsQuery.boards.length === 0}
                    isPending={boardsQuery.isPending}
                    isPendingNext={boardsQuery.isFetchingNextPage}
                    cursorRef={boardsQuery.cursorRef}
                    hasCursor={boardsQuery.hasNextPage}
                    mode={viewMode}
                    renderList={() => (
                        boardsQuery.boards.map((board) => (
                            <BoardItem key={board.id} board={board} />
                        ))
                    )}
                    renderGrid={() => (
                        boardsQuery.boards.map((board) => (
                            <BoardCard key={board.id} board={board} />
                        ))
                    )}
                >
                </BoardsListLayoutContent>
            </BoardsListLayout>
        </>
    )
}

export const Component = BoardsListPage;