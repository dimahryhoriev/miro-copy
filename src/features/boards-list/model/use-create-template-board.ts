import { useCreateBoard } from "./use-create-board";
import { type Node } from "@/features/board";

export function useCreateTemplateBoard() {
    const {
        createBoard,
        isPending,
    } = useCreateBoard();

    return {
        isPending,
        createTemplateBoard: (
            boardName: string,
            templateNodes: Node[],
        ) => {
            createBoard(
                boardName,
                templateNodes,
            );
        },
    };
}