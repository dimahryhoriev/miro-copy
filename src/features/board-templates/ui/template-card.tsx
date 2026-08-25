import { cn } from "@/shared/lib/css";
import { Button } from "@/shared/ui/kit/button";
import { PlusIcon } from "lucide-react";

interface Template {
    id: string;
    name: string;
    description: string;
    thumbnail: string;
}

interface TemplateCardProps {
    template: Template;
    onSelect: (template: Template) => void;
    isModal: boolean;
    className?: string;
}

export function TemplateCard({
    template,
    onSelect,
    isModal,
    className,
}: TemplateCardProps) {
    return (
        <div
            className={
                cn(
                    'group relative rounded-lg border p-4 overflow-hidden',
                    'flex md:flex-col gap-4',
                    isModal
                        ? 'sm:flex-col sm:gap-0.5'
                        : 'sm:flex',
                    'hover:border-primary transition-colors',
                    'cursor-pointer',
                    className,
                )
            }
            onClick={
                () => onSelect(template)
            }
        >
            <div
                className="
                        aspect-video rounded-md bg-gray-100
                        mb-4 overflow-hidden w-40 max-w-40
                    "
            >
                <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="size-full object-contain"
                />
            </div>
            <div>
                <h3 className="font-medium mb-1">
                    {template.name}
                </h3>
                <p className="text-sm text-gray-500">
                    {template.description}
                </p>
            </div>
            <Button
                size='sm'
                className="
                        absolute top-4 right-4
                        opacity-0 group-hover:opacity-100
                        transition-opacity
                    "
            >
                <PlusIcon className="size-4 mr-2" />
                Use
            </Button>
        </div >
    )
}