import type { NodesDimensionsMap } from "../../hooks/use-nodes-dimensions";
import { getAnchorPoint } from "../../model/get-anchor-point";
import { type Node } from "../../model/nodes";
import { type ViewModel } from "../view-model-type";
import {
    isRelativePoint,
    resolveRelativePoint,
    type RelativeBase,
} from "@/shared/lib/geometry";
import { useMemo } from "react";

export function createRelativeBase(
    nodes: Node[],
): RelativeBase {
    const base = Object.fromEntries(
        nodes
            .filter(
                (node) => node.type === 'sticker'
            )
            .map(
                (node) => [
                    node.id,
                    node,
                ],
            )
    );
    return base;
}

export function resolveRelativePoints(
    nodes: Node[],
    relativeBase: RelativeBase,
    nodesDimensions: NodesDimensionsMap,
): Node[] {
    return nodes.map(
        (node) => {
            let newNode = node;

            if (
                newNode.type === 'arrow'
                &&
                isRelativePoint(newNode.start)
                &&
                nodesDimensions[newNode.start.relativeTo]
            ) {
                const anchor = getAnchorPoint(
                    newNode.start,
                    nodesDimensions[newNode.start.relativeTo]
                );

                newNode = {
                    ...newNode,
                    start: resolveRelativePoint(
                        relativeBase,
                        {
                            ...anchor,
                            relativeTo: newNode.start.relativeTo,
                        },
                    ),
                };
            };

            if (
                newNode.type === 'arrow'
                &&
                isRelativePoint(newNode.end)
                &&
                nodesDimensions[newNode.end.relativeTo]
            ) {
                const anchor = getAnchorPoint(
                    newNode.end,
                    nodesDimensions[newNode.end.relativeTo]
                );

                newNode = {
                    ...newNode,
                    end: resolveRelativePoint(
                        relativeBase,
                        {
                            ...anchor,
                            relativeTo: newNode.end.relativeTo,
                        },
                    ),
                };
            };

            return newNode;
        }
    )
}

export function useResolveRelativeStaticDecorator(
    viewModel: ViewModel,
    nodesDimensions: NodesDimensionsMap,
): ViewModel {
    const nodes = useMemo(
        () => {
            const relativeBase = createRelativeBase(
                viewModel.nodes,
            );
            return (
                resolveRelativePoints(
                    viewModel.nodes,
                    relativeBase,
                    nodesDimensions,
                )
            );
        },
        [viewModel.nodes, nodesDimensions]
    );
    return {
        ...viewModel,
        nodes,
    };
}