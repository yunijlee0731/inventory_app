"use client";

import { Card } from "react-bootstrap";
import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  StrictMode,
} from "react";
import { AgGridReact } from "ag-grid-react";
import { Link } from "react-router-dom";
import ViewOneItem from "../components/ViewOneItem";
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

const ViewAllInventory = () => {
  const [rowData, setRowData] = useState();
  const [currSelectedRow, setCurrSelectedRow] = useState(null);
  const [columnDefs, setColumnDefs] = useState([
    { field: "item_name", minWidth: 180 },
    { field: "description", minWidth: 180 },
    { field: "quantity", minWidth: 160 },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      editable: false,
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
    fetch("/api/inventory/view-all-inventory", requestOptions)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setRowData(data.result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    // console.log(data);
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
      {/* <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="/user-inventory">
            My Inventory
          </a>
          <a class="navbar-brand" href="/view-all-inventory">
            Navbar
          </a>
        </div>
      </nav> */}

      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        {sessionStorage.getItem("userId") && ( // Render only if userId exists
          <form className="container-fluid justify-content-start">
            <Link to="/user-inventory">
              <button className="btn btn-outline-success me-2" type="button">
                My Inventory
              </button>
            </Link>
            <Link to="/view-all-inventory">
              <button className="btn btn-outline-success me-2" type="button">
                View All Inventory
              </button>
            </Link>
          </form>
        )}

        {sessionStorage.getItem("userId") && (
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
        )}

        {!sessionStorage.getItem("userId") && (
          <form className="container-fluid justify-content-end">
            <Link to="/login">
              <button className="btn btn-outline-success me-2" type="button">
                Login
              </button>
            </Link>
          </form>
        )}
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
          {/* <Card.Title>All Inventory</Card.Title> */}
          <Card.Body>
            <Card.Text class="fs-2">All Inventory</Card.Text>
            <div style={{ width: "100%", height: "500px" }}>
              <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                suppressClickEdit={true}
                onGridReady={onGridReady}
                rowSelection={rowSelection}
                onSelectionChanged={onSelectionChanged}
              />
            </div>
            <div>
              <ViewOneItem currSelectedRow={currSelectedRow} />
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ViewAllInventory;
