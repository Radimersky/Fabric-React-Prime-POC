import { Size } from './types/Size';

export const calculateCanvasScalingFactor = (
  original: Size,
  max: Size,
): number => {
  const widthScalingFactor = max.width / original.width;
  const heightScalingFactor = max.height / original.height;

  const scalingFactor = Math.min(widthScalingFactor, heightScalingFactor);

  return scalingFactor;
};
