import './App.css';
import Footer from './Components/Footer/Footer';
import { Commentp } from './Components/PrivatePage/Commentp';
import Navbar from './Navbar/Navbar';
import { Routes } from './Routes/Routes';

function App() {
  return (
    <div className='App'>
      <Navbar />
      {/* <Routes/>
      <Footer/> */}
      <Commentp />
    </div>
  );
}

export default App;
