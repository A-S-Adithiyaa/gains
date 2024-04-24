import React, { useEffect, useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import Nav from "react-bootstrap/Nav";
import PersonalInfo from "./PersonalInfo"; // Import your components for different menu items
import EmailsAndPassword from "./EmailsAndPassword";
import InstitutionDetails from "./InstitutionDetails";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import session from "../../Variables";

const ProfileLanding = () => {
  const navigate = useNavigate("");

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === null) {
      navigate("/");
    }
  });
  const [activeMenuItem, setActiveMenuItem] = useState("personal-info"); // State to track active menu item

  let activeComponent;
  if (activeMenuItem === "personal-info") {
    activeComponent = <PersonalInfo />;
  } else if (activeMenuItem === "emails-and-password") {
    activeComponent = <EmailsAndPassword />;
  } else if (activeMenuItem === "institution-details") {
    activeComponent = <InstitutionDetails />;
  }

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="personalInfo">
      <Row className="give-both-margins">
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="personalInfo">Personal Info</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="emailsAndPasswords">
                Emails & Passwords
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="instituteDetails">Institute Details</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="personalInfo">
              <PersonalInfo />
            </Tab.Pane>
            <Tab.Pane eventKey="emailsAndPasswords">
              <EmailsAndPassword />
            </Tab.Pane>
            <Tab.Pane eventKey="instituteDetails">
              <InstitutionDetails />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default ProfileLanding;
