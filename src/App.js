import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css"
import Welcome from './Component/Welcome';
import Login from './Component/Login';
import NotFound from './Component/NotFound';
import Signup from './Component/Signup';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="*" element={<NotFound />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
