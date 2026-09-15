import { cn } from "@/shared/lib/css";
import { Button } from "@/shared/ui/kit/button";

export function ActionButton({
    children,
    isActive,
    onClick,
    className,
}: {
    children: React.ReactNode;
    isActive?: boolean;
    onClick?: (
        e: React.MouseEvent<HTMLButtonElement>
    ) => void;
    className?: string;
}) {
    return (
        <Button
            variant='ghost'
            size='icon'
            className={
                cn(
                    isActive && [
                        'bg-blue-500/30 hover:bg-blue-600/30',
                        'text-blue-500 hover:text-blue-600',
                    ],
                    className,
                )
            }
            onClick={onClick}
        >
            {children}
        </Button>
    )
}