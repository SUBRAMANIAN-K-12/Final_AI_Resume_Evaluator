"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import Logo from "./../../public/assets/images/logo.png"; // Update with the actual path to your logo

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-md">
      <Container fluid>
        <Navbar.Brand className="d-flex align-items-center">
          <Image
            src={Logo}
            alt="Logo"
            width={50} // Adjust size as needed
            height={50} // Adjust size as needed
            className="me-2"
          />
          <Link href="/" className="text-white font-bold text-xl text-decoration-none">
            AI Resume Evaluator And Generator
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Nav className="ms-auto">
          <Link href="/login" passHref legacyBehavior>
            <Nav.Link className="d-flex align-items-center text-white transition-all duration-300 hover:text-primary">
              <FaSignInAlt className="me-2" /> Login
            </Nav.Link>
          </Link>
          <Link href="/register" passHref legacyBehavior>
            <Nav.Link className="d-flex align-items-center text-white transition-all duration-300 hover:text-primary">
              <FaUserPlus className="me-2" /> Sign Up
            </Nav.Link>
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
