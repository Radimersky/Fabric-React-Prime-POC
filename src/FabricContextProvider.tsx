import { createContext, useCallback, useState } from 'react';
import { Canvas } from 'fabric';
import { Size } from './types/Size';

type FabricContext = [
  Canvas | null,
  Size | null,
  number,
  (canvas: Canvas) => void,
  (sceneSize: Size) => void,
  (setScalingFactor: number) => void,
];

export const FabricContext = createContext<FabricContext>([
  null,
  null,
  1,
  () => {},
  () => {},
  () => {},
]);

export const FabricContextProvider = (props: {
  children: JSX.Element;
}): JSX.Element => {
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [sceneSize, setSceneSize] = useState<Size | null>(null);
  const [scalingFactor, setScalingFactor] = useState<number>(1);

  const initCanvas = useCallback((newCanvas: Canvas): void => {
    setCanvas(newCanvas);
  }, []);

  return (
    <FabricContext.Provider
      value={[
        canvas,
        sceneSize,
        scalingFactor,
        initCanvas,
        setSceneSize,
        setScalingFactor,
      ]}
    >
      {props.children}
    </FabricContext.Provider>
  );
};
