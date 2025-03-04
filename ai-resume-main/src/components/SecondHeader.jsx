"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import logout from "./../service/logout";
import Logo from "./../../public/assets/images/logo.png"; // Update with the actual path to your logo

const SecondHeader = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isDashboard = pathname === "/dashboard";

  const handleLogout = async () => {
    console.log("Logout button clicked");
    try {
      await logout();
      console.log("Logout API call success");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
        <Nav className="ms-auto d-flex gap-3">
          {!isDashboard && (
            <Button variant="outline-light" onClick={() => router.back()}>
              Back
            </Button>
          )}

          {!isDashboard &&
            pathname !== "/login" &&
            pathname !== "/register" && (
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default SecondHeader;
