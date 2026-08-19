import { ScrollArea } from "@/shared/ui/kit/scroll-area";
import { TemplateCard } from './template-card'

const templates = [
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
    className
}: {
    className?: string;
}) {
    return (
        <ScrollArea className={className}>
            <div className="grid grid-cols-4 gap-4">
                {templates.map((template) => (
                    <TemplateCard
                        key={template.id}
                        template={template}
                        onSelect={() => { }}
                    />
                ))}
            </div>
        </ScrollArea>
    )
}