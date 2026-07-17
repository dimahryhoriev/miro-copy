import type { NodesModel } from "../model/nodes";
import type { ViewStateModel } from "../model/view-state";
import type { CanvasRect } from "../hooks/use-canvas-rect";

export type ViewModelParams = {
    viewStateModel: ViewStateModel;
    nodesModel: NodesModel;
    canvasRect: CanvasRect | undefined;
}