import { ScrollArea } from "@/shared/ui/kit/scroll-area";
import { TemplateCard } from './template-card'
import { useTemplatesModal } from "../hooks/use-templates-modal";
import { cn } from "@/shared/lib/css";
import { useBoardNamingModal } from "@/features/boards-list";

export type Template = {
    id: string;
    name: string;
    description: string;
    thumbnail: string;
};

const templates: Template[] = [
    {
        id: '1',
        name: 'Kanban Framework',
        description: 'Manage tasks and agile workflows visually',
        thumbnail: '/images/templates/kanban-framework.svg'
    },
    {
        id: '2',
        name: 'Brainstorming',
        description: 'Capture ideas and structure complex thoughts',
        thumbnail: '/images/templates/brainstorming.svg'
    },
    {
        id: '3',
        name: 'Flowchart',
        description: 'Map out system processes, user flows, and diagrams',
        thumbnail: '/images/templates/flowchart.svg'
    },
    {
        id: '4',
        name: 'Retro',
        description: 'Reflect on team perfomance and plan improvements',
        thumbnail: '/images/templates/retro.svg'
    },
]

export function TemplatesGallery({
    className,
    isModal = false,
}: {
    className?: string;
    isModal?: boolean;
}) {
    const { isOpen } = useTemplatesModal();
    const boardNamingModal = useBoardNamingModal();

    return (
        <ScrollArea className={className}>
            <div className={
                cn(
                    isOpen === true && isModal
                        ? 'grid grid-cols-1 sm:grid-cols-2 gap-4'
                        : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'
                )
            }
            >
                {templates.map((template) => (
                    <TemplateCard
                        key={template.id}
                        template={template}
                        isModal={isModal}
                        onSelect={
                            () => {
                                boardNamingModal.setTemplate(template)
                                boardNamingModal.open()
                            }
                        }
                    />
                ))}
            </div>
        </ScrollArea>
    )
}