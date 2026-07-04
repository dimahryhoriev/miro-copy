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
                                <div className="aspect-video rounded-md bg-gray-100">
                                    <img
                                        src={template.thumbnail}
                                        alt={template.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="font-medium mb-1">
                                    {template.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {template.description}
                                </p>
                                <Button
                                    size='sm'
                                    className="absolute top-4 right-4 opacity-0"
                                >
                                    <PlusIcon className="h-4 w-4 mr-2" />
                                    Use
                                </Button>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}