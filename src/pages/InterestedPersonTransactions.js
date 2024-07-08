import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCog, faHome } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from "@themesberg/react-bootstrap";

import {
  TransactionsInterestedPersonTable,
  TransactionsUserTable,
} from "../components/Tables";
import { useLocation } from "react-router-dom";
export default () => {
  const location = useLocation();
  const { interestedPersonn } = location.state || { interestedPersonn: [] };
  console.log(interestedPersonn);
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
            <Breadcrumb.Item active>Interested Person List</Breadcrumb.Item>
          </Breadcrumb>
          <div className="d-flex justify-content-between align-items-center w-100">
            <h4>Interested Person List</h4>
          </div>
        </div>
      </div>

      <TransactionsInterestedPersonTable />
    </>
  );
};
