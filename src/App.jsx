import React from 'react';
import { Route, Routes, useParams, useNavigate } from 'react-router-dom';
import './App.css';
import Content from './Component/Content/Content';
import Footer from './Component/Footer/Footer';
import Topbar from './Component/Topbar/Topbar';

function App() {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Redirect to default location (Delhi) if no city is specified in the URL
    if (window.location.pathname === '/') {
      navigate('/delhi');
    }
  }, [navigate]);

  return (
    <div className='container'>
      <Topbar />
      <Routes>
        <Route path='/:name' element={<Content />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
