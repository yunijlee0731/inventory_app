import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { userInventoryWindow } from "../pages/UserInventory";

function AddItemComp() {
  const navigate = useNavigate();
  // State to manage API response messages
  const [message, setMessage] = useState("");
  const [messageVariant, setMessageVariant] = useState("success");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [itemName, setItemName] = useState("");
  const [itemDes, setItemDes] = useState("");
  const [quantity, setQuantity] = useState("");
  const userId = sessionStorage.getItem("userId");

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      itemName,
      itemDes,
      quantity,
    }),
  };
  const refreshPage = () => {
    window.location.reload();
  };

  const handleSubmitClick = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/inventory/add-item", requestOptions);
      const data = await response.json();
      console.log(data.success);

      // TODO: When item is succesfully added, you need to clear the parameters since they are saved from the last one, then you need to refresh the table to update it with the new entry
      if (data.success === true) {
        setMessage(data.message);
        setMessageVariant("success");
        refreshPage();
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
        onClick={handleShow}
        style={{ marginLeft: "10px", marginTop: "10px", marginBottom: "10px" }}
      >
        Add Item
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Item</Modal.Title>
        </Modal.Header>
        {/* Display API response message */}
        {message && (
          <Alert
            variant={messageVariant}
            style={{ marginLeft: "10px", marginRight: "10px" }}
          >
            {message}
          </Alert>
        )}
        <Modal.Body>
          {" "}
          <Form
            action="/api/inventory/add-item"
            method="post"
            style={{ padding: "10px" }}
          >
            {/* First Name Input */}
            <Form.Group className="mb-3 text-start" controlId="formItemName">
              <Form.Label>Item Name:</Form.Label>
              <Form.Control
                type="text"
                name="itemName"
                placeholder="Enter item name"
                value={itemName} // Bind to state
                onChange={(e) => setItemName(e.target.value)} // Update state on input
                required
              />
            </Form.Group>

            {/* Last Name Input */}
            <Form.Group
              className="mb-3 text-start"
              controlId="formItemDescriptionName"
            >
              <Form.Label>Item Description:</Form.Label>
              <Form.Control
                type="text"
                name="itemDes"
                placeholder="Describe item"
                value={itemDes} // Bind to state
                onChange={(e) => setItemDes(e.target.value)} // Update state on input
                required
              />
            </Form.Group>

            {/* Username Input */}
            <Form.Group className="mb-3 text-start" controlId="formUserName">
              <Form.Label>Quantity:</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                placeholder="Enter item quantity"
                value={quantity} // Bind to state
                onChange={(e) => setQuantity(e.target.value)} // Update state on input
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              userInventoryWindow.reload();
            }}
          >
            Cancel
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmitClick}>
            Add Item
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddItemComp;
