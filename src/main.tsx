import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import './css/CanvasToolbar.css';
import Canvas from './Canvas.tsx';
import { FabricContextProvider } from './FabricContextProvider.tsx';
import CanvasToolbar from './CanvasToolbar.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <h2>Fabric.js canvas using Prime template POC</h2>
    <FabricContextProvider>
      <>
        <Canvas />
        <CanvasToolbar />
      </>
    </FabricContextProvider>
  </React.StrictMode>,
);
