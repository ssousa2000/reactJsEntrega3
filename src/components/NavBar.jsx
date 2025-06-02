import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import CartWidget from './CartWidget';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Mi tienda</Link>
        <div className="collapse navbar-collapse d-flex justify-content-between">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                to="/category/vehiculos"
                className={({ isActive }) => `nav-link${isActive ? ' text-white fw-bold' : ''}`}
              >
                Vehículos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/category/electronica"
                className={({ isActive }) => `nav-link${isActive ? ' text-white fw-bold' : ''}`}
              >
                Electrónica
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/category/libros"
                className={({ isActive }) => `nav-link${isActive ? ' text-white fw-bold' : ''}`}
              >
                Libros
              </NavLink>
            </li>
          </ul>
          {/* Aquí está el CartWidget */}
          <div className="d-flex align-items-center">
            <CartWidget />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
