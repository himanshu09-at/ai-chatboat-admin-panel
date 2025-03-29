import './App.css';
import { Home } from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Tables } from './components/Tables';
import  UpdateTable  from './components/UpdateForm';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/update-table" element={<UpdateTable />} />
          
        </Routes>
      </BrowserRouter>
  );
}

export default App;
