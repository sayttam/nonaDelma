import 'bootstrap/dist/css/bootstrap.min.css';
import './NavBar.css'
import logo from '/img/logo-nobg.png'
import CartWidget from '../CartWidget/CartWidget'

import { Navbar, Nav, Button } from 'react-bootstrap';

const NavBar = () => {
  return (

    <Navbar bg="light" expand="xl" className="navBar">
      <Navbar.Brand href="#" style={{ position: 'relative', left: '10px' }}><img src={logo} alt="Nona Delma" style={{ height: '65px' }} /></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#inicio">Inicio</Nav.Link>
          <Nav.Link href="#productos">Productos</Nav.Link>
          <Nav.Link href="#contacto">Contacto</Nav.Link>
          <Nav.Link href="#acerca-de">Acerca de</Nav.Link>
          <CartWidget />
          <Button variant="outline-primary">Iniciar Sesión</Button>
        </Nav>

      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;