import { type Node } from "@/features/board";

type TemplateNodes = {
    relativeTo: string;
    nodes: Node[];
};

export const templateNodesList: TemplateNodes[] = [
    {
        relativeTo: 'Kanban Framework',
        nodes: [
            {
                id: 'kb-1',
                type: 'sticker',
                text: '📋 TO DO',
                x: 100,
                y: 100,
            },
            {
                id: 'kb-2',
                type: 'sticker',
                text: 'Plan project budget & resources',
                x: 100,
                y: 240,
            },
            {
                id: 'kb-3',
                type: 'sticker',
                text: 'Gather client feedback & requirements',
                x: 100,
                y: 380,
            },
            {
                id: 'kb-4',
                type: 'sticker',
                text: '⚡ IN PROGRESS',
                x: 340,
                y: 100,
            },
            {
                id: 'kb-5',
                type: 'sticker',
                text: 'Prepare presentation for stakeholders',
                x: 340,
                y: 240,
            },
            {
                id: 'kb-6',
                type: 'sticker',
                text: 'Review draft designs and copy',
                x: 340,
                y: 380,
            },
            {
                id: 'kb-7',
                type: 'sticker',
                text: '✅ DONE',
                x: 580,
                y: 100,
            },
            {
                id: 'kb-8',
                type: 'sticker',
                text: 'Initial team kickoff meeting',
                x: 580,
                y: 240,
            },
            {
                id: 'kb-9',
                type: 'sticker',
                text: 'Sign contract and agreement',
                x: 580,
                y: 380,
            },
        ],
    },
    {
        relativeTo: 'Brainstorming',
        nodes: [
            {
                id: 'bs-1',
                type: 'sticker',
                text: '🎯 Main Goal / Central Idea',
                x: 340,
                y: 240,
            },
            {
                id: 'bs-2',
                type: 'sticker',
                text: '💡 Target audience & key demographics',
                x: 100,
                y: 100,
            },
            {
                id: 'bs-3',
                type: 'sticker',
                text: '💡 Marketing channels & social media launch',
                x: 580,
                y: 100,
            },
            {
                id: 'bs-4',
                type: 'sticker',
                text: '💡 Potential risks and alternative plans',
                x: 100,
                y: 380,
            },
            {
                id: 'bs-5',
                type: 'sticker',
                text: '💡 Key performance metrics & success indicators',
                x: 580,
                y: 380,
            },
        ],
    },
    {
        relativeTo: 'Flowchart',
        nodes: [
            {
                id: 'fc-1',
                type: 'sticker',
                text: '🟢 Start: Identify need or problem',
                x: 100,
                y: 200,
            },
            {
                id: 'fc-2',
                type: 'sticker',
                text: '⚙️ Step 1: Research options & gather data',
                x: 340,
                y: 200,
            },
            {
                id: 'fc-3',
                type: 'sticker',
                text: '🔍 Decision: Is the proposal approved?',
                x: 580,
                y: 200,
            },
            {
                id: 'fc-4',
                type: 'sticker',
                text: '🎯 Step 2: Execute plan & deliver results',
                x: 820,
                y: 200,
            },
            {
                id: 'fc-5',
                type: 'sticker',
                text: '🏁 End: Measure outcome & celebrate',
                x: 1060,
                y: 200,
            },
        ],
    },
    {
        relativeTo: 'Retro',
        nodes: [
            {
                id: 'rt-1',
                type: 'sticker',
                text: '🎉 What went well?',
                x: 100,
                y: 100,
            },
            {
                id: 'rt-2',
                type: 'sticker',
                text: 'Clear communication and smooth teamwork',
                x: 100,
                y: 240,
            },
            {
                id: 'rt-3',
                type: 'sticker',
                text: 'Delivered all main goals on schedule',
                x: 100,
                y: 380,
            },
            {
                id: 'rt-4',
                type: 'sticker',
                text: '🤔 What can be improved?',
                x: 340,
                y: 100,
            },
            {
                id: 'rt-5',
                type: 'sticker',
                text: 'Better time estimation for unexpected tasks',
                x: 340,
                y: 240,
            },
            {
                id: 'rt-6',
                type: 'sticker',
                text: 'Reduce unnecessary meetings and syncs',
                x: 340,
                y: 380,
            },
            {
                id: 'rt-7',
                type: 'sticker',
                text: '🎯 Action items',
                x: 580,
                y: 100,
            },
            {
                id: 'rt-8',
                type: 'sticker',
                text: 'Set up weekly progress check-ins',
                x: 580,
                y: 240,
            },
            {
                id: 'rt-9',
                type: 'sticker',
                text: 'Create a shared folder for project assets',
                x: 580,
                y: 380,
            },
        ],
    },
]