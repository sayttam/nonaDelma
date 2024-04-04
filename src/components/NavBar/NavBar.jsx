import 'bootstrap/dist/css/bootstrap.min.css'
import './NavBar.css'
import logo from '/img/logo-nobg.png'
import CartWidget from '../CartWidget/CartWidget'
import { createContext } from 'react'
import { Navbar, Nav, Button, Dropdown, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { CategoriasContext } from '../../App'
import React, { useContext } from 'react';

const NavBar = ({ user }) => {
  const { setCategoriaSeleccionada } = useContext(CategoriasContext);

  const handleLogout = () => {
    console.log('Logout')
  }

  const handleCategorySelect = (categoria) => {
    setCategoriaSeleccionada(categoria);
  }

  return (
    <Navbar bg="light" expand="xl" className="navBar">
      <Navbar.Brand href="#" style={{ position: 'relative', left: '10px' }}>
        <img src={logo} alt="Nona Delma" style={{ height: '65px' }} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Inicio</Nav.Link>
          <NavDropdown title="Productos">
            <NavDropdown.Item as={Link} to="/productos/categorias/telas" onClick={() => handleCategorySelect('telas')}>Telas</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/productos/categorias/lanas" onClick={() => handleCategorySelect('lanas')}>Lanas</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/productos/categorias/merceria" onClick={() => handleCategorySelect('merceria')}>Merceria</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/productos/categorias/blanqueria" onClick={() => handleCategorySelect('blanqueria')}>Blanqueria</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
          <Nav.Link as={Link} to="/acerca-de">Acerca de</Nav.Link>
          <CartWidget />
          {user ? (
            <Dropdown className='userName'>
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                {user.nombre}
              </Dropdown.Toggle>

              <Dropdown.Menu className='logout'>
                <Dropdown.Item onClick={handleLogout}>Cerrar sesión</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Link to='./login'>
              <Button variant="outline-primary">Iniciar Sesión</Button>
            </Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar