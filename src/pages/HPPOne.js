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
        const response = await axios.get(`${BaseUrl}/hppAuth/getById/${id}`, {
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
            <Breadcrumb.Item href="/HPPList">HPP List</Breadcrumb.Item>
            <Breadcrumb.Item active>{doctorDetails.fullName}</Breadcrumb.Item>
          </Breadcrumb>
          <h4>HPP Details</h4>
        </div>
      </div>

      <h4>Business Details</h4>
      <Table striped bordered hover className="mb-4">
        <tbody>
          <tr>
            <td>Business Name</td>
            <td>{doctorDetails.businessName}</td>
          </tr>
          <tr>
            <td>Full Name</td>
            <td>{doctorDetails.fullName}</td>
          </tr>
          <tr>
            <td>Email ID</td>
            <td>{doctorDetails.emailId}</td>
          </tr>
          <tr>
            <td>Mobile Number</td>
            <td>{doctorDetails.mobileNumber}</td>
          </tr>
          <tr>
            <td>Company Legal Name</td>
            <td>{doctorDetails.companyLegalName}</td>
          </tr>
          <tr>
            <td>GST No</td>
            <td>{doctorDetails.gstNo}</td>
          </tr>
          <tr>
            <td>PAN No</td>
            <td>{doctorDetails.panNo}</td>
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
          <tr>
            <td>Country/Region</td>
            <td>{doctorDetails.countryRegion}</td>
          </tr>
          <tr>
            <td>Bank Account Name</td>
            <td>{doctorDetails.bankAccountName}</td>
          </tr>
          <tr>
            <td>Bank Account Number</td>
            <td>{doctorDetails.bankAccountNumber}</td>
          </tr>
          <tr>
            <td>IFSC Code</td>
            <td>{doctorDetails.ifscCode}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
