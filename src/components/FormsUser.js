import React, { useState, useEffect } from "react";
import moment from "moment-timezone";
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
import Datetime from "react-datetime";

export const GeneralInfoForm = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: id,
    fullName: "",
    dateOfBirth: "",
    mobileNumber: "",
  });

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(BaseUrl + `/user/getUserById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setFormData(response.data.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        BaseUrl + `/user/userEdit/${id}`,
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
      console.log("User profile updated successfully");
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <Card border="light" className="bg-white shadow-sm">
      <Card.Body>
        <h5 className="mb-4">General Information</h5>
        <Form onSubmit={handleFormSubmit}>
          <Row>
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
            <Col md={6} className="mb-3">
              <Form.Group id="dateOfBirth">
                <Form.Label>Date of Birth</Form.Label>
                <InputGroup className="border-0">
                  <Datetime
                    timeFormat={false}
                    closeOnSelect={true}
                    inputProps={{ placeholder: "Select date of birth" }}
                    value={moment(formData.dateOfBirth)}
                    onChange={(date) =>
                      setFormData({ ...formData, dateOfBirth: date.format() })
                    }
                  />
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faCalendarAlt} />
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row>
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
          <div className="mt-3">
            <Button variant="primary" type="submit">
              Save
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
