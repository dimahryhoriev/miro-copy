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
        window.addEventListener('pointermove', onMouseMove);
        window.addEventListener('pointerup', onMouseUp);
        window.addEventListener('pointercancel', onMouseUp);
        window.addEventListener('wheel', onMouseWheel);
        return () => {
            window.removeEventListener('pointermove', onMouseMove);
            window.removeEventListener('pointerup', onMouseUp);
            window.removeEventListener('pointercancel', onMouseUp);
            window.removeEventListener('wheel', onMouseWheel);
        };
    }, []);
};