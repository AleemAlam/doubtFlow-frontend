import './App.css';
import Footer from './Components/Footer/Footer';
import Navbar from './Navbar/Navbar';
import { Routes } from './Routes/Routes';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes/>
      <Footer/>
    </div>
  );
}

export default App;
