import React, { useState } from "react";
import { Modal, Button } from "@themesberg/react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const CommonDeleteModal = ({ id, onClose, onDelete, show, deleteUrl }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`${deleteUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        onDelete();
      }
    } catch (error) {
      console.error("Error deleting:", error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Modal centered size="sm" show={show} onHide={onClose}>
      <Modal.Body className="p-4">
        <h5 className="mb-0">Are you sure you want to delete this profile?</h5>
      </Modal.Body>
      <Modal.Footer className="justify-content-between bg-light">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={loading}>
          {loading ? "Deleting..." : "Delete"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CommonDeleteModal;
