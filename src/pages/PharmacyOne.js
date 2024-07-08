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
  const [doctorDetails, setDoctorDetails] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(
          `${BaseUrl}/pharmacy/getPharmacyProfileById/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const doctor = response.data.data;
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
            <Breadcrumb.Item href="/PharmacyList">
              Pharmacy List
            </Breadcrumb.Item>
            <Breadcrumb.Item active>{doctorDetails.fullName}</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Pharmacy Details</h4>
        </div>
      </div>
      <Table striped bordered hover className="mb-4">
        <tbody>
          <tr>
            <td>Full Name</td>
            <td>{doctorDetails.fullName}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{doctorDetails.emailId}</td>
          </tr>
          <tr>
            <td>Mobile Number</td>
            <td>{doctorDetails.mobileNumber}</td>
          </tr>
          <tr>
            <td>Business Name</td>
            <td>{doctorDetails.businessName}</td>
          </tr>
          <tr>
            <td>Business Title</td>
            <td>{doctorDetails.businessTitle}</td>
          </tr>
          <tr>
            <td>Drug Licence Number</td>
            <td>{doctorDetails.drugLicenceNo}</td>
          </tr>
          <tr>
            <td>FSSAI Licence Number</td>
            <td>{doctorDetails.fssaiLicenceNo}</td>
          </tr>
          <tr>
            <td>GST Number</td>
            <td>{doctorDetails.gstNo}</td>
          </tr>
          <tr>
            <td>PAN Number</td>
            <td>{doctorDetails.panNo}</td>
          </tr>
          <tr>
            <td>Register</td>
            <td>{doctorDetails.register}</td>
          </tr>
          <tr>
            <td>Address Line 1</td>
            <td>{doctorDetails.addressLineNo1}</td>
          </tr>
          <tr>
            <td>Address Line 2</td>
            <td>{doctorDetails.addressLineNo2}</td>
          </tr>
          <tr>
            <td>City/District</td>
            <td>{doctorDetails.cityDistrict}</td>
          </tr>
          <tr>
            <td>Pincode</td>
            <td>{doctorDetails.pincode}</td>
          </tr>
          <tr>
            <td>State</td>
            <td>{doctorDetails.state}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
