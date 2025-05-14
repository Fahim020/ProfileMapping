import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProfileDetailsPage from './pages/ProfileDetailsPage';
import AdminPage from './pages/AdminPage';
import './styles/main.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile/:id" element={<ProfileDetailsPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={
              <div className="not-found">
                <h2>404 - Page Not Found</h2>
                <p>The page you are looking for does not exist.</p>
              </div>
            } />
          </Routes>
        </main>
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Profile Mapper. All rights reserved.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
