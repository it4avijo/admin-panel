import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEllipsisH,
  faEye,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Nav,
  Card,
  Button,
  Table,
  Dropdown,
  Pagination,
  ButtonGroup,
  Spinner,
} from "@themesberg/react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { BaseUrl, CarrersBaseUrl } from "../Routes/BaseUrl";
import moment from "moment";
import CommonDeleteModal from "./CommonDeleteModal";

export const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const itemsPerPage = 10;

  const fetchTransactions = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${BaseUrl}/doctor/getAllDoctorProfileIds?page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data, totalPages } = response.data;
      setTransactions(data);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [currentPage]);

  const handleDeleteClick = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteSuccess = async () => {
    setCurrentPage(1);
    await fetchTransactions();
  };

  const TableRow = ({ doctor, index }) => {
    const { _id, fullName, gender, dateOfBirth, title, city } = doctor;

    return (
      <tr>
        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
        <td>{title}</td>
        <td>{fullName}</td>
        <td>{gender}</td>
        <td>{moment(dateOfBirth).format("YYYY-MM-DD")}</td>
        <td>{city}</td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link
                  to={`/doctor/${_id}`}
                  className="text-black text-decoration-none"
                >
                  <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link
                  to={`/DoctorEdit/${_id}`}
                  className="text-black text-decoration-none"
                >
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                </Link>
              </Dropdown.Item>
              <Dropdown.Item
                className="text-danger"
                onClick={() => handleDeleteClick(_id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center pt-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            <Table hover className="user-table align-items-center">
              <thead>
                <tr>
                  <th className="border-bottom">No.</th>
                  <th className="border-bottom">Title</th>
                  <th className="border-bottom">Full Name</th>
                  <th className="border-bottom">Gender</th>
                  <th className="border-bottom">Date of Birth</th>
                  <th className="border-bottom">City</th>
                  <th className="border-bottom">Action</th>
                </tr>
              </thead>
              {transactions.length === 0 ? (
                <div className="text-center pt-3">No data found</div>
              ) : (
                <tbody>
                  {transactions.map((doctor, index) => (
                    <TableRow key={index} doctor={doctor} index={index} />
                  ))}
                </tbody>
              )}
            </Table>
          </>
        )}
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between mb-5">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Pagination.Prev>
              {[...Array(totalPages).keys()].map((page) => (
                <Pagination.Item
                  key={page + 1}
                  active={page + 1 === currentPage}
                  onClick={() => setCurrentPage(page + 1)}
                >
                  {page + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{transactions.length}</b> out of <b>10</b> entries
          </small>
        </Card.Footer>
      </Card.Body>

      {/* Delete modal */}
      {showDeleteModal && (
        <CommonDeleteModal
          id={selectedDoctorId}
          onClose={handleCloseDeleteModal}
          onDelete={handleDeleteSuccess}
          show={showDeleteModal}
          deleteUrl={`${BaseUrl}/doctor/doctorProfileDelete`}
        />
      )}
    </Card>
  );
};
export const TransactionsLabTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const itemsPerPage = 10;

  const fetchTransactions = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${BaseUrl}/labAuth/getAllApi?page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data, totalPages } = response.data;
      setTransactions(data);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [currentPage]);

  const handleDeleteClick = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteSuccess = async () => {
    setCurrentPage(1);
    await fetchTransactions();
  };

  const TableRow = ({ doctor, index }) => {
    const { _id, fullName, dateOfBirth } = doctor;

    return (
      <tr>
        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
        <td>{fullName}</td>
        <td>{moment(dateOfBirth).format("YYYY-MM-DD")}</td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link
                  to={`/Lab/${_id}`}
                  className="text-black text-decoration-none"
                >
                  <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link
                  to={`/LabEdit/${_id}`}
                  className="text-black text-decoration-none"
                >
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                </Link>
              </Dropdown.Item>
              <Dropdown.Item
                className="text-danger"
                onClick={() => handleDeleteClick(_id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center pt-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            <Table hover className="user-table align-items-center">
              <thead>
                <tr>
                  <th className="border-bottom">No.</th>

                  <th className="border-bottom">Full Name</th>
                  <th className="border-bottom">Date of Birth</th>
                  <th className="border-bottom">Action</th>
                </tr>
              </thead>
              {transactions.length === 0 ? (
                <div className="text-center pt-3">No data found</div>
              ) : (
                <tbody>
                  {transactions.map((doctor, index) => (
                    <TableRow key={index} doctor={doctor} index={index} />
                  ))}
                </tbody>
              )}
            </Table>
          </>
        )}
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between mb-5">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Pagination.Prev>
              {[...Array(totalPages).keys()].map((page) => (
                <Pagination.Item
                  key={page + 1}
                  active={page + 1 === currentPage}
                  onClick={() => setCurrentPage(page + 1)}
                >
                  {page + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{transactions.length}</b> out of <b>10</b> entries
          </small>
        </Card.Footer>
      </Card.Body>

      {/* Delete modal */}
      {showDeleteModal && (
        <CommonDeleteModal
          id={selectedDoctorId}
          onClose={handleCloseDeleteModal}
          onDelete={handleDeleteSuccess}
          show={showDeleteModal}
          deleteUrl={`${BaseUrl}/labAuth/lapAuthProfileDelete`}
        />
      )}
    </Card>
  );
};
export const TransactionsUserTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const itemsPerPage = 10;

  const fetchTransactions = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${BaseUrl}/user/getAllUserProfile?page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data, totalPages } = response.data;
      setTransactions(data);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [currentPage]);

  const handleDeleteClick = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteSuccess = async () => {
    setCurrentPage(1);
    await fetchTransactions();
  };

  const TableRow = ({ doctor, index }) => {
    const { _id, fullName, dateOfBirth } = doctor;

    return (
      <tr>
        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
        <td>{fullName}</td>
        <td>{moment(dateOfBirth).format("YYYY-MM-DD")}</td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link
                  to={`/User/${_id}`}
                  className="text-black text-decoration-none"
                >
                  <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link
                  to={`/UserEdit/${_id}`}
                  className="text-black text-decoration-none"
                >
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                </Link>
              </Dropdown.Item>
              <Dropdown.Item
                className="text-danger"
                onClick={() => handleDeleteClick(_id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center pt-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            <Table hover className="user-table align-items-center">
              <thead>
                <tr>
                  <th className="border-bottom">No.</th>

                  <th className="border-bottom">Full Name</th>
                  <th className="border-bottom">Date of Birth</th>
                  <th className="border-bottom">Action</th>
                </tr>
              </thead>
              {transactions.length === 0 ? (
                <div className="text-center pt-3">No data found</div>
              ) : (
                <tbody>
                  {transactions.map((doctor, index) => (
                    <TableRow key={index} doctor={doctor} index={index} />
                  ))}
                </tbody>
              )}
            </Table>
          </>
        )}
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between mb-5">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Pagination.Prev>
              {[...Array(totalPages).keys()].map((page) => (
                <Pagination.Item
                  key={page + 1}
                  active={page + 1 === currentPage}
                  onClick={() => setCurrentPage(page + 1)}
                >
                  {page + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{transactions.length}</b> out of <b>10</b> entries
          </small>
        </Card.Footer>
      </Card.Body>

      {/* Delete modal */}
      {showDeleteModal && (
        <CommonDeleteModal
          id={selectedDoctorId}
          onClose={handleCloseDeleteModal}
          onDelete={handleDeleteSuccess}
          show={showDeleteModal}
          deleteUrl={`${BaseUrl}/user/UserDelete`}
        />
      )}
    </Card>
  );
};
export const TransactionsPharmacyTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const itemsPerPage = 10;

  const fetchTransactions = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${BaseUrl}/pharmacy/getAllPharmacyProfile?page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data, totalPages } = response.data;
      setTransactions(data);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [currentPage]);

  const handleDeleteClick = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteSuccess = async () => {
    setCurrentPage(1);
    await fetchTransactions();
  };

  const TableRow = ({ doctor, index }) => {
    const { _id, fullName, dateOfBirth } = doctor;

    return (
      <tr>
        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
        <td>{fullName}</td>
        <td>{moment(dateOfBirth).format("YYYY-MM-DD")}</td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link
                  to={`/Pharmacy/${_id}`}
                  className="text-black text-decoration-none"
                >
                  <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link
                  to={`/PharmacyEdit/${_id}`}
                  className="text-black text-decoration-none"
                >
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                </Link>
              </Dropdown.Item>
              <Dropdown.Item
                className="text-danger"
                onClick={() => handleDeleteClick(_id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center pt-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            <Table hover className="user-table align-items-center">
              <thead>
                <tr>
                  <th className="border-bottom">No.</th>

                  <th className="border-bottom">Full Name</th>
                  <th className="border-bottom">Date of Birth</th>
                  <th className="border-bottom">Action</th>
                </tr>
              </thead>
              {transactions.length === 0 ? (
                <div className="text-center pt-3">No data found</div>
              ) : (
                <tbody>
                  {transactions.map((doctor, index) => (
                    <TableRow key={index} doctor={doctor} index={index} />
                  ))}
                </tbody>
              )}
            </Table>
          </>
        )}
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between mb-5">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Pagination.Prev>
              {[...Array(totalPages).keys()].map((page) => (
                <Pagination.Item
                  key={page + 1}
                  active={page + 1 === currentPage}
                  onClick={() => setCurrentPage(page + 1)}
                >
                  {page + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{transactions.length}</b> out of <b>10</b> entries
          </small>
        </Card.Footer>
      </Card.Body>

      {/* Delete modal */}
      {showDeleteModal && (
        <CommonDeleteModal
          id={selectedDoctorId}
          onClose={handleCloseDeleteModal}
          onDelete={handleDeleteSuccess}
          show={showDeleteModal}
          deleteUrl={`${BaseUrl}/pharmacy/pharmacyProfileDelete`}
        />
      )}
    </Card>
  );
};
export const TransactionsHPPTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const itemsPerPage = 10;

  const fetchTransactions = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${BaseUrl}/hppAuth/getAllApi?page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data, totalPages } = response.data;
      setTransactions(data);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [currentPage]);

  const handleDeleteClick = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteSuccess = async () => {
    setCurrentPage(1);
    await fetchTransactions();
  };

  const TableRow = ({ doctor, index }) => {
    const { _id, fullName, dateOfBirth } = doctor;

    return (
      <tr>
        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
        <td>{fullName}</td>
        <td>{moment(dateOfBirth).format("YYYY-MM-DD")}</td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link
                  to={`/HPP/${_id}`}
                  className="text-black text-decoration-none"
                >
                  <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link
                  to={`/HPPEdit/${_id}`}
                  className="text-black text-decoration-none"
                >
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                </Link>
              </Dropdown.Item>
              <Dropdown.Item
                className="text-danger"
                onClick={() => handleDeleteClick(_id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center pt-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            <Table hover className="user-table align-items-center">
              <thead>
                <tr>
                  <th className="border-bottom">No.</th>

                  <th className="border-bottom">Full Name</th>
                  <th className="border-bottom">Date of Birth</th>
                  <th className="border-bottom">Action</th>
                </tr>
              </thead>
              {transactions.length === 0 ? (
                <div className="text-center pt-3">No data found</div>
              ) : (
                <tbody>
                  {transactions.map((doctor, index) => (
                    <TableRow key={index} doctor={doctor} index={index} />
                  ))}
                </tbody>
              )}
            </Table>
          </>
        )}
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between mb-5">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Pagination.Prev>
              {[...Array(totalPages).keys()].map((page) => (
                <Pagination.Item
                  key={page + 1}
                  active={page + 1 === currentPage}
                  onClick={() => setCurrentPage(page + 1)}
                >
                  {page + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{transactions.length}</b> out of <b>10</b> entries
          </small>
        </Card.Footer>
      </Card.Body>

      {/* Delete modal */}
      {showDeleteModal && (
        <CommonDeleteModal
          id={selectedDoctorId}
          onClose={handleCloseDeleteModal}
          onDelete={handleDeleteSuccess}
          show={showDeleteModal}
          deleteUrl={`${BaseUrl}/hppAuth/deleteProfileUpdate`}
        />
      )}
    </Card>
  );
};

export const TransactionsCarrersTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const itemsPerPage = 10;

  const fetchTransactions = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${CarrersBaseUrl}/career/getFatchdata?page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { jobProfiles } = response.data;
      console.log(jobProfiles);
      const { totalJobs } = response.data;
      // console.log(response.data.jobProfiles);
      setTransactions(jobProfiles);
      setTotalPages(totalJobs);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [currentPage]);

  const handleDeleteClick = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteSuccess = async () => {
    setCurrentPage(1);
    await fetchTransactions();
  };

  const TableRow = ({ doctor, index }) => {
    const { _id, jobTitle, dateOfBirth, companyName, interestedPersonn } =
      doctor;

    return (
      <tr>
        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
        <td>{jobTitle}</td>
        <td>{companyName}</td>
        <td>{moment(dateOfBirth).format("YYYY-MM-DD")}</td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link
                  to={`/Job/${_id}`}
                  className="text-black text-decoration-none"
                >
                  <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
                </Link>
              </Dropdown.Item>
              {/* <Dropdown.Item>
                <Link
                  to={`/HPPEdit/${_id}`}
                  className="text-black text-decoration-none"
                >
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                </Link>
              </Dropdown.Item> */}
              <Dropdown.Item>
                <Link
                  to={{
                    pathname: `/InterestedPerson/${_id}`,
                  }}
                  className="text-black text-decoration-none"
                >
                  <FontAwesomeIcon icon={faEye} className="me-2" /> Interested
                  Person
                </Link>
              </Dropdown.Item>
              <Dropdown.Item
                className="text-danger"
                onClick={() => handleDeleteClick(_id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center pt-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            <Table hover className="user-table align-items-center">
              <thead>
                <tr>
                  <th className="border-bottom">No.</th>

                  <th className="border-bottom">Job Title</th>
                  <th className="border-bottom">Company Name</th>
                  <th className="border-bottom">Date Of Create</th>
                  <th className="border-bottom">Action</th>
                </tr>
              </thead>
              {transactions.length === 0 ? (
                <div className="text-center pt-3">No data found</div>
              ) : (
                <tbody>
                  {transactions.map((doctor, index) => (
                    <TableRow key={index} doctor={doctor} index={index} />
                  ))}
                </tbody>
              )}
            </Table>
          </>
        )}
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between mb-5">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Pagination.Prev>
              {[...Array(totalPages).keys()].map((page) => (
                <Pagination.Item
                  key={page + 1}
                  active={page + 1 === currentPage}
                  onClick={() => setCurrentPage(page + 1)}
                >
                  {page + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{transactions.length}</b> out of <b>10</b> entries
          </small>
        </Card.Footer>
      </Card.Body>

      {/* Delete modal */}
      {showDeleteModal && (
        <CommonDeleteModal
          id={selectedDoctorId}
          onClose={handleCloseDeleteModal}
          onDelete={handleDeleteSuccess}
          show={showDeleteModal}
          deleteUrl={`${CarrersBaseUrl}/career/deleteJob`}
        />
      )}
    </Card>
  );
};

export const TransactionsInterestedPersonTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const itemsPerPage = 10;
  const { id } = useParams();
  // console.log(id);
  const fetchTransactions = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${CarrersBaseUrl}/career/getFatchdata?page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { updatedJobs } = response.data;
      // console.log(updatedJobs);
      const { totalJobs } = response.data;
      // console.log(response.data.updatedJobs);
      const update = updatedJobs.filter((row) => row._id === id);
      setTransactions(update[0].interestedPersonn);
      setTotalPages(totalJobs);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log(transactions);

  useEffect(() => {
    fetchTransactions();
  }, [currentPage]);

  const handleDeleteClick = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteSuccess = async () => {
    setCurrentPage(1);
    await fetchTransactions();
  };

  const TableRow = ({ doctor, index }) => {
    const { _id, mobileNumber, email, name } = doctor;

    return (
      <tr>
        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
        <td>{name}</td>
        <td>{email}</td>
        <td>{mobileNumber}</td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link
                  to={`/Job/${_id}`}
                  className="text-black text-decoration-none"
                >
                  <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
                </Link>
              </Dropdown.Item>
              {/* <Dropdown.Item>
                <Link
                  to={`/HPPEdit/${_id}`}
                  className="text-black text-decoration-none"
                >
                  <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
                </Link>
              </Dropdown.Item> */}
              <Dropdown.Item
                className="text-danger"
                onClick={() => handleDeleteClick(_id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center pt-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            <Table hover className="user-table align-items-center">
              <thead>
                <tr>
                  <th className="border-bottom">No.</th>

                  <th className="border-bottom">Name</th>
                  <th className="border-bottom">Email</th>
                  <th className="border-bottom">Mobile Number</th>
                  <th className="border-bottom">Action</th>
                </tr>
              </thead>
              {transactions.length === 0 ? (
                <div className="text-center pt-3">No data found</div>
              ) : (
                <tbody>
                  {transactions.map((doctor, index) => (
                    <TableRow key={index} doctor={doctor} index={index} />
                  ))}
                </tbody>
              )}
            </Table>
          </>
        )}
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between mb-5">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Pagination.Prev>
              {[...Array(totalPages).keys()].map((page) => (
                <Pagination.Item
                  key={page + 1}
                  active={page + 1 === currentPage}
                  onClick={() => setCurrentPage(page + 1)}
                >
                  {page + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{transactions.length}</b> out of <b>10</b> entries
          </small>
        </Card.Footer>
      </Card.Body>

      {/* Delete modal */}
      {showDeleteModal && (
        <CommonDeleteModal
          id={selectedDoctorId}
          onClose={handleCloseDeleteModal}
          onDelete={handleDeleteSuccess}
          show={showDeleteModal}
          deleteUrl={`${CarrersBaseUrl}/career/deleteJob`}
        />
      )}
    </Card>
  );
};
