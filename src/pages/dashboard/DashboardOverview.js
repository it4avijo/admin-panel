import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNotesMedical,
  faUsers,
  faMapPin,
  faMortarPestle,
  faFlask,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "@themesberg/react-bootstrap";

import { CounterWidget } from "../../components/Widgets";
import { toast } from "react-toastify";
import axios from "axios";
import { BaseUrl } from "../../Routes/BaseUrl";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  const [profileCounts, setProfileCounts] = useState({
    totalDoctors: 0,
    totalHpp: 0,
    totalLap: 0,
    totalPharmacy: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchProfileCounts = async () => {
      try {
        const response = await axios.get(BaseUrl + "/admin/totalProfile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        console.log(data);
        if (data.message === "Profile counts retrieved successfully") {
          setProfileCounts({
            totalDoctors: data.totalDoctors,
            totalHpp: data.totalHpp,
            totalLap: data.totalLap,
            totalPharmacy: data.totalPharmacy,
            totalUsers: data.totalUser,
          });
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching profile counts:", error);
      }
    };

    fetchProfileCounts();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4"></div>

      <Row className="justify-content-md-center">
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Total Users"
            title={profileCounts.totalUsers}
            period=""
            icon={faUsers}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Total Doctors"
            title={profileCounts.totalDoctors}
            period=""
            icon={faNotesMedical}
            iconColor="shape-tertiary"
          />
        </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Total Pharmacy"
            title={profileCounts.totalPharmacy}
            period=""
            icon={faMortarPestle}
            iconColor="shape-tertiary"
          />
        </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Total Lab"
            title={profileCounts.totalLap}
            period=""
            icon={faFlask}
            iconColor="shape-tertiary"
          />
        </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Total HPP"
            title={profileCounts.totalHpp}
            period=""
            icon={faMapPin}
            iconColor="shape-tertiary"
          />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
