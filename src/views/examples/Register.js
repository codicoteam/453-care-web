import CustomSpin from "components/customised_spins/customised_sprin";
import { showMessage } from "helper/feedback_message_helper";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
import registerUser from "services/auth_services/register_service";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    profilePicture: "",
    password: "",
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await registerUser(formData);
  
      console.log("Response:", response);
      showMessage('success', 'Account created successfully!');
        navigate('/auth/mydashoard');
    } catch (err) {
      showMessage('error', err.response?.data?.message || 'Something went wrong!');
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
        backgroundColor: "#f8f9fe",
      }}
    >
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent ">
            <div className="text-center">
              <h2>Sign Up to TH Care</h2>
            </div>

            <div className="text-center">
              <h4>Lets sign up quickly to get started</h4>
            </div>
            
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form onSubmit={handleSubmit}>
           
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="firstName"
                    placeholder="First Name"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="lastName"
                    placeholder="Last Name"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </FormGroup>
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
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-mobile-button" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="contactNumber"
                    placeholder="Contact Number"
                    type="text"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-image" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    name="profilePicture"
                    placeholder="Profile Picture URL"
                    type="text"
                    value={formData.profilePicture}
                    onChange={handleChange}
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
           
              <div className="text-center">
                {loading && <CustomSpin />}
                {!loading && (
                  <Button className="mt-4" color="primary" type="submit">
                    Create account
                  </Button>
                )}
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};

export default Register;
