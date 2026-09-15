import { cn } from "@/shared/lib/css";
import { Button } from "@/shared/ui/kit/button";

export function ActionButton({
    children,
    isActive,
    isDisabled = false,
    isDestructive,
    onClick,
    className,
}: {
    children: React.ReactNode;
    isActive?: boolean;
    isDisabled?: boolean;
    isDestructive?: boolean;
    onClick?: (
        e: React.MouseEvent<HTMLButtonElement>
    ) => void;
    className?: string;
}) {
    return (
        <Button
            variant={
                isDestructive
                    ? 'destructive'
                    : 'ghost'
            }
            size='icon'
            disabled={isDisabled}
            className={
                cn(
                    !isDisabled
                    &&
                    isActive
                    &&
                    [
                        'bg-blue-500/30 hover:bg-blue-600/30',
                        'text-blue-500 hover:text-blue-600',
                    ],
                    className,
                )
            }
            onClick={
                isDisabled ? undefined : onClick
            }
        >
            {children}
        </Button>
    )
}