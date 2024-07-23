import { createContext, useCallback, useState } from 'react';
import { Canvas } from 'fabric';

type FabricContext = [Canvas | null, (c: Canvas) => void];

export const FabricContext = createContext<FabricContext>([null, () => {}]);

export const FabricContextProvider = (props: {
  children: JSX.Element;
}): JSX.Element => {
  const [canvas, setCanvas] = useState<Canvas | null>(null);

  const initCanvas = useCallback((newCanvas: Canvas): void => {
    setCanvas(newCanvas);
  }, []);

  return (
    <FabricContext.Provider value={[canvas, initCanvas]}>
      {props.children}
    </FabricContext.Provider>
  );
};
