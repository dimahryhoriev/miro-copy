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
import { Sticker } from "./ui/nodes/sticker";
import { useNodesDimensions } from "./hooks/use-nodes-dimensions";
import { useLocation } from "react-router";
import { Arrow } from "./ui/nodes/arrow";
import { getInitialWindowPosition, useWindowPositionModel } from "./model/window-position";

function BoardPage() {
    const location = useLocation();
    const nodesModel = useNodes(location.state?.initialNodes);
    const { canvasRef, canvasRect } = useCanvasRect();
    const { nodeRef, nodesDimensions } = useNodesDimensions();
    const windowPositionModel = useWindowPositionModel();
    const focusLayoutRef = useLayoutFocus();

    const viewModel = useViewModel({
        nodesModel,
        canvasRect,
        canvasRef: focusLayoutRef,
        nodesDimensions,
        windowPositionModel,
    });

    useWindowEvents(viewModel);

    const initialWindowPosition = getInitialWindowPosition({
        nodesModel,
        canvasRect,
        nodesDimensions,
        windowPositionModel,
    })
    const windowPosition =
        viewModel.windowPosition
        ?? initialWindowPosition
        ?? windowPositionModel.position
        ?? {
            x: 0,
            y: 0,
            zoom: 1,
        }
    console.log(initialWindowPosition);

    return (
        <Layout
            ref={focusLayoutRef}
            onKeyDown={viewModel.layout?.onKeyDown}
            style={{
                opacity: initialWindowPosition ? 1 : 0,
                transition: initialWindowPosition ? "opacity 0.15s ease-out" : "none"
            }}
        >
            <Dots
                windowPosition={
                    windowPosition
                }
            />
            <Canvas
                ref={canvasRef}
                overlay={
                    <Overlay
                        onClick={viewModel.overlay?.onClick}
                        onMouseDown={viewModel.overlay?.onMouseDown}
                        onMouseUp={viewModel.overlay?.onMouseUp}
                    />
                }
                windowPosition={
                    windowPosition
                }
                onClick={
                    viewModel.canvas?.onClick
                }
            >
                {
                    viewModel.nodes.map(
                        (node) => {
                            if (node.type === 'sticker') {
                                return (
                                    <Sticker
                                        key={node.id}
                                        ref={nodeRef}
                                        {...node}
                                    />
                                );
                            };
                            if (node.type === 'arrow') {
                                return (
                                    <Arrow
                                        key={node.id}
                                        ref={nodeRef}
                                        {...node}
                                    />
                                );
                            };
                        },
                    )
                }
                {viewModel.selectionWindow && (
                    <SelectionWindow
                        {...viewModel.selectionWindow}
                    />
                )}
            </Canvas>
            <Actions>
                <ActionButton
                    isActive={viewModel.actions?.addSticker?.isActive}
                    onClick={viewModel.actions?.addSticker?.onClick}
                >
                    <StickerIcon />
                </ActionButton>
                <ActionButton
                    isActive={viewModel.actions?.addArrow?.isActive}
                    onClick={viewModel.actions?.addArrow?.onClick}
                >
                    <ArrowRightIcon />
                </ActionButton>
            </Actions>
        </Layout >
    )
}

export const Component = BoardPage;
