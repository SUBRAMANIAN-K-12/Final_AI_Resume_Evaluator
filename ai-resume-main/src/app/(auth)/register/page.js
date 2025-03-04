"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "./action";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container, Card, Button, Alert } from "react-bootstrap";
import Link from "next/link";
import "./Register.css";

export default function Register() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Validation Schema using Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()

      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/\d/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@, $, !, %, *, ?, &)"
      )
      .required("Password is required"),
    phoneNo: Yup.string()
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
  });

  // Handle Form Submission
  const handleSubmit = async (values, { setSubmitting }) => {
    const response = await registerUser(values);
    setSubmitting(false);
    if (response.success) {
      setMessage("Registration successful! Redirecting...");
      setTimeout(() => router.push("/login"), 2000); // Redirect to login page
    } else {
      setMessage(response.error || "Something went wrong.");
    }
  };

  // Reset form fields when page loads (if needed)
  useEffect(() => {
    setMessage("");
  }, []);

  return (
    <div className="register-bg bg-center h-screen">
      <Container className="register-form-container ">
        <Card className="register-neon-card p-4 text-gray bg-white bg-opacity-10 shadow-lg">
          <h3 className="text-center text-xxl text-black-700 font-bold">
            Register Form
          </h3>
          {message && (
            <Alert
              variant={message.includes("successful") ? "success" : "danger"}
            >
              {message}
            </Alert>
          )}

          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              phoneNo: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ isSubmitting }) => (
              <Form>
                {/* Username Field */}
                <div className="mb-3">
                  <label className="form-label text-xl text-gray-1000 font-bold">
                    Username
                  </label>
                  <Field
                    className="form-control italic text-lg placeholder:text-lg placeholder:italic focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg hover:border-blue-500 transition duration-300 ease-in-out"
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-danger small"
                  />
                </div>

                {/* Email Field */}
                <div className="mb-3">
                  <label className="form-label text-xl text-gray-1000 font-bold">
                    Email
                  </label>
                  <Field
                    className="form-control italic text-lg placeholder:text-lg placeholder:italic focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg hover:border-blue-500 transition duration-300 ease-in-out"
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger small"
                  />
                </div>

                {/* Password Field */}
                <div className="mb-3">
                  <label className="form-label text-xl text-gray-1000 font-bold">
                    Password
                  </label>
                  <Field
                    className="form-control italic text-lg placeholder:text-lg placeholder:italic focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg hover:border-blue-500 transition duration-300 ease-in-out"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    autoComplete="new-password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger small"
                  />
                </div>

                {/* Phone Number Field */}
                <div className="mb-3">
                  <label className="form-label text-xl text-gray-1000 font-bold">
                    Phone Number
                  </label>
                  <Field
                    className="form-control italic text-lg placeholder:text-lg placeholder:italic focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg hover:border-blue-500 transition duration-300 ease-in-out"
                    type="text"
                    name="phoneNo"
                    placeholder="Enter phone number"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="phoneNo"
                    component="div"
                    className="text-danger small"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-100 register-btn"
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </Button>
              </Form>
            )}
          </Formik>

          {/* Login Link */}
          <div className="d-flex justify-content-center align-items-center mt-3">
            <span className="font-weight-bold">Already have an account? </span>
            <Link href="/login" passHref>
              <Button variant="link" className="text-blue">
                Login
              </Button>
            </Link>
          </div>
        </Card>
      </Container>
    </div>
  );
}
