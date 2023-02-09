import logo from './logo.svg';
import './App.css';
import './styles.css';
import Calculator from './components/Calculator';
import Console from './components/Console';

function App() {
  return (
    <div className="sopesprac1" style={{
      backgroundImage: `url(${'https://thumbs.gfycat.com/AnchoredSoulfulCapeghostfrog-max-1mb.gif'})`,
      backgroundSize: 'cover',
      height: '100vh'
    }}>
      <Calculator />
      {/* <Console /> */}
    </div>
  );
}

export default App;
