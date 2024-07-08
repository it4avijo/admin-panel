import React, { useState, useEffect } from "react";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BaseUrl } from "../Routes/BaseUrl";
import { toast } from "react-toastify";

export const GeneralInfoForm = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: id,
    businessName: "",
    fullName: "",
    emailId: "",
    mobileNumber: "",
    companyLegalName: "",
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
  });
  const [errors, setErrors] = useState({});

  const fetchDoctorProfile = async () => {
    try {
      const response = await axios.get(BaseUrl + `/hppAuth/getById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setFormData(response.data.data);
    } catch (error) {
      console.error("Error fetching doctor profile:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.put(
          BaseUrl + `/labAuth/labAuthProfileUpdate/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        if (response.status === 200) {
          toast.success(response.data.message);
        }
        console.log("Pharmacy profile updated successfully");
      } catch (error) {
        console.error("Error updating doctor profile:", error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const validateForm = (data) => {
    const newErrors = {};
    if (!data.businessName)
      newErrors.businessName = "Business Name is required";
    if (!data.fullName) newErrors.fullName = "Full Name is required";
    if (!data.emailId) {
      newErrors.emailId = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.emailId)) {
      newErrors.emailId = "Email is invalid";
    }
    if (!data.mobileNumber)
      newErrors.mobileNumber = "Mobile Number is required";
    if (!data.companyLegalName)
      newErrors.companyLegalName = "Company Legal Name is required";
    if (!data.gstNo) newErrors.gstNo = "GST Number is required";
    if (!data.panNo) newErrors.panNo = "PAN Number is required";
    if (!data.addressLineNo1)
      newErrors.addressLineNo1 = "Address Line 1 is required";
    if (!data.cityDistrict)
      newErrors.cityDistrict = "City/District is required";
    if (!data.pincode) newErrors.pincode = "Pincode is required";
    if (!data.state) newErrors.state = "State is required";
    if (!data.countryRegion)
      newErrors.countryRegion = "Country/Region is required";
    if (!data.bankAccountName)
      newErrors.bankAccountName = "Bank Account Name is required";
    if (!data.bankAccountNumber)
      newErrors.bankAccountNumber = "Bank Account Number is required";
    if (!data.ifscCode) newErrors.ifscCode = "IFSC Code is required";
    return newErrors;
  };

  useEffect(() => {
    fetchDoctorProfile();
  }, []);

  return (
    <Card border="light" className="bg-white shadow-sm">
      <Card.Body>
        <h5 className="mb-4">General Information</h5>
        <Form onSubmit={handleFormSubmit}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="businessName">
                <Form.Label>Business Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter business name"
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
              <Form.Group id="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter full name"
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
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="emailId">
                <Form.Label>Email ID</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter email ID"
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
            <Col md={6} className="mb-3">
              <Form.Group id="mobileNumber">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter mobile number"
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
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="companyLegalName">
                <Form.Label>Company Legal Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter company legal name"
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
            <Col md={6} className="mb-3">
              <Form.Group id="gstNo">
                <Form.Label>GST Number</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter GST number"
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
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="panNo">
                <Form.Label>PAN Number</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter PAN number"
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
            <Col md={6} className="mb-3">
              <Form.Group id="addressLineNo1">
                <Form.Label>Address Line 1</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter address line 1"
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
                  type="text"
                  placeholder="Enter address line 2"
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
                  placeholder="Enter city or district"
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
                  placeholder="Enter pincode"
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
                  placeholder="Enter state"
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
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="countryRegion">
                <Form.Label>Country/Region</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter country or region"
                  value={formData.countryRegion}
                  onChange={(e) =>
                    setFormData({ ...formData, countryRegion: e.target.value })
                  }
                  isInvalid={!!errors.countryRegion}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.countryRegion}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="bankAccountName">
                <Form.Label>Bank Account Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter bank account name"
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
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="bankAccountNumber">
                <Form.Label>Bank Account Number</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter bank account number"
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
            <Col md={6} className="mb-3">
              <Form.Group id="ifscCode">
                <Form.Label>IFSC Code</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter IFSC code"
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
            <Button variant="primary" type="submit">
              Save All
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
