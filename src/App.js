import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Messenger from './Pages/Messenger';

import { Routes } from './Routes/Routes';

function App() {
  return (
    <div className='App'>

      <Navbar />
  
  <Routes />
      {/* <Messenger /> */}
      {/* <Footer/>  */}
      {/* <Commentp /> */}
    </div>
  );
}

export default App;
