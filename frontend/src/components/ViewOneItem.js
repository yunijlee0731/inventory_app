import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { userInventoryWindow } from "../pages/UserInventory";

function ViewOneItem({ currSelectedRow }) {
  const [show, setShow] = useState(false);
  // State to manage API response messages
  const [message, setMessage] = useState("");
  const [messageVariant, setMessageVariant] = useState("success");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userId = sessionStorage.getItem("userId");

  const handleViewItemClick = async (itemID) => {
    // console.log("current itemId", itemID);
    // console.log("Performing delete action for:", currSelectedRow.id);

    const requestOptions = {
      method: "GET", // Use GET method
      headers: { "Content-Type": "application/json" },
    };

    try {
      const response = await fetch(
        `/api/inventory/view-single-item?itemID=${itemID}`,
        requestOptions
      );
      const data = await response.json();
      if (data.success === true) {
        var msgItemName = "Item: " + data.result[0].item_name + "\n";
        var msgItemDescription =
          "Description: " + data.result[0].description + " \n";
        var msgItemQuantity = "Quantity: " + data.result[0].quantity + " \n";
        var msg = msgItemName + msgItemDescription + msgItemQuantity;
        setMessage(msg);
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
          }
          handleViewItemClick(currSelectedRow.id);
          handleShow();
        }}
        disabled={!currSelectedRow}
        style={{ marginLeft: "10px", marginTop: "10px", marginBottom: "10px" }}
      >
        View Selected Item
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Item Details</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ overflowWrap: "break-word", wordWrap: "break-word" }}
        >
          {/* <p style={{ color: messageVariant === "success" ? "black" : "red" }}> */}
          {message}
          {/* </p> */}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              //   userInventoryWindow.reload();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewOneItem;
