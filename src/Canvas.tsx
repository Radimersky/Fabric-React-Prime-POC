import { useCallback, useContext, useEffect } from 'react';
import * as fabric from 'fabric';
import { FabricContext } from './FabricContextProvider';

const Canvas: React.FC = () => {
  const [, initCanvas] = useContext(FabricContext);

  // Ensure initCanvas ref won't change between rerenders to make it safe to use inside useEffect below
  const stableInitCanvas = useCallback(initCanvas, [initCanvas]);

  useEffect(() => {
    const canvas = createCanvas();
    canvas.requestRenderAll();

    stableInitCanvas(canvas);

    return () => {
      canvas.dispose().catch(e => console.log(e));
    };
  }, [stableInitCanvas]);

  const canvasId = 'canvas';

  const createCanvas = () => {
    const options = {
      height: 600,
      width: 800,
      backgroundColor: 'white',
    };

    return new fabric.Canvas(canvasId, options);
  };

  return <canvas id={canvasId} />;
};

export default Canvas;
