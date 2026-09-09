import { useState } from "react";
import { setAndSaveNodes, type NodesUpdater } from "./sync-nodes";
import { type Point } from "@/shared/lib/geometry";
import { useParams } from "react-router";

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

export function useNodes(
    initialNodes: Node[] = [],
) {
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const { boardId } = useParams<{ boardId: string }>();

    const applyNodes = (updateNodes: NodesUpdater) => {
        setAndSaveNodes({
            setNodes,
            updateNodes,
            boardId,
            nodes,
        });
    };

    const addSticker = (data: {
        text: string;
        x: number;
        y: number;
    }) => {
        applyNodes(
            (prevNodes: Node[]) => [
                ...prevNodes,
                {
                    id: crypto.randomUUID(),
                    type: 'sticker' as const,
                    ...data,
                }
            ],
        );
    };

    const addArrow = (data: {
        start: Point;
        end: Point
    }) => {
        applyNodes(
            (prevNodes: Node[]) => [
                ...prevNodes,
                {
                    id: crypto.randomUUID(),
                    type: 'arrow' as const,
                    ...data,
                }
            ],
        )
    };

    const updateStickerText = (
        id: string,
        text: string,
    ) => {
        applyNodes(
            (prevNodes) => (
                prevNodes.map((node) => (
                    node.id === id
                        ? { ...node, text }
                        : node
                ))
            ),
        );
    };

    const deleteNodes = (ids: string[]) => {
        applyNodes(
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

        applyNodes(
            (prevNodes) => {
                return prevNodes.map(
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
                );
            },
        );
    };

    return {
        nodes,
        addSticker,
        addArrow,
        deleteNodes,
        updateStickerText,
        updateNodesPositions,
        setNodes,
    };
}

export type NodesModel = ReturnType<typeof useNodes>;