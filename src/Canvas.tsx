import { useContext, useEffect } from 'react';
import * as fabric from 'fabric';
import { FabricContext } from './FabricContextProvider';
import { CANVAS_BACKGROUND, MAX_CANVAS_SIZE } from './Constants';
import { calculateCanvasScalingFactor } from './MathUtils';
import { Size } from './types/Size';

const canvasId = 'canvas';

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
    // Apply transformation matrix to flip the Y-axis, because Prime uses top bottom corner as x:0 y:0 coordinate
    canvas.viewportTransform = [1, 0, 0, -1, 0, canvas.getHeight()];

    canvas.on('object:added', e => {
      const obj = e.target;
      if (obj) {
        obj.set({
          flipY: true, // Flips object on Y axis because they are upside down due to viewport transformation above
        });
        obj.setCoords();
      }
    });

    canvas.requestRenderAll();

    initCanvas(canvas);
    setScalingFactor(scalingFactor);

    return () => {
      canvas.dispose().catch(e => console.log(e));
    };
  }, [initCanvas, sceneSize, setScalingFactor]);

  const createCanvas = (width: number, height: number) => {
    return new fabric.Canvas(canvasId, {
      height: height,
      width: width,
      backgroundColor: CANVAS_BACKGROUND,
    });
  };

  return <canvas id={canvasId} />;
};

export default Canvas;
