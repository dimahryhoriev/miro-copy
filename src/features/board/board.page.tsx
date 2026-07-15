import { cn } from "@/shared/lib/css";
import { Button } from "@/shared/ui/kit/button";
import {
    ArrowRightIcon,
    StickerIcon
} from "lucide-react";
import { useNodes } from "./nodes";
import { useViewModel } from "./view-model";
import { type Ref } from "react";
import { useCanvasRect } from "./use-canvas-rect";
import { useLayoutFocus } from "./use-layout-focus";

type ViewModelNode = {
    id: string;
    text: string;
    x: number;
    y: number;
    isSelected?: boolean;
    onClick?: (
        e: React.MouseEvent<HTMLButtonElement>
    ) => void;
}

type ViewModel = {
    nodes: ViewModelNode[];
    layout?: {
        onKeyDown?: (
            e: React.KeyboardEvent<HTMLDivElement>
        ) => void;
    };
    canvas?: {
        onClick?: (
            e: React.MouseEvent<HTMLDivElement>
        ) => void;
    };
    actions?: {
        addSticker?: {
            onClick?: (
                e: React.MouseEvent<HTMLButtonElement>
            ) => void;
            isActive?: boolean;
        }
    }
};

function BoardPage() {
    const { nodes, addSticker } = useNodes();
    const { canvasRef, canvasRect } = useCanvasRect();
    const focusLayoutRef = useLayoutFocus();
    const viewModelLast = useViewModel();

    let viewModel: ViewModel;

    switch (viewModelLast.viewState.type) {
        case 'add-sticker':
            viewModel = {
                nodes: nodes,
                layout: {
                    onKeyDown: (e) => {
                        if (e.key === 'Escape') {
                            viewModelLast.goToIdle();
                        }
                    }
                },
                canvas: {
                    onClick: (e) => {
                        if (!canvasRect) return;
                        addSticker({
                            text: 'Default',
                            x: e.clientX - canvasRect.x,
                            y: e.clientY - canvasRect.y,
                        });
                        viewModelLast.goToIdle();
                    }
                },
                actions: {
                    addSticker: {
                        isActive: true,
                        onClick: () => {
                            viewModelLast.goToIdle();
                        }
                    },
                },
            };
            break;
        case 'idle': {
            const viewState = viewModelLast.viewState;
            viewModel = {
                nodes: nodes.map(node => ({
                    ...node,
                    isSelected: viewState.selectedIds
                        .has(node.id),
                    onClick: (e) => {
                        if (viewModelLast.viewState.type === 'idle') {
                            if (e.ctrlKey || e.shiftKey || e.metaKey) {
                                viewModelLast.selection(
                                    [node.id],
                                    'toggle',
                                )
                            } else {
                                viewModelLast.selection(
                                    [node.id],
                                    'replace',
                                )
                            }
                        }
                    }
                })),
                layout: {
                    onKeyDown: (e) => {
                        if (e.key === 's') {
                            viewModelLast.goToAddSticker();
                        }
                    }
                },
                actions: {
                    addSticker: {
                        isActive: false,
                        onClick: () => {
                            viewModelLast.goToAddSticker();
                        }
                    },
                },
            };
            break;
        }
        default:
            throw new Error('Invalid view state');
    }

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

function Layout({
    children,
    ref,
    ...props
}: {
    children: React.ReactNode;
    ref: Ref<HTMLDivElement>;
} & React.HTMLAttributes<HTMLDivElement>
) {
    return (
        <div
            ref={ref}
            className="grow relative"
            tabIndex={0}
            {...props}
        >
            {children}
        </div>
    )
}

function Dots() {
    return (
        <div
            className={
                cn(
                    'absolute inset-0',
                    'bg-[radial-gradient(#e5e7eb_1px,transparent_1px)]',
                    '[background-size:16px_16px]'
                )
            }
        />
    )
}

function Canvas({
    children,
    ref,
    ...props
}: {
    children: React.ReactNode;
    ref: Ref<HTMLDivElement>;
} & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className="absolute inset-0"
            ref={ref}
            {...props}
        >
            {children}
        </div>
    )
}

function Sticker({
    text,
    x,
    y,
    onClick,
    selected,
}: {
    text: string;
    x: number;
    y: number;
    onClick?: (
        e: React.MouseEvent<HTMLButtonElement>
    ) => void;
    selected?: boolean;
}) {
    return (
        <button
            className={
                cn(
                    'absolute bg-yellow-300 px-2 py-4',
                    'rounded-xs shadow-md',
                    selected && 'outline outline-2 outline-blue-500',
                )
            }
            style={{
                transform: `translate(${x}px, ${y}px)`
            }}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

function Actions({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            className={
                cn(
                    'absolute left-4 top-1/2 -translate-y-1/2',
                    'flex flex-col gap-2 bg-white p-1',
                    'rounded-md shadow'
                )
            }
        >
            {children}
        </div>
    )
}

function ActionButton({
    children,
    isActive,
    onClick,
}: {
    children: React.ReactNode;
    isActive?: boolean;
    onClick?: (
        e: React.MouseEvent<HTMLButtonElement>
    ) => void;
}) {
    return (
        <Button
            variant='ghost'
            size='icon'
            className={
                isActive
                    ? cn(
                        'bg-blue-500/30 hover:bg-blue-600/30',
                        'text-blue-500 hover:text-blue-600',
                    )
                    : ''
            }
            onClick={onClick}
        >
            {children}
        </Button>
    )
}