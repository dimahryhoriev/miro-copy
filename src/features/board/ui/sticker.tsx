import { cn } from "@/shared/lib/css";
import { type Ref } from "react";

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
                        <input
                            value={text}
                            className="w-full h-full"
                            autoFocus
                            onChange={
                                (e) => onTextChange?.(
                                    e.target.value
                                )
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