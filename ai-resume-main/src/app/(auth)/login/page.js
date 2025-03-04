"use client";

import './Login.css';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "./action";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container, Card, Button, Alert } from "react-bootstrap";
import Link from 'next/link';

export default function Login() {
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const response = await loginUser(values);
    setSubmitting(false);

    if (response.success) {
      setMessage("Login successful!");
      router.push("/dashboard");
    } else {
      setMessage(response.error || "Invalid credentials.");
    }
  };

  return (
    <div className="login-bg bg-center h-screen">
      <Container className="d-flex justify-content-center align-items-center h-full">
        <Card className="login-card-neon p-4 text-gray bg-dark bg-opacity-10 shadow-lg">
          <h2 className="text-center">Login Form</h2>
          {message && <Alert variant={message.includes("successful") ? "success" : "danger"}>{message}</Alert>}

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label className="form-label text-xl text-black-1000 font-bold">Email</label>
                  <Field
                    className="form-control login-input"
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    autoComplete="off"
                  />
                  <ErrorMessage name="email" component="div" className="text-danger small" />
                </div>

                <div className="mb-3 position-relative">
                  <label className="form-label text-xl text-black-1000 font-bold">Password</label>
                  <Field
                    className="form-control login-input"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter password"
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="position-absolute top-50 end-0 translate-middle-y me-3 border-0 bg-transparent login-eye"
                  >
                    <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
                  </button>
                  <ErrorMessage name="password" component="div" className="text-danger small" />
                </div>

                <Button type="submit" disabled={isSubmitting} className="btn btn-primary w-100 login-btn">
                  Login
                </Button>
              </Form>
            )}
          </Formik>

          

          <div className="mt-3 text-center">
            <span className='create'>Don't have an account? </span>
            <Link href="/register" className="text-blue-1200 hover:underline create-acct">Create</Link>
          </div>
        </Card>
      </Container>
    </div>
  );
}

