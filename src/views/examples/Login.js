import CustomSpin from "components/customised_spins/customised_sprin";
import { showMessage } from "helper/feedback_message_helper";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoHtc from "../../assets/img/brand/logoHtc.jpeg";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import loginUser from "services/auth_services/login_service";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await loginUser(formData);
      console.log("Response:", response);
      showMessage("success", "Login successfully!");
      navigate("/auth/mycarer");
    } catch (err) {
      showMessage("error", err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to bottom, #6a11cb, #2575fc)",
        position: "relative",
        overflow: "hidden",
      }}
    >

{/* ../../assets/img/brand/logoHtc.jpeg */}
      {/* Background image with transparency */}
      <img
         src={logoHtc}
        alt="Background"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.1, // Adjust transparency level
          zIndex: 0,
        }}
      />
      <Col lg="5" md="7" style={{ zIndex: 1 }}>
        <Card
          className="shadow-lg border-0"
          style={{
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <CardHeader
            className="text-center text-white"
            style={{
              background: "linear-gradient(45deg, #d3d3d3, #f5f5f5)",
              padding: "1.5rem",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            Welcome To THC
          </CardHeader>
          <CardBody
            className="px-lg-5 py-lg-5"
            style={{
              backgroundColor: "#fff",
              borderRadius: "20px",
            }}
          >
            <div className="text-center text-muted mb-4">
              <small>Sign in with your credentials</small>
            </div>
            <Form onSubmit={handleSubmit} role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </FormGroup>
              <div className="d-flex justify-content-between align-items-center">
                <a
                  href="#forgot-password"
                  className="text-muted"
                  style={{ fontSize: "0.85rem" }}
                >
                  Forgot Password?
                </a>
              </div>
              <div className="text-center mt-4">
                {loading && <CustomSpin />}
                {!loading && (
                  <Button
                    color="primary"
                    type="submit"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: "10px",
                    }}
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="12" className="text-center">
            <a href="#create-account" className="text-light">
              <small>Create a new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </div>
  );
};

export default Login;
