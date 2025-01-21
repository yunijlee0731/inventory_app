"use client";

import { Card } from "react-bootstrap";
import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  StrictMode,
} from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import AddItemComp from "../components/AddItemComp";
import DelItemComp from "../components/DelItemComp";
import ViewOneItem from "../components/ViewOneItem";
import { AgGridReact } from "ag-grid-react";
import CellRenderer from "../CellRenderer";
import { updateItem } from "../components/EditItemHelper";
import {
  ClientSideRowModelModule,
  ModuleRegistry,
  NumberEditorModule,
  TextEditorModule,
  ValidationModule,
  RowSelectionModule,
} from "ag-grid-community";
ModuleRegistry.registerModules([
  NumberEditorModule,
  TextEditorModule,
  ClientSideRowModelModule,
  RowSelectionModule,
  ValidationModule /* Development Only */,
]);

export const userInventoryWindow = window.location;
//   const currWindow = window.location;
//   console.log(currWindow);
//   window.location.reload();
// };

export const UserInventory = () => {
  const [show, setShow] = useState(false);
  // State to manage API response messages
  const [message, setMessage] = useState("");
  const [messageVariant, setMessageVariant] = useState("success");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [currSelectedRow, setCurrSelectedRow] = useState(null);
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: "item_name", minWidth: 180 },
    { field: "description", minWidth: 400 },
    { field: "quantity", minWidth: 160 },
  ]);

  // const gridOptions = {
  //   components: {
  //     // loadingOverlay: () => null, // No loading overlay
  //     defaultColDef: {
  //       loadingCellRenderer: () => '',
  //   },
  //   },
  // };

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      editable: true,
      // we use a cell renderer to include a button, so when the button
      // gets clicked, the editing starts.
      cellRenderer: CellRenderer,
    };
  }, []);

  const loadingCellRenderer = useCallback(() => {}, []);
  const loadingCellRendererParams = useMemo(() => {
    return {
      loadingMessage: " ",
    };
  }, []);

  const rowSelection = useMemo(() => {
    return {
      mode: "singleRow",
    };
  }, []);

  const requestOptions = {
    method: "GET", // Use GET method
    headers: { "Content-Type": "application/json" },
  };
  const onGridReady = useCallback((params) => {
    fetch(
      `/api/inventory/view-user-inventory?userId=${sessionStorage.getItem(
        "userId"
      )}`,
      requestOptions
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data.result);
        if (data.success === true) {
          setRowData(data.result);
        }
        // else if (data.message === "No items found for the given user ID.") {
        //   var temp = [
        //     {
        //       id: 0,
        //       user_id: 0,
        //       item_name: "No items to display",
        //       description: "No items to display",
        //       quantity: 0,
        //     },
        //   ];
        //   setRowData(temp);
        // }
      });
  }, []);

  const onCellEditingStopped = useCallback((event) => {
    var shouldUpdate = true;
    if (event.value === null) {
      setMessage("Value is null, field cannot be empty");
      setMessageVariant("danger");
      handleShow();
      shouldUpdate = false;
    } else if (event.colDef.field !== "quantity") {
      var trimmedVal = event.value.trim();
      if (trimmedVal === "") {
        setMessage("Field cannot be empty");
        setMessageVariant("danger");
        handleShow();
        shouldUpdate = false;
      }
    }
    if (shouldUpdate) {
      console.log("EDITING ITEM");
      var data = updateItem(
        event.data.id,
        event.data.user_id,
        event.data.item_name,
        event.data.description,
        event.data.quantity,
        userInventoryWindow
      );
    }
  }, []);

  // logic to handle when row is selected and not selected
  const onSelectionChanged = (params) => {
    const selectedNode = params.api.getSelectedNodes()[0];
    if (selectedNode) {
      setCurrSelectedRow(selectedNode.data); // Update state with the selected row data
    } else {
      setCurrSelectedRow(null); // Clear state when no row is selected
    }
  };

  return (
    <div style={{ backgroundColor: "#282c34" }}>
      <nav class="navbar navbar-expand-lg bg-body-tertiary ">
        <form className="container-fluid justify-content-start">
          {sessionStorage.getItem("userId") && ( // Render only if userId exists
            <Link to="/user-inventory">
              <button className="btn btn-outline-success me-2" type="button">
                My Inventory
              </button>
            </Link>
          )}
          <Link to="/view-all-inventory">
            <button className="btn btn-outline-success me-2" type="button">
              View All Inventory
            </button>
          </Link>
        </form>

        <form className="container-fluid justify-content-end">
          <Link to="/login">
            <button
              className="btn btn-outline-success me-2"
              type="button"
              onClick={() => {
                sessionStorage.clear();
              }}
            >
              Logout
            </button>
          </Link>
        </form>
      </nav>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh", // Full viewport height for vertical centering
        }}
      >
        <Card
          style={{
            width: "80rem",
          }}
        >
          <Card.Body>
            <Card.Text class="fs-2">My Inventory</Card.Text>
            <div style={{ width: "100%", height: "500px" }}>
              <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                suppressClickEdit={true}
                onGridReady={onGridReady}
                onCellEditingStopped={onCellEditingStopped}
                rowSelection={rowSelection}
                onSelectionChanged={onSelectionChanged}
                loadingCellRenderer={loadingCellRenderer}
                loadingCellRendererParams={loadingCellRendererParams}
                // gridOptions={gridOptions}
                // onRowSelected={onRowSelected}
              />
            </div>
            <div>
              <AddItemComp />
              <DelItemComp currSelectedRow={currSelectedRow} />
              <ViewOneItem currSelectedRow={currSelectedRow} />

              <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                  <Modal.Title>Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <p
                    style={{
                      color: messageVariant === "success" ? "green" : "red",
                    }}
                  >
                    {message}
                  </p>
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
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};
