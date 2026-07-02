import { Button } from "@/shared/ui/kit/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/shared/ui/kit/dialog';
import { ScrollArea } from '@/shared/ui/kit/scroll-area';
import { PlusIcon } from "lucide-react";

interface Template {
    id: string;
    name: string;
    description: string;
    thumbnail: string;
}

interface TemplatesModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (template: Template) => void;
    templates: Template[];
    isLoading?: boolean;
}

export function TemplatesModal({
    isOpen,
    onClose,
    onSelect,
    templates,
    isLoading,
}: TemplatesModalProps) {
    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>
                        Choose a template
                    </DialogTitle>
                    <DialogDescription>
                        Choose a template to create a new board
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[60vh] pr-4">
                    <div className="grid grid-cols-2 gap-4">
                        {templates.map((template) => (
                            <div
                                key={template.id}
                                className="group relative rounded-lg border p-4"
                                onClick={() => onSelect(template)}
                            >

                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}