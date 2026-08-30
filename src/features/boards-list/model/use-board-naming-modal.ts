import { createGStore } from "create-gstore";
import { useState } from "react";
import { type Template } from '../../board-templates';


export const useBoardNamingModal =
    createGStore(
        () => {
            const [isOpen, setIsOpen] = useState(false);
            const [template, setTemplate] = useState<Template | null>();
            const open = () => setIsOpen(true);
            const close = () => setIsOpen(false);

            return {
                isOpen,
                open,
                close,
                template,
                setTemplate,
            }
        }
    )