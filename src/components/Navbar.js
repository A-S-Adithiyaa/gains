import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

function NavScrollExample() {
  return (
    <Navbar
      //   bg="dark"
      //   data-bs-theme="dark"
      key={"lg"}
      expand={"lg"}
      className="bg-body-tertiary mb-3"
    >
      <Container fluid>
        <Navbar.Brand href="#">GAINS</Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-lg`}
          aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
              GAINS
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-center flex-grow-1 pe-3">
              <Nav.Link className="nav-links" href="#action1">
                LEARN
              </Nav.Link>
              <Nav.Link className="nav-links" href="#action2">
                NOTES
              </Nav.Link>
              <Nav.Link className="nav-links" href="#action3">
                ASSESSMENTS
              </Nav.Link>
              <Nav.Link className="nav-links" href="#action4">
                QUESTIONS
              </Nav.Link>
              {/* <NavDropdown
                title="Dropdown"
                id={`offcanvasNavbarDropdown-expand-lg`}
              >
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>

            <Nav>
              <Button className="button-navbar" variant="dark">
                Log In
              </Button>
              <Button className="button-navbar" variant="dark">
                Sign Up
              </Button>
            </Nav>
            {/* <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form> */}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
