import { Size } from './types/Size';

export const calculateCanvasScalingFactor = (
  original: Size,
  max: Size,
): number => {
  const widthScalingFactor = max.Width / original.Width;
  const heightScalingFactor = max.Height / original.Height;

  const scalingFactor = Math.min(widthScalingFactor, heightScalingFactor);

  return scalingFactor;
};
