import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCog,
  faHome,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Button,
  ButtonGroup,
  Breadcrumb,
  InputGroup,
  Dropdown,
} from "@themesberg/react-bootstrap";

import { TransactionsTable } from "../components/Tables";
import { Link } from "react-router-dom";

export default () => {
  return (
    <>
      <div className="flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
          >
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item>Avijo</Breadcrumb.Item>
            <Breadcrumb.Item active>Doctor List</Breadcrumb.Item>
          </Breadcrumb>
          <div className="d-flex justify-content-between align-items-center w-100">
            <h4>Doctor List</h4>
            <Link to="/DoctorCreate" className="btn-primary py-2 px-2 rounded">
              Create Doctor
            </Link>
          </div>
        </div>
      </div>

      <TransactionsTable />
    </>
  );
};
