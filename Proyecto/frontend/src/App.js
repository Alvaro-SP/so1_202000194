



import './App.css';
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar';
function App() {

  const estiloPagina = {
    backgroundImage: 'url("https://img.freepik.com/free-vector/modern-stylish-hexagonal-background-wallpaper_78370-720.jpg")',


  };

  return (
    <div style={estiloPagina}>
      <Navbar />
      <Dashboard />
    </div>
  );
}

export default App;
