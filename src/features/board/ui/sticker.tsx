import { cn } from "@/shared/lib/css";
import { useLayoutEffect, useRef, useState, type Ref } from "react";

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
}) {
    return (
        <button
            data-id={id}
            ref={ref}
            className={
                cn(
                    'absolute bg-yellow-300 px-2 py-4',
                    'rounded-xs shadow-md',
                    isSelected && 'outline outline-2 outline-blue-500',
                )
            }
            style={{
                transform: `translate(${x}px, ${y}px)`
            }}
            onClick={onClick}
        >
            {
                isEditing
                    ?
                    (
                        <TextareaAutoSize
                            value={text}
                            onChange={
                                (value) => onTextChange?.(value)
                            }
                        />
                    )
                    :
                    (
                        text
                    )
            }
        </button>
    )
}

function TextareaAutoSize({
    value,
    onChange,
}: {
    value: string;
    onChange?: (value: string) => void;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

    useLayoutEffect(() => {
        if (!ref.current) return;
        const { scrollWidth, scrollHeight } = ref.current;
        setHeight(scrollHeight);
        setWidth(scrollWidth);
    }, [value])
    return (
        <div className="relative">
            <div
                className="whitespace-pre-wrap opacity-0"
                ref={ref}
            >
                {value}
            </div>
            <textarea
                className={
                    cn(
                        'absolute left-0 top-0',
                        'resize-none overflow-hidden'
                    )
                }
                value={value}
                onChange={
                    (e) => onChange?.(e.target.value)
                }
                style={{
                    width: width + 2,
                    height: height + 2,
                }}
            />
        </div>
    )
}