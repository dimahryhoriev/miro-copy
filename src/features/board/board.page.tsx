import {
    ArrowRightIcon,
    StickerIcon
} from "lucide-react";
import { useNodes } from "./model/nodes";
import { useCanvasRect } from "./hooks/use-canvas-rect";
import { useLayoutFocus } from "./hooks/use-layout-focus";
import { useViewModel } from "./view-model/use-view-model";
import { useWindowEvents } from "./hooks/use-window-events";
import { ActionButton } from "./ui/action-button";
import { SelectionWindow } from "./ui/selection-window";
import { Actions } from "./ui/actions";
import { Canvas } from "./ui/canvas";
import { Dots } from "./ui/dots";
import { Layout } from "./ui/layout";
import { Overlay } from "./ui/overlay";
import { Sticker } from "./ui/sticker";
import { useNodesRects } from "./hooks/use-nodes-rects";

function BoardPage() {
    const nodesModel = useNodes();
    const { canvasRef, canvasRect } = useCanvasRect();
    const focusLayoutRef = useLayoutFocus();
    const { nodeRef } = useNodesRects();

    const viewModel = useViewModel({
        nodesModel,
        canvasRect,
    });

    useWindowEvents(viewModel);

    return (
        <Layout
            ref={focusLayoutRef}
            onKeyDown={viewModel.layout?.onKeyDown}
        >
            <Dots />
            <Canvas
                ref={canvasRef}
                onClick={
                    viewModel.canvas?.onClick
                }
            >
                <Overlay
                    onClick={viewModel.overlay?.onClick}
                    onMouseDown={viewModel.overlay?.onMouseDown}
                    onMouseUp={viewModel.overlay?.onMouseUp}
                />
                {
                    viewModel.nodes.map((node) => (
                        <Sticker
                            id={node.id}
                            key={node.id}
                            text={node.text}
                            x={node.x}
                            y={node.y}
                            selected={node.isSelected}
                            onClick={node.onClick}
                            ref={nodeRef}
                        />
                    ))
                }
            </Canvas>
            {viewModel.selectionWindow && (
                <SelectionWindow
                    {...viewModel.selectionWindow}
                />
            )}
            <Actions>
                <ActionButton
                    isActive={viewModel.actions?.addSticker?.isActive}
                    onClick={viewModel.actions?.addSticker?.onClick}
                >
                    <StickerIcon />
                </ActionButton>
                <ActionButton
                    isActive={false}
                    onClick={() => { }}
                >
                    <ArrowRightIcon />
                </ActionButton>
            </Actions>
        </Layout >
    )
}

export const Component = BoardPage;
