import { MAX_CANVAS_SIZE } from './Constants';
import { Size } from './types/Size';

export const calculateCanvasScalingFactor = (original: Size): number => {
  const widthScalingFactor = MAX_CANVAS_SIZE.Width / original.Width;
  const heightScalingFactor = MAX_CANVAS_SIZE.Height / original.Height;

  const scalingFactor = Math.min(widthScalingFactor, heightScalingFactor);

  return scalingFactor;
};
