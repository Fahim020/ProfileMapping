import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <h1>Profile Mapper</h1>
        </Link>
      </div>
      
      <ul className="navbar-nav">
        <li className={`nav-item ${isActive('/')}`}>
          <Link to="/" className="nav-link">Profiles</Link>
        </li>
        <li className={`nav-item ${isActive('/admin')}`}>
          <Link to="/admin" className="nav-link">Admin</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar; 