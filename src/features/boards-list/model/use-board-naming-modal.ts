import { createGStore } from "create-gstore";
import { useState } from "react";

export const useBoardNamingModal =
    createGStore(
        () => {
            const [isOpen, setIsOpen] = useState(false);
            const open = () => setIsOpen(true);
            const close = () => setIsOpen(false);

            return {
                isOpen,
                open,
                close,
            }
        }
    )