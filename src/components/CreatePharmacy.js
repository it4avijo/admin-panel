import React, { useState } from "react";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../Routes/BaseUrl";
import { toast } from "react-toastify";

export const GeneralInfoForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    emailId: "",
    mobileNumber: "",
    businessName: "",
    businessTitle: "",
    drugLicenceNo: "",
    fssaiLicenceNo: "",
    gstNo: "",
    panNo: "",
    register: "",
    addressLineNo1: "",
    addressLineNo2: "",
    cityDistrict: "",
    pincode: "",
    state: "",
    password: "",
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
    if (!formData.emailId) {
      newErrors.emailId = "Email is required";
    } else if (!validateEmail(formData.emailId)) {
      newErrors.emailId = "Email is not valid";
    }
    if (!formData.mobileNumber) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!validateMobile(formData.mobileNumber)) {
      newErrors.mobileNumber = "Mobile number is not valid";
    }
    if (!formData.password) newErrors.password = "Password is required";

    if (currentStep === 2) {
      if (!formData.emailOTP) newErrors.emailOTP = "Email OTP is required";
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
        const response = await axios.post(
          BaseUrl + `/pharmacy/pharmacyCreate`,
          {
            emailId: formData.emailId,
            mobileNumber: formData.mobileNumber,
          }
        );
        console.log(response);
        setCurrentStep(2);
      } else if (currentStep === 3) {
        const response = await axios.post(
          BaseUrl + `/pharmacy/pharmacyProfile`,
          {
            fullName: formData.fullName,
            emailId: formData.emailId,
            mobileNumber: formData.mobileNumber,
            businessName: formData.businessName,
            businessTitle: formData.businessTitle,
            drugLicenceNo: formData.drugLicenceNo,
            fssaiLicenceNo: formData.fssaiLicenceNo,
            gstNo: formData.gstNo,
            panNo: formData.panNo,
            register: formData.register,
            addressLineNo1: formData.addressLineNo1,
            addressLineNo2: formData.addressLineNo2,
            cityDistrict: formData.cityDistrict,
            pincode: formData.pincode,
            state: formData.state,
          }
        );
        console.log(response);
        if (response.status === 200) {
          navigate("/PharmacyList");
        }
        toast.success("Profile created successfully");
      } else {
        console.log("API not working");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleOTPVerification = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post(BaseUrl + `/pharmacy/pharmacyVerify`, {
        fullName: formData.fullName,
        emailId: formData.emailId,
        emailOTP: formData.emailOTP,
        mobileNumber: formData.mobileNumber,
        mobileOTP: formData.mobileOTP,
        password: formData.password,
      });
      console.log(response);
      setCurrentStep(3);
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 400) {
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
                <Form.Group id="emailId">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Enter your email"
                    value={formData.emailId}
                    onChange={(e) =>
                      setFormData({ ...formData, emailId: e.target.value })
                    }
                    isInvalid={!!errors.emailId}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.emailId}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="mobileNumber">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    required
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={formData.mobileNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, mobileNumber: e.target.value })
                    }
                    isInvalid={!!errors.mobileNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.mobileNumber}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
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
                <Form.Group id="businessName">
                  <Form.Label>Business Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your business name"
                    value={formData.businessName}
                    onChange={(e) =>
                      setFormData({ ...formData, businessName: e.target.value })
                    }
                    isInvalid={!!errors.businessName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.businessName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="businessTitle">
                  <Form.Label>Business Title</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your business title"
                    value={formData.businessTitle}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        businessTitle: e.target.value,
                      })
                    }
                    isInvalid={!!errors.businessTitle}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.businessTitle}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="drugLicenceNo">
                  <Form.Label>Drug Licence No</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your drug licence number"
                    value={formData.drugLicenceNo}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        drugLicenceNo: e.target.value,
                      })
                    }
                    isInvalid={!!errors.drugLicenceNo}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.drugLicenceNo}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="fssaiLicenceNo">
                  <Form.Label>FSSAI Licence No</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your FSSAI licence number"
                    value={formData.fssaiLicenceNo}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fssaiLicenceNo: e.target.value,
                      })
                    }
                    isInvalid={!!errors.fssaiLicenceNo}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fssaiLicenceNo}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="gstNo">
                  <Form.Label>GST No</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your GST number"
                    value={formData.gstNo}
                    onChange={(e) =>
                      setFormData({ ...formData, gstNo: e.target.value })
                    }
                    isInvalid={!!errors.gstNo}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.gstNo}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="panNo">
                  <Form.Label>PAN No</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your PAN number"
                    value={formData.panNo}
                    onChange={(e) =>
                      setFormData({ ...formData, panNo: e.target.value })
                    }
                    isInvalid={!!errors.panNo}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.panNo}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="register">
                  <Form.Label>Register</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your register"
                    value={formData.register}
                    onChange={(e) =>
                      setFormData({ ...formData, register: e.target.value })
                    }
                    isInvalid={!!errors.register}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.register}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="addressLineNo1">
                  <Form.Label>Address Line 1</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your address line 1"
                    value={formData.addressLineNo1}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        addressLineNo1: e.target.value,
                      })
                    }
                    isInvalid={!!errors.addressLineNo1}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.addressLineNo1}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="addressLineNo2">
                  <Form.Label>Address Line 2</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your address line 2"
                    value={formData.addressLineNo2}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        addressLineNo2: e.target.value,
                      })
                    }
                    isInvalid={!!errors.addressLineNo2}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.addressLineNo2}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="cityDistrict">
                  <Form.Label>City/District</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your city or district"
                    value={formData.cityDistrict}
                    onChange={(e) =>
                      setFormData({ ...formData, cityDistrict: e.target.value })
                    }
                    isInvalid={!!errors.cityDistrict}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.cityDistrict}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="pincode">
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your pincode"
                    value={formData.pincode}
                    onChange={(e) =>
                      setFormData({ ...formData, pincode: e.target.value })
                    }
                    isInvalid={!!errors.pincode}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.pincode}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="state">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    required
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
            </Row>
            <div className="mt-3">
              <Button variant="primary" onClick={handleFormSubmit}>
                Submit
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
        <Form>{renderStep()}</Form>
      </Card.Body>
    </Card>
  );
};
