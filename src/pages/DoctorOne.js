import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Breadcrumb, Table } from "@themesberg/react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../Routes/BaseUrl";
import moment from "moment";
export default () => {
  const { id } = useParams();
  console.log(id);
  const [doctorDetails, setDoctorDetails] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(
          `${BaseUrl}/user/getDoctorProfileById/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const doctor = response.data.data;
        console.log(doctor);
        setDoctorDetails(doctor);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };
    fetchDoctorDetails();
  }, [id]);

  if (!doctorDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
          >
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Avijo</Breadcrumb.Item>
            <Breadcrumb.Item href="/DoctorList">Doctor List</Breadcrumb.Item>
            <Breadcrumb.Item active>{doctorDetails.fullName}</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Doctor Details</h4>
        </div>
      </div>

      <Table striped bordered hover className="mb-4">
        <tbody>
          <tr>
            <td>Full Name</td>
            <td>{doctorDetails.fullName}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>{doctorDetails.gender}</td>
          </tr>
          <tr>
            <td>Date of Birth</td>
            <td>{moment(doctorDetails.dateOfBirth).format("YYYY-MM-DD")}</td>
          </tr>
          <tr>
            <td>Title</td>
            <td>{doctorDetails.title}</td>
          </tr>
          <tr>
            <td>City</td>
            <td>{doctorDetails.city}</td>
          </tr>
          <tr>
            <td>State</td>
            <td>{doctorDetails.state}</td>
          </tr>
          <tr>
            <td>Country</td>
            <td>{doctorDetails.country}</td>
          </tr>
          <tr>
            <td>Colony/Street/Locality</td>
            <td>{doctorDetails.colonyStreetLocality}</td>
          </tr>
          <tr>
            <td>Pin Code</td>
            <td>{doctorDetails.pinCode}</td>
          </tr>
          <tr>
            <td>College/University</td>
            <td>{doctorDetails.collegeUniversity}</td>
          </tr>
          <tr>
            <td>Degree</td>
            <td>{doctorDetails.degree}</td>
          </tr>
          <tr>
            <td>Experience</td>
            <td>{doctorDetails.experience} years</td>
          </tr>
          <tr>
            <td>Specialization</td>
            <td>{doctorDetails.specialization}</td>
          </tr>
          <tr>
            <td>Registration Council</td>
            <td>{doctorDetails.registrationCouncil}</td>
          </tr>
          <tr>
            <td>Registration Number</td>
            <td>{doctorDetails.registrationNumber}</td>
          </tr>
          <tr>
            <td>Registration Year</td>
            <td>{doctorDetails.registrationYear}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
