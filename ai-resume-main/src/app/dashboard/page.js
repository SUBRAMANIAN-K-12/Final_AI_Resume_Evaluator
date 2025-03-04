"use client";

import { useState, useEffect } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import Link from "next/link";
import ProfileDisplay from "../../components/ProfileDisplay";
import History from "./../../components/History";
import {
  HouseFill,
  PersonFill,
  BoxArrowRight,
  List,
  ClockHistory,
} from "react-bootstrap-icons";
import { PersonCheck } from "react-bootstrap-icons";
import { useRouter } from "next/navigation";
import "./Dashboard.css";
import { fetchUserProfile } from "./../../service/profile";
import logout from "./../../service/logout";
const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showPopup, setShowPopup] = useState(true);
  const [username, setUsername] = useState(""); // state for username
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => setShowPopup(false), 3000);

    // Example of getting username from localStorage
    async function loadProfile() {
      const data = await fetchUserProfile();
      if (data) {
        setUsername(data.username);
      }
    }
    loadProfile();
  }, []);

  const handleLogout = async () => {
    console.log("Logout button clicked");
    try {
      await logout();
      // console.log("Logout API call success");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="dashboard-container" style={{ backgroundColor: "black" }}>
      <div className="top-right-username">
        <PersonCheck size={25} />
        Welcome,<span className="username-highlight">{username}!</span>
      </div>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <Button
          variant="light"
          className="menu-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          <List size={24} />
        </Button>

        <nav className="nav-links">
          <NavItem
            icon={<HouseFill size={24} />}
            label="Home"
            isOpen={isOpen}
            onClick={() => setActiveSection("home")}
          />
          <NavItem
            icon={<PersonFill size={24} />}
            label="Profile"
            isOpen={isOpen}
            onClick={() => setActiveSection("profile")}
          />
          <NavItem
            icon={<ClockHistory size={24} />}
            label="History"
            isOpen={isOpen}
            onClick={() => setActiveSection("history")}
          />
          <NavItem
            icon={<BoxArrowRight size={24} />}
            label="Logout"
            isOpen={isOpen}
            onClick={handleLogout}
          />
        </nav>
      </div>

      <Container fluid className={`main-content ${isOpen ? "shift" : ""}`}>
        {showPopup && (
          <div className="welcome-popup">
            🚀 Welcome to Your Career Gateway! 🚀
          </div>
        )}

        {activeSection === "home" && (
          <>
            <Row className="text-center">
              <Col md={8}>
                <h1 className="neon-title">AI-Powered Resume Evaluator</h1>
                <p className="neon-text">
                  Elevate your career with AI-driven insights and job matching.
                </p>
              </Col>
            </Row>

            <Row className="card-row">
              <Col md={3} className="feature-card-container d-flex">
                <FeatureCard
                  title="Generate Your Resume"
                  link="/dashboard/generate_resume"
                  img="/assets/images/generate-resume.jpg"
                />
              </Col>
              <Col md={3} className="feature-card-container d-flex">
                <FeatureCard
                  title="Analyze Resume Quality"
                  link="/dashboard/analyzeresume"
                  img="/assets/images/upload-resume.jpg"
                />
              </Col>
              <Col md={3} className="feature-card-container d-flex">
                <FeatureCard
                  title="Resume Matching with Job Description"
                  link="/dashboard/jobdescription"
                  img="/assets/images/Job.webp"
                />
              </Col>
            </Row>
          </>
        )}

        {activeSection === "profile" && <ProfileDisplay />}

        {activeSection === "history" && <History></History>}
      </Container>
    </div>
  );
};

const NavItem = ({ icon, label, isOpen, onClick }) => (
  <button onClick={onClick} className="nav-item">
    {icon}
    {isOpen && <span>{label}</span>}
  </button>
);

const FeatureCard = ({ title, link, img }) => (
  <Link href={link} className="feature-card w-100">
    <Card className="neon-card h-100 d-flex flex-column">
      <Card.Img variant="top" src={img} className="card-img" />
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title className="neon-card-title">{title}</Card.Title>
      </Card.Body>
    </Card>
  </Link>
);

export default Dashboard;
