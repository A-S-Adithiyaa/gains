import React, { useState } from "react";
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

const ProfileLanding = () => {
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
    <div style={{ display: "flex", overflow: "scroll initial" }}>
      <CDBSidebar textColor="#000000" backgroundColor="#ffffff">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a className="text-decoration-none" style={{ color: "inherit" }}>
            <div>User Profile</div>
            <div>Management</div>
          </a>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <Nav.Link
              onClick={() => setActiveMenuItem("personal-info")}
              className={
                activeMenuItem === "personal-info" ? "activeClicked" : ""
              }
            >
              <CDBSidebarMenuItem>Personal Info</CDBSidebarMenuItem>
            </Nav.Link>
            <Nav.Link
              onClick={() => setActiveMenuItem("emails-and-password")}
              className={
                activeMenuItem === "emails-and-password" ? "activeClicked" : ""
              }
            >
              <CDBSidebarMenuItem>Emails & Password</CDBSidebarMenuItem>
            </Nav.Link>
            <Nav.Link
              onClick={() => setActiveMenuItem("institution-details")}
              className={
                activeMenuItem === "institution-details" ? "activeClicked" : ""
              }
            >
              <CDBSidebarMenuItem>Institution Details</CDBSidebarMenuItem>
            </Nav.Link>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
      <div>{activeComponent}</div>
    </div>
  );
};

export default ProfileLanding;
