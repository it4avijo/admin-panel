import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../Routes/BaseUrl";
import { toast } from "react-toastify";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";

export const GeneralInfoForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: "",
    fullName: "",
    emailId: "",
    mobileNumber: "",
    companyLegalName: "",
    password: "",
    gstNo: "",
    panNo: "",
    addressLineNo1: "",
    addressLineNo2: "",
    cityDistrict: "",
    pincode: "",
    state: "",
    countryRegion: "",
    bankAccountName: "",
    bankAccountNumber: "",
    ifscCode: "",
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
    if (currentStep === 2) {
      if (!formData.emailOTP) newErrors.emailOTP = "Email OTP is required";
      if (!formData.mobileOTP) newErrors.mobileOTP = "Mobile OTP is required";
    }
    if (currentStep === 3) {
      if (!formData.businessName)
        newErrors.businessName = "Business Name is required";
      if (!formData.companyLegalName)
        newErrors.companyLegalName = "Company Legal Name is required";
      if (!formData.gstNo) newErrors.gstNo = "GST Number is required";
      if (!formData.panNo) newErrors.panNo = "PAN Number is required";
      if (!formData.addressLineNo1)
        newErrors.addressLineNo1 = "Address Line 1 is required";
      if (!formData.cityDistrict)
        newErrors.cityDistrict = "City/District is required";
      if (!formData.pincode) newErrors.pincode = "Pin Code is required";
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.countryRegion)
        newErrors.countryRegion = "Country/Region is required";
      if (!formData.bankAccountName)
        newErrors.bankAccountName = "Bank Account Name is required";
      if (!formData.bankAccountNumber)
        newErrors.bankAccountNumber = "Bank Account Number is required";
      if (!formData.ifscCode) newErrors.ifscCode = "IFSC Code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (currentStep === 1) {
        const response = await axios.post(BaseUrl + `/hppAuth/hppAuthCreate`, {
          emailId: formData.emailId,
          mobileNumber: formData.mobileNumber,
        });
        console.log(response);
        setCurrentStep(2);
      } else if (currentStep === 3) {
        const response = await axios.post(BaseUrl + `/hppAuth/hppAuthProfile`, {
          businessName: formData.businessName,
          fullName: formData.fullName,
          emailId: formData.emailId,
          mobileNumber: formData.mobileNumber,
          companyLegalName: formData.companyLegalName,
          gstNo: formData.gstNo,
          panNo: formData.panNo,
          addressLineNo1: formData.addressLineNo1,
          addressLineNo2: formData.addressLineNo2,
          cityDistrict: formData.cityDistrict,
          pincode: formData.pincode,
          state: formData.state,
          countryRegion: formData.countryRegion,
          bankAccountName: formData.bankAccountName,
          bankAccountNumber: formData.bankAccountNumber,
          ifscCode: formData.ifscCode,
        });
        console.log(response);
        if (response.status === 200) {
          navigate("/HPPList");
        }
        toast.success("Profile created successfully");
      } else {
        console.log("API not working");
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
      const response = await axios.post(BaseUrl + `/hppAuth/hppVerifyOTP`, {
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
                    type="tel"
                    placeholder="Enter your Password"
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
            <h5 className="mb-4">Business Information</h5>
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
                <Form.Group id="companyLegalName">
                  <Form.Label>Company Legal Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your company legal name"
                    value={formData.companyLegalName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        companyLegalName: e.target.value,
                      })
                    }
                    isInvalid={!!errors.companyLegalName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.companyLegalName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="gstNo">
                  <Form.Label>GST Number</Form.Label>
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
                  <Form.Label>PAN Number</Form.Label>
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
              <Col md={6} className="mb-3">
                <Form.Group id="addressLineNo2">
                  <Form.Label>Address Line 2</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your address line 2"
                    value={formData.addressLineNo2}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        addressLineNo2: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="cityDistrict">
                  <Form.Label>City/District</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your city/district"
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
              <Col md={6} className="mb-3">
                <Form.Group id="pincode">
                  <Form.Label>Pin Code</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your pin code"
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
            </Row>
            <Row>
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
              <Col md={6} className="mb-3">
                <Form.Group id="countryRegion">
                  <Form.Label>Country/Region</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your country/region"
                    value={formData.countryRegion}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        countryRegion: e.target.value,
                      })
                    }
                    isInvalid={!!errors.countryRegion}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.countryRegion}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="bankAccountName">
                  <Form.Label>Bank Account Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your bank account name"
                    value={formData.bankAccountName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bankAccountName: e.target.value,
                      })
                    }
                    isInvalid={!!errors.bankAccountName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.bankAccountName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="bankAccountNumber">
                  <Form.Label>Bank Account Number</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your bank account number"
                    value={formData.bankAccountNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bankAccountNumber: e.target.value,
                      })
                    }
                    isInvalid={!!errors.bankAccountNumber}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.bankAccountNumber}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="ifscCode">
                  <Form.Label>IFSC Code</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your IFSC code"
                    value={formData.ifscCode}
                    onChange={(e) =>
                      setFormData({ ...formData, ifscCode: e.target.value })
                    }
                    isInvalid={!!errors.ifscCode}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.ifscCode}
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
        <Form onSubmit={handleFormSubmit}>{renderStep()}</Form>
      </Card.Body>
    </Card>
  );
};
