export function Overlay({
    onClick,
    onMouseDown,
    onMouseUp,
    onTouchStart,
    onTouchEnd,
}: {
    onClick?: (
        e: React.MouseEvent<HTMLDivElement>
    ) => void;
    onMouseDown?: (
        e: React.MouseEvent<HTMLDivElement>
    ) => void;
    onMouseUp?: (
        e: React.MouseEvent<HTMLDivElement>
    ) => void;
    onTouchStart?: (
        e: React.TouchEvent<HTMLDivElement>
    ) => void;
    onTouchEnd?: (
        e: React.TouchEvent<HTMLDivElement>
    ) => void;
}) {
    return (
        <div
            className="absolute inset-0 touch-none"
            onClick={onClick}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
        </div>
    );
};