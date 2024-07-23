import { useContext } from 'react';
import CanvasOperation from './CanvasTextBoxCreator';
import { FabricContext } from './FabricContextProvider';

const CanvasToolbar: React.FC = () => {
  const [canvas] = useContext(FabricContext);

  if (!canvas) {
    return null;
  }

  return (
    <CanvasOperation
      canvas={canvas}
      fontSize={30}
      textPositionX={100}
      textPositionY={100}
    />
  );
};

export default CanvasToolbar;
