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
import { Actions } from "./ui/Actions";
import { Canvas } from "./ui/Canvas";
import { Dots } from "./ui/Dots";
import { Layout } from "./ui/Layout";
import { Overlay } from "./ui/Overlay";
import { SelectionWindow } from "./ui/selection-window";
import { Sticker } from "./ui/Sticker";

function BoardPage() {
    const nodesModel = useNodes();
    const { canvasRef, canvasRect } = useCanvasRect();
    const focusLayoutRef = useLayoutFocus();

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
                            key={node.id}
                            text={node.text}
                            x={node.x}
                            y={node.y}
                            selected={node.isSelected}
                            onClick={node.onClick}
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
