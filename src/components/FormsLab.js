import React, { useState, useEffect } from "react";
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
    gstNo: "",
    panNo: "",
    register: "",
    addressLineNo1: "",
    addressLineNo2: "",
    cityDistrict: "",
    pincode: "",
    state: "",
  });

  const fetchDoctorProfile = async () => {
    try {
      const response = await axios.get(BaseUrl + `/labAuth/getById/${id}`, {
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
      console.log("Lab profile updated successfully");
    } catch (error) {
      console.error("Error updating doctor profile:", error);
    }
  };

  useEffect(() => {
    fetchDoctorProfile();
  }, []);

  return (
    <Card border="light" className="bg-white shadow-sm">
      <Card.Body>
        <h5 className="mb-4">General information</h5>
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
                />
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
                />
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
                />
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
                />
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
                  placeholder="Enter GST number"
                  value={formData.gstNo}
                  onChange={(e) =>
                    setFormData({ ...formData, gstNo: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
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
                />
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
                  placeholder="Enter register"
                  value={formData.register}
                  onChange={(e) =>
                    setFormData({ ...formData, register: e.target.value })
                  }
                />
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
                    setFormData({ ...formData, addressLineNo1: e.target.value })
                  }
                />
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
                    setFormData({ ...formData, addressLineNo2: e.target.value })
                  }
                />
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
                />
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
                />
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
                />
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
