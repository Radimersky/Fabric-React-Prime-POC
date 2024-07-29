import { useCallback, useContext, useMemo, useState } from 'react';
import PrimeSceneParser from './PrimeSceneParser';
import { Scene } from './types/Scene';
import { FabricContext } from './FabricContextProvider';
import { Size } from './types/Size';
import CanvasTextBox from './CanvasTextBox';
import CanvasImage from './CanvasImage';

const CanvasSceneControll: React.FC = () => {
  const [canvas, , scalingFactor, , setSceneSize] = useContext(FabricContext);
  const [scene, setScene] = useState<Scene | null>(null);

  const handleNewScene = useCallback(
    (scene: Scene) => {
      console.log(scene);
      const sceneSize: Size = {
        Width: scene.Canvas.Resolution.Size.Width,
        Height: scene.Canvas.Resolution.Size.Height,
      };

      setSceneSize(sceneSize);
      setScene(scene);
    },
    [setSceneSize],
  );

  const textBoxComponents = useMemo(() => {
    const sceneTexts = scene?.Canvas.Graphics.Text;
    return canvas && sceneTexts
      ? reverseIfArray(sceneTexts).map((textOptions, index) => (
          <CanvasTextBox
            canvas={canvas}
            options={textOptions}
            scalingFactor={scalingFactor}
            key={index}
          />
        ))
      : null;
  }, [scene, canvas, scalingFactor]);

  const imageComponents = useMemo(() => {
    const sceneImage = scene?.Canvas.Graphics.Image;
    return canvas && sceneImage
      ? reverseIfArray(sceneImage).map((imageOptions, index) => (
          <CanvasImage
            canvas={canvas}
            options={imageOptions}
            scalingFactor={scalingFactor}
            key={index}
          />
        ))
      : null;
  }, [scene, canvas, scalingFactor]);

  return (
    <>
      <div className="tool-container">
        <PrimeSceneParser onSceneParsed={handleNewScene} />
      </div>
      {textBoxComponents && (
        <div className="tool-container tool-column">{textBoxComponents}</div>
      )}
      {imageComponents && (
        <div className="tool-container tool-column">{imageComponents}</div>
      )}
    </>
  );
};

const reverseIfArray = <T,>(data: T | T[]): T[] => {
  if (Array.isArray(data)) {
    return data.slice().reverse();
  }
  return [data];
};

export default CanvasSceneControll;
