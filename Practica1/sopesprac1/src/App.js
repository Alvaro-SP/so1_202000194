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
      <header>
          <nav>
              <h1>Mi Aplicación</h1>
              <ul>
              <li><a href="#">Inicio</a></li>
              <li><a href="#">Acerca de</a></li>
              <li><a href="#">Contacto</a></li>
              </ul>
          </nav>
      </header>
      <Calculator />
      {/* <Console /> */}
    </div>
  );
}

export default App;
