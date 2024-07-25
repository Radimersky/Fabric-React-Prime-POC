import { useCallback, useContext, useMemo, useState } from 'react';
import PrimeSceneParser from './PrimeSceneParser';
import { Scene } from './types/Scene';
import { FabricContext } from './FabricContextProvider';
import { Size } from './types/Size';
import CanvasTextBox from './CanvasTextBox';

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

  const textBoxComponents = useMemo(
    () =>
      canvas
        ? scene?.Canvas.Graphics.Text.slice()
            .reverse()
            .map((text, index) => (
              <CanvasTextBox
                canvas={canvas}
                options={text}
                scalingFactor={scalingFactor}
                key={index}
              />
            ))
        : null,
    [scene, canvas, scalingFactor],
  );

  return (
    <>
      <div className="tool-container">
        <PrimeSceneParser onSceneParsed={handleNewScene} />
      </div>
      {textBoxComponents && (
        <div className="tool-container tool-column">{textBoxComponents}</div>
      )}
    </>
  );
};

export default CanvasSceneControll;
