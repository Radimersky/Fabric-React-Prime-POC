import { Dimensions } from './types/Dimension';

export const calculateCanvasScalingFactor = (
  original: Dimensions,
  max: Dimensions,
): number => {
  const widthScalingFactor = max.width / original.width;
  const heightScalingFactor = max.height / original.height;

  const scalingFactor = Math.min(widthScalingFactor, heightScalingFactor);

  return scalingFactor;
};
