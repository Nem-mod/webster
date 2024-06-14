import { KonvaEventObject } from "konva/lib/Node";
import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux";
import { addElement } from "../../redux/slices/canvasSlice/canvas-slice";
import { CanvasElementType } from "../../services/canvas/canvas-element-types.enum";
import { ToolOperationType } from "../../redux/slices/canvasSlice/canvas-slice.types";


export function useDraw() {
  const dispatch = useAppDispatch();
  const tool = useAppSelector(state => state.canvas.data?.activeTool);
  const [line, setLine] = useState<{ tool: ToolOperationType, points: number[]; }>({
    tool: '',
    points: []
  });
  const isDrawing = useRef(false);

  const drawingHandleMouseDown = (e) => {
    if (!tool.tool) return;
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLine({ tool, points: [pos.x, pos.y] });
  };

  const drawingHandleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    // no drawing - skipping
    if (!isDrawing.current || !line) {
      return;
    }
    const stage = e.target.getStage();
    if (!stage) return;
    const point = stage.getPointerPosition();
    if (!point?.x || !point.y) return;
    // add point
    setLine((prevState) => {
      return {
        ...prevState,
        points: prevState?.points.concat([point.x, point.y])
      };
    });
  };

  const drawingHandleMouseUp = () => {
    isDrawing.current = false;
    setLine((prevState) => {
      return {
        ...prevState,
        points: []
      };
    });
    dispatch(addElement({
      type: CanvasElementType.LINE,
      points: line.points,
      stroke: tool?.color
    }));
  };

  return { line, tool, drawingHandleMouseDown, drawingHandleMouseMove, drawingHandleMouseUp };
}