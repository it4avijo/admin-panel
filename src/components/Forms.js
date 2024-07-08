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
    fullName: "",
    title: "",
    specialization: "",
    experience: 0,
    gender: "",
    dateOfBirth: "",
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
  });

  const fetchDoctorProfile = async () => {
    try {
      const response = await axios.get(
        BaseUrl + `/doctor/getDoctorProfileById/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
        BaseUrl + `/user/doctorProfileUpdate/${id}`,
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
      console.log("Doctor profile updated successfully");
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
              <Form.Group id="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your first name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </Form.Group>
            </Col>{" "}
            <Col md={6} className="mb-3">
              <Form.Group id="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your title"
                  value={formData.title || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="birthday">
                <Form.Label>Birthday</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={(date) =>
                    setFormData({
                      ...formData,
                      dateOfBirth: date.format("YYYY-MM-DD"),
                    })
                  }
                  defaultValue={formData.dateOfBirth}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                >
                  <option value="">Select Gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="specialization">
                <Form.Label>Specialization</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your specialization"
                  value={formData.specialization || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, specialization: e.target.value })
                  }
                />
              </Form.Group>
            </Col>{" "}
            <Col md={6} className="mb-3">
              <Form.Group id="degree">
                <Form.Label>Degree</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your degree"
                  value={formData.degree || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, degree: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="collegeUniversity">
                <Form.Label>College/University</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your college/university"
                  value={formData.collegeUniversity || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      collegeUniversity: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>{" "}
            <Col md={6} className="mb-3">
              <Form.Group id="experience">
                <Form.Label>Experience</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Enter your experience in years"
                  value={formData.experience || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="year">
                <Form.Label>Year</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Enter the year of completion"
                  value={formData.year || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, year: e.target.value })
                  }
                />
              </Form.Group>
            </Col>{" "}
            <Col md={6} className="mb-3">
              <Form.Group id="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your city"
                  value={formData.city || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="colonyStreetLocality">
                <Form.Label>Colony/Street/Locality</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your colony/street/locality"
                  value={formData.colonyStreetLocality || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      colonyStreetLocality: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>{" "}
            <Col md={6} className="mb-3">
              <Form.Group id="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your country"
                  value={formData.country || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="pinCode">
                <Form.Label>PIN Code</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your PIN code"
                  value={formData.pinCode || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, pinCode: e.target.value })
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
                  placeholder="Enter your state"
                  value={formData.state || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="registrationNumber">
                <Form.Label>Registration Number</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your registration number"
                  value={formData.registrationNumber || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      registrationNumber: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>{" "}
            <Col md={6} className="mb-3">
              <Form.Group id="registrationCouncil">
                <Form.Label>Registration Council</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter your registration council"
                  value={formData.registrationCouncil || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      registrationCouncil: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="registrationYear">
                <Form.Label>Registration Year</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Enter your registration year"
                  value={formData.registrationYear || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      registrationYear: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          {/* Add more form fields here */}
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
