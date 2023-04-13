import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import About from './components/About/About';
import Achievements from './components/Achievements/Achievements';
import Members from './components/Members/Members';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
    <About />
    <Achievements/>
    <Members/>
  </React.StrictMode>
);

