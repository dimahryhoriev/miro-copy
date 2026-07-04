import { ScrollArea } from "@/shared/ui/kit/scroll-area";
import { TemplateCard } from './template-card'
import { Skeleton } from "@/shared/ui/kit/skeleton";

interface Template {
    id: string;
    name: string;
    description: string;
    thumbnail: string;
}

interface TemplatesGalleryProps {
    templates: Template[];
    onSelect: (template: Template) => void;
    isLoading?: boolean;
    className?: string;
}

export function TemplatesGallery({
    templates,
    onSelect,
    isLoading,
    className,
}: TemplatesGalleryProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-2 gap-4">
                {Array.from(
                    { length: 4 },
                    (_, index) => (
                        <div key={index} className="space-y-4">
                            <Skeleton className="aspect-video w-full" />
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                    ))
                }
            </div>
        )
    }

    return (
        <ScrollArea className={className}>
            <div className="grid grid-cols-2 gap-4">
                {templates.map((template) => (
                    <TemplateCard
                        key={template.id}
                        template={template}
                        onSelect={onSelect}
                    />
                ))}
            </div>
        </ScrollArea>
    )
}