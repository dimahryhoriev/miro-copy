import { useState } from "react";

export function useTemplatesModal() {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = async (templateId: string) => {
        await createBoard.createBoard(templateId);
        setIsOpen(false);
    }

    return {
        isOpen,
        onOpen: () => setIsOpen(true),
        onClose: () => setIsOpen(false),
        onSelect: handleSelect,
        templates: templates.data ?? [],
        isLoading: templates.isLoading,
    }
}