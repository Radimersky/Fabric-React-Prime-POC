import { useContext, useEffect } from 'react';
import * as fabric from 'fabric';
import { FabricContext } from './FabricContextProvider';
import { CANVAS_BACKGROUND, MAX_CANVAS_SIZE } from './Constants';
import { calculateCanvasScalingFactor } from './MathUtils';
import { Size } from './types/Size';

const canvasId = 'canvas';

const createCanvas = (width: number, height: number) => {
  return new fabric.Canvas(canvasId, {
    height: height,
    width: width,
    backgroundColor: CANVAS_BACKGROUND,
  });
};

const applyGlobalObjectTransformation = (canvas: fabric.Canvas) => {
  canvas.on('object:added', e => {
    const obj = e.target;
    if (!obj) {
      return;
    }

    const flippedYCoordinate = canvas.getHeight() - obj.top;

    obj.set({
      top:
        obj.type === 'image'
          ? flippedYCoordinate
          : flippedYCoordinate - (obj.height || 0),
    });

    obj.setCoords();
  });
};

const Canvas: React.FC = () => {
  const [, sceneSize, , initCanvas, , setScalingFactor] =
    useContext(FabricContext);

  useEffect(() => {
    const scalingFactor = sceneSize
      ? calculateCanvasScalingFactor(sceneSize)
      : 1;

    const scaledSize: Size = sceneSize
      ? {
          Width: sceneSize.Width * scalingFactor,
          Height: sceneSize.Height * scalingFactor,
        }
      : MAX_CANVAS_SIZE;

    const canvas = createCanvas(scaledSize.Width, scaledSize.Height);

    applyGlobalObjectTransformation(canvas);

    canvas.requestRenderAll();

    initCanvas(canvas);
    setScalingFactor(scalingFactor);

    return () => {
      canvas.dispose().catch(e => console.log(e));
    };
  }, [initCanvas, sceneSize, setScalingFactor]);

  return <canvas id={canvasId} />;
};

export default Canvas;
