import './App.css';
import Base from './components/Base';

function App() {
  return (
    <div className="sopesprac1" style={{
      backgroundImage: `url(${'https://img.freepik.com/premium-vector/digital-futurustic-portal-hologram-with-light-effect-hud-gui-ui-sci-fi-virtual-graphic-vector-technology-background-dashboard-display_185386-912.jpg'})`,
      backgroundSize: 'cover',
      height: '100vh'
    }}>
      <Base />
    </div>
  );
}

export default App;
