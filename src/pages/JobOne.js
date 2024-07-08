import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Breadcrumb, Table } from "@themesberg/react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BaseUrl, CarrersBaseUrl } from "../Routes/BaseUrl";
import moment from "moment";

export default () => {
  const { id } = useParams();
  console.log(id);
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(
          `${CarrersBaseUrl}/career/getJobById/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const job = response.data.data;
        console.log(job);
        setJobDetails(job);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };
    fetchJobDetails();
  }, [id]);

  if (!jobDetails) {
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
            <Breadcrumb.Item>Tech Corp</Breadcrumb.Item>
            <Breadcrumb.Item href="/jobList">Job List</Breadcrumb.Item>
            <Breadcrumb.Item active>{jobDetails.jobTitle}</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Job Details</h4>
        </div>
      </div>

      <Table striped bordered hover className="mb-4">
        <tbody>
          <tr>
            <td>Job Title</td>
            <td>{jobDetails.jobTitle}</td>
          </tr>
          <tr>
            <td>Job Role</td>
            <td>{jobDetails.jobRole}</td>
          </tr>
          <tr>
            <td>Job Category</td>
            <td>{jobDetails.jobCategory}</td>
          </tr>
          <tr>
            <td>Job Type</td>
            <td>{jobDetails.jobType}</td>
          </tr>
          <tr>
            <td>Job Location</td>
            <td>{jobDetails.jobLocation}</td>
          </tr>
          <tr>
            <td>Company Name</td>
            <td>{jobDetails.companyName}</td>
          </tr>
          <tr>
            <td>Country</td>
            <td>{jobDetails.country}</td>
          </tr>
          <tr>
            <td>State</td>
            <td>{jobDetails.state}</td>
          </tr>
          <tr>
            <td>Basic Qualification</td>
            <td>{jobDetails.basicQualification}</td>
          </tr>
          <tr>
            <td>Preferred Qualification</td>
            <td>{jobDetails.preferredQualification}</td>
          </tr>
          <tr>
            <td>Role Type</td>
            <td>{jobDetails.roleType}</td>
          </tr>
          <tr>
            <td>Team</td>
            <td>{jobDetails.team}</td>
          </tr>
          <tr>
            <td>Job Description</td>
            <td>{jobDetails.description}</td>
          </tr>
          <tr>
            <td>Date Created</td>
            <td>{moment(jobDetails.createdAt).format("MMMM Do, YYYY")}</td>
          </tr>
          <tr>
            <td>Last Updated</td>
            <td>{moment(jobDetails.updateJob).format("MMMM Do, YYYY")}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
