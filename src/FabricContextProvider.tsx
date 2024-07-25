import { createContext, useCallback, useState } from 'react';
import { Canvas } from 'fabric';
import { Size } from './types/Size';
import { MAX_CANVAS_SIZE } from './Constants';

type FabricContext = [
  Canvas | null,
  Size,
  (canvas: Canvas, maxCanvasSize: Size) => void,
];

export const FabricContext = createContext<FabricContext>([
  null,
  MAX_CANVAS_SIZE,
  () => {},
]);

export const FabricContextProvider = (props: {
  children: JSX.Element;
}): JSX.Element => {
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [maxSize, setMaxSize] = useState<Size>(MAX_CANVAS_SIZE);

  const initCanvas = useCallback((newCanvas: Canvas, maxSize: Size): void => {
    setCanvas(newCanvas);
    setMaxSize(maxSize);
  }, []);

  return (
    <FabricContext.Provider value={[canvas, maxSize, initCanvas]}>
      {props.children}
    </FabricContext.Provider>
  );
};
