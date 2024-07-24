import { useContext } from 'react';
import CanvasOperation from './CanvasTextBoxCreator';
import { FabricContext } from './FabricContextProvider';
import PrimeSceneParser from './PrimeSceneParser.tsx';

const CanvasToolbar: React.FC = () => {
  const [canvas] = useContext(FabricContext);

  if (!canvas) {
    return null;
  }

  return (
    <div className="flex">
      <CanvasOperation
        canvas={canvas}
        fontSize={30}
        textPositionX={100}
        textPositionY={100}
      />
      <PrimeSceneParser
        onSceneParsed={scene => {
          console.log(scene);
        }}
      />
    </div>
  );
};

export default CanvasToolbar;
