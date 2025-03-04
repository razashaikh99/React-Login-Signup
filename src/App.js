import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css"
import Login from './Component/Login';
import NotFound from './Component/NotFound';
import Signup from './Component/Signup';
import EmployeeForm from './Component/EmployeeForm';
import GetData from './Component/GetData';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/form" element={<EmployeeForm />} />
          <Route path="/data" element={<GetData />} />
          <Route path="*" element={<NotFound />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
