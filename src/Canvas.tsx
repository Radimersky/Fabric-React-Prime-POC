import { useContext, useEffect } from 'react';
import * as fabric from 'fabric';
import { FabricContext } from './FabricContextProvider';
import { MAX_CANVAS_SIZE } from './Constants';

const canvasId = 'canvas';

const Canvas: React.FC = () => {
  const [, , initCanvas] = useContext(FabricContext);

  useEffect(() => {
    const canvas = createCanvas();
    canvas.requestRenderAll();

    initCanvas(canvas, MAX_CANVAS_SIZE);

    return () => {
      canvas.dispose().catch(e => console.log(e));
    };
  }, [initCanvas]);

  const createCanvas = () => {
    const options = {
      height: MAX_CANVAS_SIZE.height,
      width: MAX_CANVAS_SIZE.width,
      backgroundColor: 'white',
    };

    return new fabric.Canvas(canvasId, options);
  };

  return <canvas id={canvasId} />;
};

export default Canvas;
