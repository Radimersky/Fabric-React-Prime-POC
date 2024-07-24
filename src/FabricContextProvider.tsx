import { createContext, useCallback, useState } from 'react';
import { Canvas } from 'fabric';
import { Dimensions } from './types/Dimension';
import { MAX_CANVAS_SIZE } from './Constants';

type FabricContext = [
  Canvas | null,
  Dimensions,
  (canvas: Canvas, maxCanvasSize: Dimensions) => void,
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
  const [maxSize, setMaxSize] = useState<Dimensions>(MAX_CANVAS_SIZE);

  const initCanvas = useCallback(
    (newCanvas: Canvas, maxSize: Dimensions): void => {
      setCanvas(newCanvas);
      setMaxSize(maxSize);
    },
    [],
  );

  return (
    <FabricContext.Provider value={[canvas, maxSize, initCanvas]}>
      {props.children}
    </FabricContext.Provider>
  );
};
