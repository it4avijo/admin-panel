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
    title: "",
    specialization: "",
    experience: 0,
    gender: "",
    dateOfBirth: "",
    password: "",
    degree: "",
    collegeUniversity: "",
    year: 0,
    city: "",
    colonyStreetLocality: "",
    country: "",
    pinCode: "",
    state: "",
    registrationNumber: "",
    registrationCouncil: "",
    registrationYear: 0,
    emailOTP: "",
    mobileOTP: "",
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
      if (!formData.emailOTP) newErrors.emailOTP = "Email OTP is required";
      if (!formData.mobileOTP) newErrors.mobileOTP = "Mobile OTP is required";
    }
    if (currentStep === 3) {
      if (!formData.title) newErrors.title = "Title is required";
      if (!formData.specialization)
        newErrors.specialization = "Specialization is required";
      if (!formData.experience) newErrors.experience = "Experience is required";
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.dateOfBirth)
        newErrors.dateOfBirth = "Date of Birth is required";
      if (!formData.degree) newErrors.degree = "Degree is required";
      if (!formData.collegeUniversity)
        newErrors.collegeUniversity = "College/University is required";
      if (!formData.year) newErrors.year = "Year of Graduation is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.colonyStreetLocality)
        newErrors.colonyStreetLocality = "Colony/Street/Locality is required";
      if (!formData.country) newErrors.country = "Country is required";
      if (!formData.pinCode) newErrors.pinCode = "Pin Code is required";
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.registrationNumber)
        newErrors.registrationNumber = "Registration Number is required";
      if (!formData.registrationCouncil)
        newErrors.registrationCouncil = "Registration Council is required";
      if (!formData.registrationYear)
        newErrors.registrationYear = "Registration Year is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (currentStep === 1) {
        const response = await axios.post(BaseUrl + `/doctor/doctorCreate`, {
          emailId: formData.email,
          mobileNumber: formData.mobile,
        });
        console.log(response);
        setCurrentStep(2);
      } else if (currentStep === 3) {
        const response = await axios.post(BaseUrl + `/doctor/doctorProfile`, {
          fullName: formData.fullName,
          email: formData.email,
          mobile: formData.mobile,
          title: formData.title,
          specialization: formData.specialization,
          experience: formData.experience,
          gender: formData.gender,
          dateOfBirth: formData.dateOfBirth,
          degree: formData.degree,
          collegeUniversity: formData.collegeUniversity,
          year: formData.year,
          city: formData.city,
          colonyStreetLocality: formData.colonyStreetLocality,
          country: formData.country,
          pinCode: formData.pinCode,
          state: formData.state,
          registrationNumber: formData.registrationNumber,
          registrationCouncil: formData.registrationCouncil,
          registrationYear: formData.registrationYear,
        });
        console.log(response);
        if (response.status === 200) {
          Navigate("/DoctorList");
        }
        toast.success("Profile Create successfully");
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
      const response = await axios.post(BaseUrl + `/doctor/doctorVerify`, {
        fullName: formData.fullName,
        password: formData.password,
        emailId: formData.email,
        emailOTP: formData.emailOTP,
        mobileNumber: formData.mobile,
        mobileOTP: formData.mobileOTP,
      });
      console.log(response);
      setCurrentStep(3);
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
                    placeholder="Enter your Passoword"
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
                <Form.Group id="emailOTP">
                  <Form.Label>Enter Email OTP</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter OTP received on your email"
                    value={formData.emailOTP}
                    onChange={(e) =>
                      setFormData({ ...formData, emailOTP: e.target.value })
                    }
                    isInvalid={!!errors.emailOTP}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.emailOTP}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
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
      case 3:
        return (
          <>
            <h5 className="mb-4">Profile Information</h5>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    isInvalid={!!errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="specialization">
                  <Form.Label>Specialization</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your specialization"
                    value={formData.specialization}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specialization: e.target.value,
                      })
                    }
                    isInvalid={!!errors.specialization}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.specialization}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="experience">
                  <Form.Label>Experience</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter your experience"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                    isInvalid={!!errors.experience}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.experience}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="gender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your gender"
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    isInvalid={!!errors.gender}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.gender}
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
              <Col md={6} className="mb-3">
                <Form.Group id="degree">
                  <Form.Label>Degree</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your degree"
                    value={formData.degree}
                    onChange={(e) =>
                      setFormData({ ...formData, degree: e.target.value })
                    }
                    isInvalid={!!errors.degree}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.degree}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="collegeUniversity">
                  <Form.Label>College/University</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your college/university"
                    value={formData.collegeUniversity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        collegeUniversity: e.target.value,
                      })
                    }
                    isInvalid={!!errors.collegeUniversity}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.collegeUniversity}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="year">
                  <Form.Label>Year of Graduation</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter your year of graduation"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: e.target.value })
                    }
                    isInvalid={!!errors.year}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.year}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="city">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    isInvalid={!!errors.city}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.city}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="colonyStreetLocality">
                  <Form.Label>Colony/Street/Locality</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your colony/street/locality"
                    value={formData.colonyStreetLocality}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        colonyStreetLocality: e.target.value,
                      })
                    }
                    isInvalid={!!errors.colonyStreetLocality}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.colonyStreetLocality}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="country">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your country"
                    value={formData.country}
                    onChange={(e) =>
                      setFormData({ ...formData, country: e.target.value })
                    }
                    isInvalid={!!errors.country}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.country}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="pinCode">
                  <Form.Label>Pin Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your pin code"
                    value={formData.pinCode}
                    onChange={(e) =>
                      setFormData({ ...formData, pinCode: e.target.value })
                    }
                    isInvalid={!!errors.pinCode}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.pinCode}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="state">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your state"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                    isInvalid={!!errors.state}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.state}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="registrationNumber">
                  <Form.Label>Registration Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your registration number"
                    value={formData.registrationNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        registrationNumber: e.target.value,
                      })
                    }
                    isInvalid={!!errors.registrationNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.registrationNumber}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="registrationCouncil">
                  <Form.Label>Registration Council</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your registration council"
                    value={formData.registrationCouncil}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        registrationCouncil: e.target.value,
                      })
                    }
                    isInvalid={!!errors.registrationCouncil}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.registrationCouncil}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="registrationYear">
                  <Form.Label>Registration Year</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter your registration year"
                    value={formData.registrationYear}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        registrationYear: e.target.value,
                      })
                    }
                    isInvalid={!!errors.registrationYear}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.registrationYear}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <div className="mt-3">
              <Button variant="primary" onClick={handleFormSubmit}>
                Create Profile
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
        <Form onSubmit={handleFormSubmit}>{renderStep()}</Form>
      </Card.Body>
    </Card>
  );
};
