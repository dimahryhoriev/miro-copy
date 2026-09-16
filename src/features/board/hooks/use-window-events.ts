import {
    type ViewModel,
} from "../view-model/view-model-type";
import {
    useRef,
    useLayoutEffect,
    useEffect,
} from "react";

export function useWindowEvents(
    viewModel: ViewModel,
) {
    const viewModelRef = useRef(viewModel);

    useLayoutEffect(() => {
        viewModelRef.current = viewModel;
    }, [viewModel]);

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            viewModelRef.current.window?.onMouseMove?.(e);
        };
        const onMouseUp = (e: MouseEvent) => {
            viewModelRef.current.window?.onMouseUp?.(e);
        };
        const onMouseWheel = (e: WheelEvent) => {
            viewModelRef.current.window?.onMouseWheel?.(e);
        };
        const onTouchMove = (e: TouchEvent) => {
            viewModelRef.current.window?.onTouchMove?.(e);
        };
        const onTouchEnd = (e: TouchEvent) => {
            viewModelRef.current.window?.onTouchEnd?.(e);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('pointerup', onMouseUp);
        window.addEventListener('pointercancel', onMouseUp);
        window.addEventListener('wheel', onMouseWheel, { passive: false });
        window.addEventListener('touchmove', onTouchMove, { passive: false });
        window.addEventListener('touchend', onTouchEnd);
        window.addEventListener('touchcancel', onTouchEnd);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('pointerup', onMouseUp);
            window.removeEventListener('pointercancel', onMouseUp);
            window.removeEventListener('wheel', onMouseWheel);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onTouchEnd);
            window.removeEventListener('touchcancel', onTouchEnd);
        };
    }, []);
};