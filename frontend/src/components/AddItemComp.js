import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

function AddItemComp() {
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

  const handleSubmitClick = async (event) => {
    event.preventDefault();
    try {
      // console.log("!!!!!!!!!!!!!!requestOptions.body.userId");
      // console.log(requestOptions.body.userId);
      // console.log(requestOptions.body.itemName);
      // console.log(requestOptions.body.itemDes);
      // console.log(requestOptions.body.quantity);

      const response = await fetch("/api/inventory/add-item", requestOptions);
      const data = await response.json();
      console.log(data.success);

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
        onClick={handleShow}
        style={{ marginLeft: "10px", marginTop: "10px", marginBottom: "10px" }}
      >
        Add Item
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
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
          <Button variant="secondary" onClick={handleClose}>
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
