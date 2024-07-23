import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Canvas from './Canvas.tsx'
import { FabricContextProvider } from './FabricContextProvider.tsx'
import CanvasOperation from './CanvasOperation.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <h2>Fabric.js canvas using Prime template POC</h2>
    <FabricContextProvider>
      <>
        <Canvas />
        <CanvasOperation />
      </>
    </FabricContextProvider>
  </React.StrictMode>,
)
