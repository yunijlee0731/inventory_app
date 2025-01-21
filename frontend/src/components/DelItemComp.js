import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { userInventoryWindow } from "../pages/UserInventory";

function DelItemComp({ currSelectedRow }) {
  const [show, setShow] = useState(false);
  // State to manage API response messages
  const [message, setMessage] = useState("");
  const [messageVariant, setMessageVariant] = useState("success");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userId = sessionStorage.getItem("userId");

  const handleDeleteClick = async (itemID) => {
    console.log("current itemId", itemID);
    // console.log("Performing delete action for:", currSelectedRow.id);

    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        itemID,
      }),
    };

    try {
      const response = await fetch(
        "/api/inventory/delete-item",
        requestOptions
      );
      const data = await response.json();
      console.log("DelItemComp.js Success?: ", data.success);
      console.log("DelItemComp.js Message: ", data.message);
      if (data.success === true) {
        setMessage(data.message);
        setMessageVariant("success");
      } else if (data.success === false) {
        setMessage(data.message);
        setMessageVariant("danger");
      }
    } catch (error) {
      setMessage(
        "An unexpected error occurred while adding the item. Please try again."
      );
      setMessageVariant("danger");
      console.error(error);
    }
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={() => {
          if (currSelectedRow) {
            console.log("Performing delete action for:", currSelectedRow.id);
          }
          handleDeleteClick(currSelectedRow.id);
          handleShow();
        }}
        disabled={!currSelectedRow}
        style={{ marginLeft: "10px", marginTop: "10px", marginBottom: "10px" }}
      >
        Delete Selected Item
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ color: messageVariant === "success" ? "green" : "red" }}>
            {message}
          </p>
          {/* <Form>
            <Form.Group className="mb-3 text-start" controlId="formPassword">
              <Form.Label>Item ID:</Form.Label>
              <Form.Control
                type="text"
                name="item_id"
                placeholder="Item ID"
                required
              />
            </Form.Group>
          </Form> */}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              userInventoryWindow.reload();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DelItemComp;
