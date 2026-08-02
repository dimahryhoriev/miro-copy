import { cn } from "@/shared/lib/css";
import {
    useLayoutEffect,
    useRef,
    useState,
    type Ref,
} from "react";

export function Sticker({
    id,
    ref,
    x,
    y,
    text,
    isSelected,
    isEditing,
    onClick,
    onTextChange,
    onMouseDown,
    onMouseUp,
}: {
    id: string;
    ref: Ref<HTMLButtonElement>;
    x: number;
    y: number;
    text: string;
    isSelected?: boolean;
    isEditing?: boolean;
    onClick?: (
        e: React.MouseEvent<HTMLButtonElement>
    ) => void;
    onTextChange?: (text: string) => void;
    onMouseDown?: (
        e: React.MouseEvent<HTMLButtonElement>
    ) => void;
    onMouseUp?: (
        e: React.MouseEvent<HTMLButtonElement>
    ) => void;
}) {
    return (
        <button
            data-id={id}
            ref={ref}
            className={
                cn(
                    'absolute bg-yellow-300 px-2 py-4',
                    'rounded-xs shadow-md text-left',
                    isSelected && 'outline outline-2 outline-blue-500',
                )
            }
            style={{
                transform: `translate(${x}px, ${y}px)`
            }}
            onClick={onClick}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
        >
            <TextareaAutoSize
                isEditing={isEditing ?? false}
                value={text}
                onChange={
                    (value) => onTextChange?.(value)
                }
            />
        </button>
    )
}

function TextareaAutoSize({
    value,
    onChange,
    isEditing,
}: {
    value: string;
    onChange?: (value: string) => void;
    isEditing: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        if (!ref.current) return;
        const { scrollWidth, clientHeight } = ref.current;
        setHeight(clientHeight);
        setWidth(scrollWidth);
    }, [value])
    return (
        <div className="relative">
            <div
                ref={ref}
                className={
                    cn(
                        'whitespace-pre-wrap',
                        isEditing && 'opacity-0',
                    )
                }
            >
                {value}
            </div>
            {
                isEditing && (
                    <textarea
                        value={value}
                        autoFocus
                        className={
                            cn(
                                'absolute left-0 top-0',
                                'resize-none overflow-hidden',
                                'focus:outline-none',
                            )
                        }
                        onChange={
                            (e) => onChange?.(e.target.value)
                        }
                        style={{
                            width: width + 2,
                            height: height + 2,
                        }}
                    />
                )
            }
        </div>
    )
}