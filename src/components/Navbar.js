import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import NavDropdown from "react-bootstrap/NavDropdown";
import { IoIosContact } from "react-icons/io";

function NavbarSection() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") || false;

  const logout = () => {
    localStorage.clear();
    window.location.reload(true);
  };

  return (
    <Navbar key={"lg"} expand={"lg"} className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand className="gains-logo" href="#/">
          G<span className="ai-colored">AI</span>NS
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-lg`}
          aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
          placement="end"
          className="offcanvas_mobile"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title
              className="gains-logo"
              id={`offcanvasNavbarLabel-expand-lg`}
            >
              G<span className="ai-colored">AsdfsdfI</span>NS
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-center flex-grow-1 pe-3">
              <Nav.Link className="nav-links" href="#/learn">
                LEARN
              </Nav.Link>
              <Nav.Link className="nav-links" href="#/notes">
                NOTES
              </Nav.Link>
              <Nav.Link className="nav-links" href="#/assessments">
                ASSESSMENTS
              </Nav.Link>
              <Nav.Link className="nav-links" href="#/questions">
                QUESTIONS
              </Nav.Link>
            </Nav>

            <Nav>
              {console.log(isLoggedIn)}
              {!isLoggedIn ? (
                <>
                  <Button
                    href="#/login"
                    className="login-button button-navbar"
                    variant="dark"
                  >
                    LOGIN
                  </Button>
                  {/* <Button
                    href="#/signup"
                    className="button-navbar"
                    variant="dark"
                  >
                    Sign Up
                  </Button> */}
                </>
              ) : (
                <NavDropdown
                  id="dropdown-menu-align-end"
                  title={<IoIosContact size={30} />}
                  align="end"
                >
                  <NavDropdown.Item href="#/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="#/history">History</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={() => logout()}
                    // onSelect={logout()}
                  >
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default NavbarSection;
