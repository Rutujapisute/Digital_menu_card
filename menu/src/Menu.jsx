import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {BrowserRouter as Router,Routes,Route,Link } from "react-router-dom"
import Home from'./Home'
import About from './About'
import Contact from './Contact'
import FoodCategory from './FoodCategory';
import Reservation from './Reservation';
import Qty from './Qty'
function Menu()
{
  return (
    <Router>
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1"><Link to="/" className="text-blue-500">Home</Link></Nav.Link>
            <Nav.Link href="#action2"><Link to="/About" className="text-blue-500">About</Link></Nav.Link>
            <Nav.Link href="#action2"><Link to="/Contact" className="text-blue-500">Contact</Link></Nav.Link>
            <Nav.Link href="#action2"><Link to="/FoodCategory" className="text-blue-500">Food Catrgory</Link></Nav.Link>
            <Nav.Link href="#action2"><Link to="/Qty" className="text-blue-500">Quantity master</Link></Nav.Link>
            <Nav.Link href="#action2"><Link to="/Reservation" className="text-blue-500">Book Table</Link></Nav.Link>
            </Nav>
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/About" element={<About/>}></Route>
      <Route path="/Contact" element={<Contact/>}></Route>
      <Route path="/FoodCategory" element={<FoodCategory/>}></Route>
      <Route path="/Qty" element={<Qty/>}></Route>
      <Route path="/Reservation" element={<Reservation/>}></Route>
    </Routes>
    </Router>
  );
}

export default Menu;