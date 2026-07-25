import { type Ref } from "react";

export function Canvas({
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