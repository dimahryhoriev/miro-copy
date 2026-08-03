import { useState } from "react";

type NodeBase = {
    id: string;
    type: string;
}

type StickerNode = {
    type: 'sticker';
    text: string;
    x: number;
    y: number;
} & NodeBase;

type Node = StickerNode;

export function useNodes() {
    const [nodes, setNodes] = useState<Node[]>([
        {
            id: '1',
            type: 'sticker',
            text: 'Hello 1',
            x: 100,
            y: 100,
        },
        {
            id: '2',
            type: 'sticker',
            text: 'Hello 2',
            x: 200,
            y: 200,
        },
    ]);

    const addSticker = (data: {
        text: string;
        x: number;
        y: number;
    }) => {
        setNodes((prevNodes: Node[]) => [
            ...prevNodes,
            {
                id: crypto.randomUUID(),
                type: 'sticker',
                ...data,
            }
        ])
    }

    const updateStickerText = (
        id: string,
        text: string,
    ) => {
        setNodes(
            (lastNodes) => (
                lastNodes.map((node) => (
                    node.id === id
                        ? { ...node, text }
                        : node
                ))
            )
        )
    }

    const deleteNodes = (ids: string[]) => {
        setNodes((prevNodes) => (
            prevNodes.filter(
                (node) => !ids.includes(node.id)
            )
        ))
    }

    const updateNodesPositions = (
        positions: {
            id: string;
            x: number;
            y: number;
        }[],
    ) => {
        const record = Object.fromEntries(
            positions.map(
                (p) => [p.id, p],
            ),
        );

        setNodes(
            (lastNodes) => (
                lastNodes.map(
                    (node) => {
                        const newPosition
                            = record[node.id];
                        if (newPosition) {
                            return {
                                ...node,
                                x: newPosition.x,
                                y: newPosition.y,
                            };
                        };
                        return node;
                    },
                )
            ),
        );
    };

    return {
        nodes,
        addSticker,
        deleteNodes,
        updateStickerText,
        updateNodesPositions,
    };
}

export type NodesModel = ReturnType<typeof useNodes>;