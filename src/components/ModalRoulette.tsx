import React from "react";
import { Modal, Button } from "react-bootstrap";

type Props = {
  show: boolean;
  onHide: () => void;
};

export default function ModalRoulette({ show, onHide }: Props) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      style={{ width: "200px", marginLeft: "50%", translate: "-50% 0" }}
      centered
    >
      <Modal.Header closeButton>Choose movie by genres</Modal.Header>
      <Modal.Body>ajajaj</Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Shuffle</Button>
      </Modal.Footer>
    </Modal>
  );
}
