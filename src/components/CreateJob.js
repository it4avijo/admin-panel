import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BaseUrl, CarrersBaseUrl } from "../Routes/BaseUrl";
import { toast } from "react-toastify";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";

export const GeneralInfoForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobId: "",
    companyName: "",
    jobLocation: "",
    description: "",
    basicQualification: "",
    preferredQualification: "",
    jobRole: "",
    updateJob: "",
    jobType: "",
    jobCategory: "",
    country: "",
    state: "",
    team: "",
    roleType: "",
  });
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.jobTitle) newErrors.jobTitle = "Job Title is required";
    if (!formData.jobId) newErrors.jobId = "Job ID is required";
    if (!formData.companyName)
      newErrors.companyName = "Company Name is required";
    if (!formData.jobLocation)
      newErrors.jobLocation = "Job Location is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.basicQualification)
      newErrors.basicQualification = "Basic Qualification is required";
    if (!formData.preferredQualification)
      newErrors.preferredQualification = "Preferred Qualification is required";
    if (!formData.jobRole) newErrors.jobRole = "Job Role is required";
    if (!formData.updateJob) newErrors.updateJob = "Update Job is required";
    if (!formData.jobType) newErrors.jobType = "Job Type is required";
    if (!formData.jobCategory)
      newErrors.jobCategory = "Job Category is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.team) newErrors.team = "Team is required";
    if (!formData.roleType) newErrors.roleType = "Role Type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        CarrersBaseUrl + `/career/createJob`,
        formData
      );
      console.log(response);
      if (response.status === 201) {
        navigate("/CarrerList");
        toast.success("Job created successfully");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response.status === 400) {
        toast.error(error.response.data.message);
      }
    }
  };

  const renderStep = () => {
    return (
      <>
        <h5 className="mb-4">Job Information</h5>
        <Row>
          <Col md={6} className="mb-3">
            <Form.Group id="jobTitle">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter job title"
                value={formData.jobTitle}
                onChange={(e) =>
                  setFormData({ ...formData, jobTitle: e.target.value })
                }
                isInvalid={!!errors.jobTitle}
              />
              <Form.Control.Feedback type="invalid">
                {errors.jobTitle}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6} className="mb-3">
            <Form.Group id="jobId">
              <Form.Label>Job ID</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter job ID"
                value={formData.jobId}
                onChange={(e) =>
                  setFormData({ ...formData, jobId: e.target.value })
                }
                isInvalid={!!errors.jobId}
              />
              <Form.Control.Feedback type="invalid">
                {errors.jobId}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <Form.Group id="companyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter company name"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
                isInvalid={!!errors.companyName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.companyName}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6} className="mb-3">
            <Form.Group id="jobLocation">
              <Form.Label>Job Location</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter job location"
                value={formData.jobLocation}
                onChange={(e) =>
                  setFormData({ ...formData, jobLocation: e.target.value })
                }
                isInvalid={!!errors.jobLocation}
              />
              <Form.Control.Feedback type="invalid">
                {errors.jobLocation}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <Form.Group id="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter job description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6} className="mb-3">
            <Form.Group id="basicQualification">
              <Form.Label>Basic Qualification</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter basic qualification"
                value={formData.basicQualification}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    basicQualification: e.target.value,
                  })
                }
                isInvalid={!!errors.basicQualification}
              />
              <Form.Control.Feedback type="invalid">
                {errors.basicQualification}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <Form.Group id="preferredQualification">
              <Form.Label>Preferred Qualification</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter preferred qualification"
                value={formData.preferredQualification}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    preferredQualification: e.target.value,
                  })
                }
                isInvalid={!!errors.preferredQualification}
              />
              <Form.Control.Feedback type="invalid">
                {errors.preferredQualification}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6} className="mb-3">
            <Form.Group id="jobRole">
              <Form.Label>Job Role</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter job role"
                value={formData.jobRole}
                onChange={(e) =>
                  setFormData({ ...formData, jobRole: e.target.value })
                }
                isInvalid={!!errors.jobRole}
              />
              <Form.Control.Feedback type="invalid">
                {errors.jobRole}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <Form.Group id="updateJob">
              <Form.Label>Update Job</Form.Label>
              <Form.Control
                required
                type="datetime-local"
                placeholder="Enter update job date"
                value={formData.updateJob}
                onChange={(e) =>
                  setFormData({ ...formData, updateJob: e.target.value })
                }
                isInvalid={!!errors.updateJob}
              />
              <Form.Control.Feedback type="invalid">
                {errors.updateJob}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6} className="mb-3">
            <Form.Group id="jobType">
              <Form.Label>Job Type</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter job type"
                value={formData.jobType}
                onChange={(e) =>
                  setFormData({ ...formData, jobType: e.target.value })
                }
                isInvalid={!!errors.jobType}
              />
              <Form.Control.Feedback type="invalid">
                {errors.jobType}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <Form.Group id="jobCategory">
              <Form.Label>Job Category</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter job category"
                value={formData.jobCategory}
                onChange={(e) =>
                  setFormData({ ...formData, jobCategory: e.target.value })
                }
                isInvalid={!!errors.jobCategory}
              />
              <Form.Control.Feedback type="invalid">
                {errors.jobCategory}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6} className="mb-3">
            <Form.Group id="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter country"
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
        </Row>
        <Row>
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
          <Col md={6} className="mb-3">
            <Form.Group id="team">
              <Form.Label>Team</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter team"
                value={formData.team}
                onChange={(e) =>
                  setFormData({ ...formData, team: e.target.value })
                }
                isInvalid={!!errors.team}
              />
              <Form.Control.Feedback type="invalid">
                {errors.team}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6} className="mb-3">
            <Form.Group id="roleType">
              <Form.Label>Role Type</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter role type"
                value={formData.roleType}
                onChange={(e) =>
                  setFormData({ ...formData, roleType: e.target.value })
                }
                isInvalid={!!errors.roleType}
              />
              <Form.Control.Feedback type="invalid">
                {errors.roleType}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </>
    );
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <Form onSubmit={handleFormSubmit}>
          {renderStep()}
          <div className="mt-3">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
