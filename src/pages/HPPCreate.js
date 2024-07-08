import React from "react";
import { Col, Row } from "@themesberg/react-bootstrap";
import { GeneralInfoForm } from "../components/CreateHPP.js";

export default () => {
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4"></div>
      <Row className="mb-5">
        <Col xs={12} xl={12}>
          <GeneralInfoForm />
        </Col>
      </Row>
    </>
  );
};
