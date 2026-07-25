import { cn } from "@/shared/lib/css";

export function Actions({
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