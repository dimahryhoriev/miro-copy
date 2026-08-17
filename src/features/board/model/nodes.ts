import { useState } from "react";
import { type Point } from "../domain/point";

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

type ArrowNode = {
    type: 'arrow';
    start: Point;
    end: Point;
} & NodeBase;

export type Node = StickerNode | ArrowNode;

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
        {
            id: '3',
            type: 'arrow',
            start: {
                x: 50,
                y: 50,
                relativeTo: '1',
            },
            end: {
                x: 50,
                y: 50,
                relativeTo: '2',
            },
        },
    ]);

    const addSticker = (data: {
        text: string;
        x: number;
        y: number;
    }) => {
        setNodes(
            (prevNodes: Node[]) => [
                ...prevNodes,
                {
                    id: crypto.randomUUID(),
                    type: 'sticker',
                    ...data,
                }
            ]
        )
    };

    const addArrow = (data: {
        start: Point;
        end: Point
    }) => {
        setNodes(
            (prevNodes) => [
                ...prevNodes,
                {
                    id: crypto.randomUUID(),
                    type: 'arrow',
                    ...data,
                }
            ]
        )
    };

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
        setNodes(
            (prevNodes) => {
                const arrowsRelativeIds = prevNodes
                    .filter(
                        (node) => (
                            (
                                node.type === 'arrow'
                                &&
                                node.start.relativeTo
                                &&
                                ids.includes(
                                    node.start.relativeTo
                                )
                            )
                            ||
                            (
                                node.type === 'arrow'
                                &&
                                node.end.relativeTo
                                &&
                                ids.includes(
                                    node.end.relativeTo
                                )
                            )
                        ),
                    )
                    .map(
                        (node) => node.id
                    );
                return prevNodes.filter(
                    (node) => (
                        !ids.includes(node.id)
                        &&
                        !arrowsRelativeIds.includes(node.id)
                    )
                );
            },
        );
    };

    const updateNodesPositions = (
        positions: {
            id: string;
            point: Point;
            type?: 'start' | 'end';
        }[],
    ) => {
        const record = Object.fromEntries(
            positions.map(
                (p) => [
                    `${p.id}${p.type ?? ''}`,
                    p,
                ],
            ),
        );

        setNodes(
            (lastNodes) => (
                lastNodes.map(
                    (node) => {
                        if (node.type === 'arrow') {
                            const newStartPosition = record[
                                `${node.id}start`
                            ];
                            const newEndPosition = record[
                                `${node.id}end`
                            ];
                            return {
                                ...node,
                                start: newStartPosition?.point ?? node.start,
                                end: newEndPosition?.point ?? node.end,
                            };
                        };
                        if (node.type === 'sticker') {
                            const newPosition = record[node.id];
                            if (newPosition) {
                                return {
                                    ...node,
                                    ...newPosition.point,
                                };
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
        addArrow,
        deleteNodes,
        updateStickerText,
        updateNodesPositions,
    };
}

export type NodesModel = ReturnType<typeof useNodes>;