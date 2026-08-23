import { type Node } from "@/features/board";
import { useCreateTemplateBoard } from "./use-create-template-board";
import {
    templateNodesList,
    type Template,
} from "@/features/board-templates";

export function useApplyTemplate() {
    const {
        isPending,
        createTemplateBoard,
    } = useCreateTemplateBoard();

    const applyTemplate = ({
        name,
    }: Template) => {
        const template = templateNodesList.find(
            (template) => (
                template.name === name
            )
        )
        const templateNodes: Node[] =
            template
                ? template.nodes
                : []
        createTemplateBoard(
            templateNodes
        );
    };

    return {
        isPending,
        applyTemplate,
    };
};