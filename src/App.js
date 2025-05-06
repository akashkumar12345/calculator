import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Navbar from './Dashboard/NavBar';
import LiveRatesPage from './Pages/LiveRatesPage';
import ErrorPage from './Pages/ErrorPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />  {/* Add Navbar here */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/exchange" element={< LiveRatesPage/>} />
          <Route path="error" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
