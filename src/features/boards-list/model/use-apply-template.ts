import { type Node } from "@/features/board";
import { useCreateTemplateBoard } from "./use-create-template-board";
import { templateNodesList } from "@/features/board-templates";

export function useApplyTemplate() {
    const {
        isPending,
        createTemplateBoard,
    } = useCreateTemplateBoard();

    const applyTemplate = (
        boardName: string,
        templateName: string,
    ) => {
        const template = templateNodesList.find(
            (template) => (
                template.name === templateName
            )
        );
        const templateNodes: Node[] =
            template
                ? template.nodes
                : []
        createTemplateBoard(
            boardName,
            templateNodes,
        );
    };

    return {
        isPending,
        applyTemplate,
    };
};