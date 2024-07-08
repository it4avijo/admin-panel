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
        const response = await axios.get(`${BaseUrl}/user/getUserById/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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

  const formattedDateOfBirth = moment(doctorDetails.dateOfBirth).format(
    "MMMM Do, YYYY"
  );

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
            <Breadcrumb.Item href="/DoctorList">User List</Breadcrumb.Item>
            <Breadcrumb.Item active>{doctorDetails.fullName}</Breadcrumb.Item>
          </Breadcrumb>
          <h4>User Details</h4>
        </div>
      </div>
      <Table striped bordered hover className="mb-4">
        <tbody>
          <tr>
            <td>Full Name</td>
            <td>{doctorDetails.fullName}</td>
          </tr>
          <tr>
            <td>Date of Birth</td>
            <td>{formattedDateOfBirth}</td>
          </tr>
          <tr>
            <td>Mobile Number</td>
            <td>{doctorDetails.mobileNumber}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
