import { type Node } from "@/features/board";

export type TemplateNodesList = {
    name: string;
    nodes: Node[];
};

export const templateNodesList: TemplateNodesList[] = [
    {
        name: 'Kanban Framework',
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
                y: 200,
            },
            {
                id: 'kb-3',
                type: 'sticker',
                text: 'Gather client feedback & requirements',
                x: 100,
                y: 300,
            },
            {
                id: 'kb-4',
                type: 'sticker',
                text: '⚡ IN PROGRESS',
                x: 450,
                y: 100,
            },
            {
                id: 'kb-5',
                type: 'sticker',
                text: 'Prepare presentation for stakeholders',
                x: 450,
                y: 200,
            },
            {
                id: 'kb-6',
                type: 'sticker',
                text: 'Review draft designs and copy',
                x: 450,
                y: 300,
            },
            {
                id: 'kb-7',
                type: 'sticker',
                text: '✅ DONE',
                x: 800,
                y: 100,
            },
            {
                id: 'kb-8',
                type: 'sticker',
                text: 'Initial team kickoff meeting',
                x: 800,
                y: 200,
            },
            {
                id: 'kb-9',
                type: 'sticker',
                text: 'Sign contract and agreement',
                x: 800,
                y: 300,
            },
        ],
    },
    {
        name: 'Brainstorming',
        nodes: [
            {
                id: 'bs-1',
                type: 'sticker',
                text: '🎯 Main Goal / Central Idea',
                x: 440,
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
                x: 780,
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
                x: 780,
                y: 380,
            },
            {
                id: 'bs-arrow-1',
                type: 'arrow',
                start: {
                    x: 0,
                    y: 20,
                    relativeTo: 'bs-1',
                },
                end: {
                    x: 240,
                    y: 40,
                    relativeTo: 'bs-2',
                },
            },
            {
                id: 'bs-arrow-2',
                type: 'arrow',
                start: {
                    x: 218.73,
                    y: 20,
                    relativeTo: 'bs-1',
                },
                end: {
                    x: 0,
                    y: 40,
                    relativeTo: 'bs-3',
                },
            },
            {
                id: 'bs-arrow-3',
                type: 'arrow',
                start: {
                    x: 0,
                    y: 40,
                    relativeTo: 'bs-1',
                },
                end: {
                    x: 240,
                    y: 20,
                    relativeTo: 'bs-4',
                },
            },
            {
                id: 'bs-arrow-4',
                type: 'arrow',
                start: {
                    x: 218.73,
                    y: 40,
                    relativeTo: 'bs-1',
                },
                end: {
                    x: 0,
                    y: 20,
                    relativeTo: 'bs-5',
                },
            },
        ],
    },
    {
        name: 'Flowchart',
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
                x: 440,
                y: 200,
            },
            {
                id: 'fc-3',
                type: 'sticker',
                text: '🔍 Decision: Is the proposal approved?',
                x: 830,
                y: 200,
            },
            {
                id: 'fc-4',
                type: 'sticker',
                text: '🎯 Step 2: Execute plan & deliver results',
                x: 1195,
                y: 200,
            },
            {
                id: 'fc-5',
                type: 'sticker',
                text: '🏁 End: Measure outcome & celebrate',
                x: 1575,
                y: 200,
            },
            {
                id: 'fc-arrow-1',
                type: 'arrow',
                start: {
                    x: 275,
                    y: 30,
                    relativeTo: 'fc-1',
                },
                end: {
                    x: 0,
                    y: 30,
                    relativeTo: 'fc-2',
                },
            },
            {
                id: 'fc-arrow-2',
                type: 'arrow',
                start: {
                    x: 330,
                    y: 30,
                    relativeTo: 'fc-2',
                },
                end: {
                    x: 0,
                    y: 30,
                    relativeTo: 'fc-3',
                },
            },
            {
                id: 'fc-arrow-3',
                type: 'arrow',
                start: {
                    x: 310,
                    y: 30,
                    relativeTo: 'fc-3',
                },
                end: {
                    x: 0,
                    y: 30,
                    relativeTo: 'fc-4',
                },
            },
            {
                id: 'fc-arrow-4',
                type: 'arrow',
                start: {
                    x: 320,
                    y: 30,
                    relativeTo: 'fc-4',
                },
                end: {
                    x: 0,
                    y: 30,
                    relativeTo: 'fc-5',
                },
            },
        ],
    },
    {
        name: 'Retro',
        nodes: [
            {
                id: 'rt-1',
                type: 'sticker',
                text: '🎉 What went well?',
                x: 10,
                y: 100,
            },
            {
                id: 'rt-2',
                type: 'sticker',
                text: 'Clear communication and smooth teamwork',
                x: 10,
                y: 200,
            },
            {
                id: 'rt-3',
                type: 'sticker',
                text: 'Delivered all main goals on schedule',
                x: 10,
                y: 300,
            },
            {
                id: 'rt-4',
                type: 'sticker',
                text: '🤔 What can be improved?',
                x: 400,
                y: 100,
            },
            {
                id: 'rt-5',
                type: 'sticker',
                text: 'Better time estimation for unexpected tasks',
                x: 400,
                y: 200,
            },
            {
                id: 'rt-6',
                type: 'sticker',
                text: 'Reduce unnecessary meetings and syncs',
                x: 400,
                y: 300,
            },
            {
                id: 'rt-7',
                type: 'sticker',
                text: '🎯 Action items',
                x: 785,
                y: 100,
            },
            {
                id: 'rt-8',
                type: 'sticker',
                text: 'Set up weekly progress check-ins',
                x: 785,
                y: 200,
            },
            {
                id: 'rt-9',
                type: 'sticker',
                text: 'Create a shared folder for project assets',
                x: 785,
                y: 300,
            },
        ],
    },
]