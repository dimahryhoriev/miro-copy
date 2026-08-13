import { type RelativeBase } from "../../domain/point";
import { type Node } from "../../model/nodes";

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

export function useResolveRelativeDecorator() {

}