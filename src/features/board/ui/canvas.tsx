import { type Ref } from "react";
import type { WindowPosition } from "../model/window-position";

export function Canvas({
    children,
    windowPosition,
    ref,
    overlay,
    ...props
}: {
    children: React.ReactNode;
    ref: Ref<HTMLDivElement>;
    windowPosition: WindowPosition;
    overlay?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className="absolute inset-0 select-none overflow-hidden"
            onContextMenu={
                (e) => e.preventDefault()
            }
            ref={ref}
            {...props}
        >
            {overlay}
            <div
                style={{
                    transform:
                        `translate(${windowPosition.x}px, ${windowPosition.y}px) scale(${windowPosition.zoom})`
                }}
            >
                {children}
            </div>
        </div>
    )
}