import { createRoot } from 'react-dom/client';
import React from "react";
import { Scene } from './three/MainScene';
import './stylesheets/base.scss';

function App() {
  const animate = Scene();
  return <>{animate}</>
}

const rootElem = document.getElementById('root')!;
const root = createRoot(rootElem);
root.render(<App />);