import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  InputGroup,
} from "@themesberg/react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BaseUrl } from "../Routes/BaseUrl";
import { toast } from "react-toastify";

export const GeneralInfoForm = () => {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    emailOTP: "",
    mobileOTP: "",
    dateOfBirth: "",
  });
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateMobile = (mobile) => {
    const re = /^[0-9]{10}$/;
    return re.test(String(mobile));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email is not valid";
    }
    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!validateMobile(formData.mobile)) {
      newErrors.mobile = "Mobile number is not valid";
    } else if (!formData.password) {
      toast.error("Password is Required");
    }
    if (currentStep === 2) {
      if (!formData.mobileOTP) newErrors.mobileOTP = "Mobile OTP is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (currentStep === 1) {
        const response = await axios.post(BaseUrl + `/user/register`, {
          // emailId: formData.email,
          mobileNumber: formData.mobile,
        });
        console.log(response);
        setCurrentStep(2);
      } else {
        console.log("api not working");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response.status === 400) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleOTPVerification = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post(BaseUrl + `/user/verify`, {
        fullName: formData.fullName,
        password: formData.password,
        emailId: formData.email,
        mobileNumber: formData.mobile,
        otp: formData.mobileOTP,
        dateOfBirth: formData.dateOfBirth,
      });
      console.log(response);
      if (response.status === 200) {
        Navigate("/UserList");
      }
      toast.success("Profile created successfully");
    } catch (error) {
      console.error("Error:", error);
      if (error.response.status === 400) {
        toast.error(error.response.data.message);
      }
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h5 className="mb-4">General Information</h5>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="fullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    isInvalid={!!errors.fullName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fullName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="mobile">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    required
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                    isInvalid={!!errors.mobile}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.mobile}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>{" "}
              <Col md={6} className="mb-3">
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="dateOfBirth">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Enter your date of birth"
                    value={formData.dateOfBirth}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dateOfBirth: e.target.value,
                      })
                    }
                    isInvalid={!!errors.dateOfBirth}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dateOfBirth}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <div className="mt-3">
              <Button variant="primary" onClick={handleFormSubmit}>
                OTP Send
              </Button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h5 className="mb-4">OTP Verification</h5>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="mobileOTP">
                  <Form.Label>Enter Mobile OTP</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter OTP received on your mobile"
                    value={formData.mobileOTP}
                    onChange={(e) =>
                      setFormData({ ...formData, mobileOTP: e.target.value })
                    }
                    isInvalid={!!errors.mobileOTP}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.mobileOTP}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <div className="mt-3">
              <Button variant="primary" onClick={handleOTPVerification}>
                Verify OTP
              </Button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <Form>
          <h5 className="mb-4">Doctor Registration Form</h5>
          {renderStep()}
        </Form>
      </Card.Body>
    </Card>
  );
};
