import { type WindowPosition } from "../model/window-position";

export function Dots({
    windowPosition,
}: {
    windowPosition: WindowPosition;
}) {
    return (
        <div
            style={
                {
                    '--zoom': windowPosition?.zoom,
                    '--x': -(windowPosition?.x ?? 0) * (windowPosition?.zoom ?? 1) + 'px',
                    '--y': -(windowPosition?.y ?? 0) * (windowPosition?.zoom ?? 1) + 'px',
                } as React.CSSProperties
            }
            className="
                    absolute inset-0
                    bg-[radial-gradient(#e5e7eb_calc(1px*var(--zoom)),transparent_calc(1px*var(--zoom)))]
                    [background-position:var(--x)_var(--y)]
                    [background-size:calc(16px*var(--zoom))_calc(16px*var(--zoom))]
            "
        />
    )
}