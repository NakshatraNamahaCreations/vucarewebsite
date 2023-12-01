import React, { useState } from "react";
import Button from "@mui/material/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import WifiCalling3Icon from "@mui/icons-material/WifiCalling3";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Offcanvas from "react-bootstrap/Offcanvas";

import Form from "react-bootstrap/Form";

import NavDropdown from "react-bootstrap/NavDropdown";
export default function NabarCompo() {
  const storedUserDataJSON = sessionStorage.getItem("userdata");

  let userData = null;
  try {
    userData = JSON.parse(storedUserDataJSON);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    sessionStorage.removeItem("userdata");
    window.location.reload("/");
  };

  const phoneNumber = "9980670037";
  const openWhatsapp = () => {
    const internationalPhoneNumber = `+${phoneNumber}`;
    const whatsappLink = `https://wa.me/${internationalPhoneNumber}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <Navbar expand="lg " bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand className="clr fnt bg-white  rounded-lg brd p-1" href="/">
          <img src="..\images\vucarpng.png" width={200} height={46} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav wiauto" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="clr fnt me-2">
            <a href={`tel:${phoneNumber}`} className="text-decoration-none">
              <Button variant="outlined" size="medium">
                <span className="me-2">
                  <WifiCalling3Icon style={{ color: "skyblue" }} />
                </span>{" "}
                <span className="text-dark">+91 9980670037</span>
              </Button>
            </a>
          </Nav>

          {userData !== null && userData !== undefined ? (
            <Nav className="clr fnt me-2 " onClick={handleShow}>
              <Button
                className="text-dark  responvm "
                variant="outlined"
                size="medium"
              >
                <img
                  width={30}
                  height={30}
                  src={`http://api.thevucare.com/customer/${userData?.customerprofile}`}
                  className="me-2"
                  alt=""
                  style={{ borderRadius: "100px" }}
                />{" "}
                {userData.customerName}
              </Button>
            </Nav>
          ) : (
            <Nav className="clr fnt ">
              <Button
                className="text-dark responvm   me-2"
                variant="outlined"
                size="medium"
                href="/login"
              >
                Login
              </Button>
              <Button
                className="text-dark  responvm  me-2"
                variant="outlined"
                size="medium"
                href="/register"
              >
                Sign Up
              </Button>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
      <Offcanvas placement="end" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p>
            Name :{" "}
            {userData?.customerName &&
              userData.customerName.charAt(0).toUpperCase() +
                userData.customerName.slice(1)}
          </p>
          <p>Contact : {userData?.mainContact}</p>
        </Offcanvas.Body>
        <div>
          <p
            className="ms-2"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            Logout
          </p>
        </div>
      </Offcanvas>
    </Navbar>
  );
}
