import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode >
    <div className="sopesprac1" style={{
      backgroundImage: `url(${'https://img.freepik.com/premium-vector/digital-futurustic-portal-hologram-with-light-effect-hud-gui-ui-sci-fi-virtual-graphic-vector-technology-background-dashboard-display_185386-912.jpg'})`,
      backgroundSize: 'auto',
      height: '100vh'
    }}><App /></div>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
